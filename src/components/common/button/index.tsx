import { LoadingButton, LoadingButtonTypeMap } from '@mui/lab';
import { ExtendButton, ExtendButtonBaseTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import React, { FC } from 'react';

interface NetzerButtonProps
  extends DefaultComponentProps<ExtendButtonBaseTypeMap<LoadingButtonTypeMap<{}, 'button'>>> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info';
  isLoading?: boolean;
}

export const NetzerButton: FC<NetzerButtonProps> = ({
  children,
  variant,
  color,
  isLoading = false,
  ...props
}) => {
  return (
    <React.Fragment>
      <LoadingButton
        variant={variant || 'contained'}
        color={color || 'success'}
        loading={isLoading}
        {...props}
        sx={{ width: 'auto' }}
      >
        {children}
      </LoadingButton>
    </React.Fragment>
  );
};
