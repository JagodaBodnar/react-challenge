import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';
import { BudgetService } from 'api';
import { Card, Loader, Error } from 'ui';
import { BUDGET_QUERY } from 'queryKeys';

export const BudgetChartWidget = () => {
  const { isLoading, error, data } = useQuery(
    BUDGET_QUERY,
    () => BudgetService.findAll(),
    {
      select: React.useCallback((response) => {
        const data = response.map(
          ({ currentSpendingPercent }) => currentSpendingPercent,
        );

        return {
          chartData: {
            labels: response.map(({ category }) => `${category.name} %`),
            datasets: [
              {
                axis: 'y',
                data: data,
                fill: false,
                backgroundColor: response.map(({ category }) => category.color),
                borderWidth: 0,
              },
            ],
          },
          hasData: !!data.length,
        };
      }, []),
    },
  );

  return (
    <Card
      title={<Typography variant={'h4'}>Budżet</Typography>}
      subheader={'Podsumowanie wydatków'}
    >
      {isLoading && <Loader />}
      {!isLoading && error && <Error error={error} />}
      {!isLoading && !error && (!data || !data.hasData) && (
        <Typography>Brak wyników</Typography>
      )}
      {!error && !isLoading && data && data.hasData && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Bar
            type={'bar'}
            data={data.chartData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { display: false } },
            }}
          />
        </Grid>
      )}
    </Card>
  );
};
