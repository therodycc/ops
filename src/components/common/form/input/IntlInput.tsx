import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

interface IntlInputProps {
  onChange: Function;
  props: any;
  label?: string;
}

export const IntlInput: FC<IntlInputProps> = ({ onChange, props, label }) => {
  const handleChangeIntlInput = (...args) => {
    onChange?.(
      {
        target: {
          value: args?.[1].replace(/\D/g, ''),
          name: props?.name
        }
      },
      args?.[0]
    );
  };

  return (
    <React.Fragment>
      <Stack spacing={0} sx={{}}>
        {label && <Typography variant="subtitle2">{label}</Typography>}
        <IntlTelInput
          containerClassName="intl-tel-input"
          inputClassName="form-control"
          format={true}
          onPhoneNumberChange={handleChangeIntlInput}
          formatOnInit={true}
          fieldName={props?.name}
          autoPlaceholder={true}
          placeholder={props?.placeholder}
        />
      </Stack>
    </React.Fragment>
  );
};
