import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { useCallback } from 'react';
interface NetzerSelectProps {
  id: string;
  options: Array<{ value: string | number; label: string }>;
  label?: string;
  selected?: string | number;
  onChange: (value: number | string) => void;
  disabled?: boolean;
}

export const NetzerSelect: FC<NetzerSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  id,
  disabled
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
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          label={label}
          value={selected}
          onChange={onChangeHandler}
          disabled={disabled}
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
