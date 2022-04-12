import React from 'react';
import { Grid } from '@mui/material';
import { LedgerWidget, Page } from 'ui';
import { ChartBudgetService } from '../ui/organisms/BudgetService.chart';
import { ChartSummaryService } from '../ui/organisms/SummaryService.chart';

export const WalletPage = () => (
  <Page title={'Portfel'}>
    <Grid container spacing={{ xs: 3, md: 6 }}>
      <Grid item xs={12} md={8}>
        <LedgerWidget />
      </Grid>
      <Grid container item xs={12} md={4} spacing={1}>
        <Grid item xs={12} data-test-id={'wallet-top-sidebar'}>
          <ChartSummaryService />
        </Grid>
        <Grid item xs={12} data-test-id={'wallet-bottom-sidebar'}>
          <ChartBudgetService />
        </Grid>
      </Grid>
    </Grid>
  </Page>
);
