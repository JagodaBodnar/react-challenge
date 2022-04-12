import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Modal as MuiModal,
  CardHeader,
  Typography,
} from '@mui/material';
import { Button } from '../';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
};

export const Modal = ({
  open = false,
  onClose,
  title,
  description,
  children,
  onSubmit,
  canSubmit = true,
}) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Card sx={style}>
        <CardHeader
          title={<Typography variant={'h4'}>{title}</Typography>}
          subheader={description}
        />
        <CardContent sx={{ mt: 2, mb: 2 }}>{children}</CardContent>
        <CardActions
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button onClick={onClose} sx={{ marginRight: '8px' }}>
            Anuluj
          </Button>
          <Button
            variant={'contained'}
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            Zapisz
          </Button>
        </CardActions>
      </Card>
    </MuiModal>
  );
};
