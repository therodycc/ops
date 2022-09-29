import { SelectProps, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

type colsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type FormInputsProps =
  | {
      type: 'number' | 'text' | 'password';
      cols: colsType;
      label?: string;
      props: TextFieldProps;
    }
  | {
      type: 'select';
      label?: string;
      cols: colsType;
      options: Array<{ label: string; value: string | number }>;
      props: SelectProps<string | number>;
    }
  | {
      type: 'customSection';
      cols: colsType;
      section: ReactNode;
    };

interface InputsPropsTest {}
