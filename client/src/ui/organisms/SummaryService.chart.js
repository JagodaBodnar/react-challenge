import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { SummaryService } from '../../api';
import { Loader } from '../atoms/Loader';
import { Error } from '../atoms/Error';
import {
  StyledChartSection,
  StyledBalanceContainer,
  StyledChartContainer,
  StyledLegendContainer,
  StyledListElement,
  StyledNoResults,
} from '../../styles/SummaryService.styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback } from 'react';
import { formatCentsToDollars } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartSummaryService() {
  const { isLoading, error, data } = useQuery(
    'chartServiceData',
    () => SummaryService.findAll(),
    {
      select: useCallback((response) => {
        const { colors, labels, data } = response.spending.reduce(
          (result, current) => ({
            colors: [...(result.colors || []), current.categoryColor],
            labels: [...(result.labels || []), current.categoryName],
            data: [
              ...(result.data || []),
              formatCentsToDollars(current.amountInCents),
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
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  const options = { plugins: { legend: { display: false } } };
  return (
    <StyledChartSection>
      <div>
        <StyledBalanceContainer>
          <Typography variant="h4">Saldo</Typography>
          <Typography variant="h3">{data.summary.balance / 100} PLN</Typography>
        </StyledBalanceContainer>
        <Typography variant="subtitle1">Pozostała kwota</Typography>
      </div>
      <StyledChartContainer>
        {!data || !data.exists || data.summary.spending.length === 0 ? (
          <StyledNoResults>Brak wyników</StyledNoResults>
        ) : (
          <Doughnut options={options} data={data?.chartData} />
        )}
      </StyledChartContainer>
      <StyledLegendContainer>
        {data?.summary?.spending.map((element) => {
          return (
            <StyledListElement
              key={element.categoryId}
              color={element.categoryColor}
            >
              {element.categoryName}
            </StyledListElement>
          );
        })}
      </StyledLegendContainer>
    </StyledChartSection>
  );
}
