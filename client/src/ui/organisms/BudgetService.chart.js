import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { BudgetService } from '../../api';
import { Loader } from '../atoms/Loader';
import { Error } from '../atoms/Error';
import {
  StyledChartSection,
  StyledBalanceContainer,
  StyledNoResults,
} from '../../styles/SummaryService.styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function ChartBudgetService() {
  const { isLoading, error, data } = useQuery(
    'chartBudgetData',
    () => BudgetService.findAll(),
    {
      select: useCallback((response) => {
        const data = response.map(
          ({ currentSpendingPercent }) => currentSpendingPercent,
        );
        return {
          chartData: {
            labels: response.map(({ category }) => `${category.name} %`),
            datasets: [
              {
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
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <StyledChartSection>
      <div>
        <StyledBalanceContainer>
          <Typography variant="h4">Budżet</Typography>
        </StyledBalanceContainer>
        <Typography variant="subtitle1">Podsumowanie wydatków</Typography>
      </div>
      {!data ||
      !data.hasData ||
      data.chartData.datasets[0].data.every((e) => e === 0) ? (
        <StyledNoResults>Brak wyników</StyledNoResults>
      ) : (
        <Bar options={options} data={data?.chartData} />
      )}
    </StyledChartSection>
  );
}
