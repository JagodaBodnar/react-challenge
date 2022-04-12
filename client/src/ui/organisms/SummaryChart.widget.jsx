import React from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import { Box, Grid, Typography } from '@mui/material';

import { CategoryCell, Money, Card, Error, Loader } from 'ui';
import { SummaryService } from 'api';
import { formatCentsToDollars } from 'utils';
import { SUMMARY_QUERY } from 'queryKeys';

export const SummaryChartWidget = () => {
  const { isLoading, error, data } = useQuery(
    SUMMARY_QUERY,
    () => SummaryService.findAll(),
    {
      select: React.useCallback((response) => {
        const { colors, labels, data } = response.spending.reduce(
          (acc, curr) => ({
            colors: [...(acc.colors || []), curr.categoryColor],
            labels: [...(acc.labels || []), curr.categoryName],
            data: [
              ...(acc.data || []),
              formatCentsToDollars(curr.amountInCents),
            ],
          }),
          {},
        );

        return {
          chartData: {
            datasets: [
              {
                label: labels,
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
              },
            ],
          },
          exists: !!response.spending.length,
          summary: response,
        };
      }, []),
    },
  );

  return (
    <Card
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant={'h4'}>Saldo</Typography>
          <Typography
            component="h3"
            variant="h4"
            marginBottom={1}
            fontWeight="bold"
          >
            <Money inCents={data?.summary?.balance} />
          </Typography>
        </Box>
      }
      subheader={'Pozostała kwota'}
    >
      {isLoading && <Loader />}
      {!isLoading && error && <Error error={error} />}
      <Grid container mt={4}>
        {!isLoading && !error && (!data || !data.exists) && (
          <Typography>Brak wyników</Typography>
        )}
        {!isLoading && !error && data && data.exists && (
          <>
            <Grid item xs={12} alignItems={'center'}>
              <Doughnut
                data={data?.chartData}
                height={200}
                width={200}
                options={{ maintainAspectRatio: false }}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              {data?.summary?.spending.map((s) => (
                <CategoryCell
                  key={s.categoryId}
                  color={s.categoryColor}
                  name={s.categoryName}
                />
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};
