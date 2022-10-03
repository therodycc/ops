import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';
import React, { FC } from 'react';
import { useCallback } from 'react';
interface NetzerSelectProps {
  options: Array<{ value: string | number; label: string }>;
  label?: string;
  onChange: (value: number | string) => void;
  errorMessage?: string;
  props: SelectProps<string | number>;
}

export const NetzerSelect: FC<NetzerSelectProps> = ({
  label,
  options,
  onChange,
  errorMessage,
  props
}) => {
  const onChangeHandler = useCallback(
    e => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel id={props.id}>{label}</InputLabel>
        <Select
          labelId={props.id}
          label={label}
          onChange={onChangeHandler}
          error={!!errorMessage}
          autoCorrect={errorMessage}
          {...props}
        >
          {options.map((option, index) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
};
