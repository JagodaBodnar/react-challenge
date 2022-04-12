import { MenuItem, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
import { CategoryCell } from './CategoryCell';

export const CategoryField = ({
  value,
  onChange,
  categories,
  ...inputProps
}) => {
  return (
    <TextField
      select
      label="Kategoria"
      value={value}
      onChange={onChange}
      {...inputProps}
    >
      {categories.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          <CategoryCell color={option.color} name={option.name} />
        </MenuItem>
      ))}
    </TextField>
  );
};

CategoryField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  categories: PropTypes.any,
};
