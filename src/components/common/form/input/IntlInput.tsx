import { Stack, TextField, Typography } from '@mui/material';
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
    let value = args?.[1].replace(/\D/g, '');
    const message = value.slice(0, props?.maxLength);
    onChange?.(
      {
        target: {
          value: props?.maxLength !== -1 ? message : value,
          name: props?.name
        }
      },
      args?.[0]
    );
  };

  return (
    <React.Fragment>
      <Stack spacing={0} sx={{ width: '100%' }}>
        {label && <Typography variant="subtitle2">{label}</Typography>}
        <div className="container-input">
          <IntlTelInput
            containerClassName="intl-tel-input"
            inputClassName="intel-input"
            format={true}
            defaultCountry={'do'}
            onPhoneNumberChange={handleChangeIntlInput}
            formatOnInit={true}
            fieldName={props?.name}
            value={props.value}
            autoPlaceholder={true}
            placeholder={props?.placeholder}
          />
        </div>
      </Stack>
    </React.Fragment>
  );
};
