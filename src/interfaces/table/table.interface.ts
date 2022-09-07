import { ReactElement } from 'react';

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
  emptyData?: EmptyDataI;
  pagination?: PaginationI;
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
