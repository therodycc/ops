import { LoadingButton, LoadingButtonTypeMap } from '@mui/lab';
import { ExtendButton } from '@mui/material';
import React, { FC } from 'react';

interface NetzerButtonProps extends ExtendButton<LoadingButtonTypeMap<{}, 'button'>> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info';
}

export const NetzerButton: FC<NetzerButtonProps> = ({ children, variant, color, ...props }) => {
  return (
    <React.Fragment>
      <LoadingButton
        variant={variant || 'contained'}
        color={color || 'success'}
        // onClick={onShowModalHandle}
        {...props}
        sx={{ color: 'white', width: 'auto' }}
        // startIcon={<Iconify icon={'eva:plus-fill'} />}
      >
        {children}
      </LoadingButton>
    </React.Fragment>
  );
};
