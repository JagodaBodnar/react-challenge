import React, { useContext } from 'react';
import { Modal } from '../molecules/modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { CardActions, InputLabel, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LedgerService, CategoryService } from '../../api';
import { CategoryCell } from '../molecules/CategoryCell';
import MenuItem from '@mui/material/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RootContext from '../../context/context';
import { Button } from '../atoms/Button';
import { useSnackbar } from 'notistack';

export const AddNewLedgerRecordModal = ({ type, handleClose, ...props }) => {
  const context = useContext(RootContext);
  const { setOpenModal, category, setCategory } = context;

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim('Nazwa nie może być pusta')
      .required('Nazwa nie może być pusta'),
    amount: yup
      .number()
      .typeError('Kwota musi być numerem')
      .required('Kwota nie może być pusta')
      .min(0.01, 'Kwota musi być większa niż 0')
      .max(1000000, 'Kwota nie może być większa niż 1000000')
      .positive('Kwota musi być większa niż 0'),
  });

  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      amount: '',
      select: '',
    },
    mode: 'all',
    shouldUnregister: false,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data } = useQuery('categoriesData', () => CategoryService.findAll());
  const addLedgerRecordMutation = useMutation(
    (requestBody) => LedgerService.create({ requestBody }),
    {
      onSuccess: () => {
        type === 'INCOME'
          ? enqueueSnackbar('Wpływ został dodany', { variant: 'success' })
          : enqueueSnackbar('Wydatek został zapisany', { variant: 'success' });
        queryClient.invalidateQueries('ledgerData');
        queryClient.invalidateQueries('chartServiceData');
        queryClient.invalidateQueries('chartBudgetData');
      },
      onError: () => {
        enqueueSnackbar('Wystąpił nieoczekiwany błąd', { variant: 'error' });
      },
    },
  );
  const onSubmit = (data) => {
    const result = {
      mode: type,
      amountInCents: data.amount * 100,
      categoryId: data.select,
      title: data.name,
    };
    setOpenModal(false);
    addLedgerRecordMutation.mutate(result);
    reset();
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Modal
      handleClose={handleCancel}
      {...props}
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true, minLength: 1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              label="Nazwa"
            />
          )}
        />
        <p>{errors.name?.message}</p>
        <Controller
          name="amount"
          control={control}
          rules={{ required: true, min: 0.01, max: 1000000 }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              inputProps={{ inputMode: 'numeric' }}
              label="Kwota"
            />
          )}
        />
        <p>{errors.amount?.message}</p>
        {type === 'EXPENSE' && (
          <>
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategoria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="select"
                    value={category}
                    label="Kategoria"
                    onChange={handleChange}
                    {...field}
                  >
                    {data?.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        <CategoryCell
                          color={category?.color}
                          name={category?.name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <p>{errors.select?.message}</p>
          </>
        )}
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ m: 2 }}
            onClick={(props) => handleCancel(props)}
          >
            Anuluj
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Zapisz
          </Button>
        </CardActions>
      </form>
    </Modal>
  );
};
