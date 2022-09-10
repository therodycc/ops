import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, SxProps, Theme } from '@mui/material';
import React, { FC } from 'react';

interface AlertDialogProps {
  title: string;
  message: string;
  markMessage?: string;
  type: 'error' | 'info' | 'success' | 'warning';
  sx?: SxProps<Theme>;
}

export const AlertDialog: FC<AlertDialogProps> = ({ title, message, type, sx, markMessage }) => {
  return (
    <React.Fragment>
      <Alert severity={type} sx={{ ...sx }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
        <strong>{markMessage}</strong>
        <LoadingButton
          variant={'contained'}
          color={'success'}
          sx={{ color: 'white', width: 'auto', marginLeft: '20px' }}
        >
          Ver mas
        </LoadingButton>
      </Alert>
    </React.Fragment>
  );
};
