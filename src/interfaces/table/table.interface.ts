import { ReactElement } from 'react';

export interface ColumnsTableI {
  children: (props: { columns: ColumnsI[] }) => ReactElement;
}

export interface ColumnsI {
  title: string | Function;
  key?: string;
  render?: Function;
}
