import { ReactElement, ReactNode } from 'react';

export interface ColumnsTableI {
  children: (props: { columns: ColumnsI[] }) => ReactElement;
}

export interface ColumnsI {
  title: string | Function;
  key?: string;
  render?: Function;
}

export interface NetzerTablePropsI {
  columns: Array<ColumnsI>;
  data: any[];
  isLoading?: boolean;
  rowAction?: Function;
  leftSection?: ReactNode;
  emptyData?: EmptyDataI;
  pagination?: PaginationI;
  buttonTable?: {
    variant: 'contained';
    color: 'success';
    onClick: Function;
    sx: Object;
    startIcon: ReactNode;
    children: ReactNode;
  };
}

export interface EmptyDataI {
  title?: string;
  description?: string;
  img?: string;
}
export interface PaginationI {
  page: number;
  count: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
