import React, { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface InputPhoneProps {
  onChange: Function;
  props: any;
}

export const InputPhone: FC<InputPhoneProps> = ({ onChange, props }) => {
  const handleChange = (phone: string) => {
    onChange?.({
      target: {
        value: phone.replace(/\D/g, ''),
        name: props?.name
      }
    });
  };

  return (
    <React.Fragment>
      <PhoneInput
        country={'do'}
        onChange={handleChange}
        inputProps={{
          ...props
        }}
        autoFormat={true}
        disableCountryCode={true}
        onlyCountries={['do']}
      />
    </React.Fragment>
  );
};
