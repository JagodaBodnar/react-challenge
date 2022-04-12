import React, { useContext } from 'react';
import { Modal } from '../molecules/modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { CardActions, InputLabel, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BudgetService, CategoryService } from '../../api';
import { CategoryCell } from '../molecules/CategoryCell';
import MenuItem from '@mui/material/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RootContext from '../../context/context';
import { Button } from '../atoms/Button';
import { useSnackbar } from 'notistack';

export const AddNewBudgetRecordModal = ({ handleClose, ...props }) => {
  const context = useContext(RootContext);
  const { setOpenModal, setCategory, category } = context;
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError('Kwota musi być numerem')
      .required('Kwota nie może być pusta')
      .min(0.01, 'Kwota musi być większa niż 0')
      .max(1000000, 'Kwota nie może być większa niż 1000000')
      .positive('Kwota musi być większa niż 0'),
    select: yup.string().required('Wybierz kategorię'),
  });
  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      amount: '',
      select: '',
    },
    mode: 'onChange',
    shouldUnregister: false,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const { data } = useQuery('categoriesData', () =>
    CategoryService.findAll(true),
  );
  const addBudgetRecordMutation = useMutation(
    (requestBody) => BudgetService.create({ requestBody }),
    {
      onSuccess: () => {
        enqueueSnackbar('Budżet został zdefiniowany', { variant: 'success' });
        queryClient.invalidateQueries('budgetData');
        queryClient.invalidateQueries('categoriesData');
      },
      onError: () => {
        enqueueSnackbar('Wystąpił nieoczekiwany błąd', { variant: 'error' });
      },
    },
  );
  const onSubmit = (data) => {
    const result = {
      amountInCents: data.amount * 100,
      categoryId: data.select,
    };
    setOpenModal(false);
    addBudgetRecordMutation.mutate(result);
    reset();
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };
  return (
    <Modal handleClose={handleCancel} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name="select"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kategoria</InputLabel>
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
