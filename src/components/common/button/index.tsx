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
  size = 'small',
  ...props
}) => {
  const { sx, fullWidth, ...rest } = props;
  return (
    <React.Fragment>
      <LoadingButton
        fullWidth={!!fullWidth}
        variant={variant || 'contained'}
        color={color || 'success'}
        loading={isLoading}
        size={size}
        {...rest}
        sx={{ width: 'auto', ...(sx && sx) }}
      >
        {children}
      </LoadingButton>
    </React.Fragment>
  );
};
