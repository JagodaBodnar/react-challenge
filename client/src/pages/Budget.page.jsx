import { ActionHeader, Card, CategoryCell, Page } from 'ui';
import { Grid } from '@mui/material';
import { Button } from '../ui/atoms/Button';
import { Table } from '../ui/molecules/table/Table';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BudgetService } from '../api';
import { Error } from '../ui/atoms/Error';
import { Loader } from '../ui/atoms/Loader';
import { NoContent } from '../ui/atoms/NoContent';
import { Money } from '../ui/atoms/Money';
import { LocalizedDate } from '../ui/atoms/LocalizedDate';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { AddNewBudgetRecordModal } from '../ui/organisms/AddNewBudgetRecord.modal';
import RootContext from '../context/context';
import { useSnackbar } from 'notistack';

export const BudgetPage = () => {
  const context = useContext(RootContext);
  const { setOpenModal, openModal } = context;

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
              >
                Zdefiniuj budżet{' '}
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <BudgetTable />
          </Grid>
        </Grid>
      </Card>
      <AddNewBudgetRecordModal
        title="Zdefiniuj budżet"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        content
      </AddNewBudgetRecordModal>
    </Page>
  );
};
const columns = [
  {
    id: 'name',
    label: 'Nazwa',
    renderCell: (row) => (
      <CategoryCell color={row.category?.color} name={row.category?.name} />
    ),
  },
  {
    id: 'amountInCents',
    label: 'Planowane wydatki',
    renderCell: (row) => <Money inCents={row.amountInCents} />,
  },
  {
    id: 'currentSpending',
    label: 'Obecna kwota',
    renderCell: (row) => <Money inCents={row.currentSpending} />,
  },
  {
    id: 'currentSpendingPercent',
    label: 'Status',
    renderCell: (row) =>
      row.currentSpendingPercent > 100
        ? 'Przekroczone'
        : row.currentSpendingPercent === 100
        ? 'Wykorzystany'
        : 'W normie',
  },
  {
    id: 'createdAt',
    label: 'Data utworzenia',
    renderCell: (row) => <LocalizedDate date={row.createdAt} />,
  },
];

const BudgetTable = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery('budgetData', () =>
    BudgetService.findAll(),
  );
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation((ids) => BudgetService.remove({ ids }), {
    onSuccess: () => {
      enqueueSnackbar('Element został usunięty', { variant: 'success' });
      queryClient.invalidateQueries('budgetData');
      queryClient.invalidateQueries('categoriesData');
      queryClient.invalidateQueries('chartBudgetData');
    },
    onError: () => {
      enqueueSnackbar('Wystąpił nieoczekiwany błąd', { variant: 'error' });
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <Error />;
  if (data.length === 0) return <NoContent />;
  return (
    <Table
      rows={data}
      headCells={columns}
      getUniqueId={(row) => row.id}
      deleteRecords={(selected) => mutation.mutate(selected)}
    />
  );
};
