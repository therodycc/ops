import { Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import React, { ChangeEventHandler, FC } from 'react';

interface NetzerInputProps {
  label: string;
  type: 'number' | 'text' | 'password';
  props: TextFieldProps;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const NetzerInput: FC<NetzerInputProps> = ({
  type,
  label,
  onChange,
  errorMessage,
  props
}) => {
  return (
    <React.Fragment>
      <Stack spacing={0} sx={{}}>
        <Typography variant="subtitle2">{label}</Typography>
        <TextField
          error={!!errorMessage}
          variant="outlined"
          type={type}
          // label={label}
          onChange={onChange}
          helperText={errorMessage}
          {...props}
        />
      </Stack>
    </React.Fragment>
  );
};
