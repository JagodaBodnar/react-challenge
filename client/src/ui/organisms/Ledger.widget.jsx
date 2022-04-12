import {
  ActionHeader,
  Card,
  CategoryCell,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Table,
} from 'ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { LedgerService } from '../../api';
import Box from '@mui/material/Box';
import { theme } from '../../theme';
import { Button } from '../atoms/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RootContext from '../../context/context';
import { AddNewLedgerRecordModal } from './AddNewLedgerRecord.modal';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';

export const LedgerWidget = () => {
  const context = useContext(RootContext);
  const { setModalType, setOpenModal, modalType, openModal } = context;
  const handleOpenModal = (string) => {
    setModalType(string);
    setOpenModal(true);
  };
  return (
    <Card
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ m: 2 }}
                onClick={() => handleOpenModal('INCOME')}
              >
                Wpłać
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RemoveIcon />}
                onClick={() => handleOpenModal('EXPENSE')}
              >
                Wypłać
              </Button>
            </Box>
          )}
        />
      }
    >
      <LedgerTable />
      <AddNewLedgerRecordModal
        type={modalType}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        content
      </AddNewLedgerRecordModal>
    </Card>
  );
};

const columns = [
  {
    id: 'title',
    label: 'Nazwa',
    renderCell: (row) => row.title,
  },
  {
    id: 'category',
    label: 'Kategoria',
    renderCell: (row) => (
      <CategoryCell color={row.category?.color} name={row.category?.name} />
    ),
  },
  {
    id: 'createdAt',
    label: 'Data utworzenia',
    renderCell: (row) => <LocalizedDate date={row.createdAt} />,
  },
  {
    id: 'amountInCents',
    label: 'Kwota',
    renderCell: (row) =>
      row.mode === 'INCOME' ? (
        <Box sx={{ color: theme.palette.success.main }}>
          +<Money inCents={row.amountInCents} />
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.error.main }}>
          -<Money inCents={row.amountInCents} />
        </Box>
      ),
  },
];

const LedgerTable = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery('ledgerData', () =>
    LedgerService.findAll(),
  );
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation((ids) => LedgerService.remove({ ids }), {
    onSuccess: () => {
      enqueueSnackbar('Element został usunięty', { variant: 'success' });
      queryClient.invalidateQueries('ledgerData');
      queryClient.invalidateQueries('chartServiceData');
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
