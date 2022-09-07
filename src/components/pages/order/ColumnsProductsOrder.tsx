import { Avatar, Box, Checkbox, TableCell, Typography } from '@mui/material';
import { ColumnsI, ColumnsTableI } from '../../../interfaces/table/table.interface';

interface ColumnsProductsOrderProps extends ColumnsTableI {
  handleDelete?: Function;
}

export const ColumnsProductsOrder = ({ children, handleDelete }: ColumnsProductsOrderProps) => {
  let columns: ColumnsI[] = [
    {
      title: 'ID',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data.id}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Producto',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data.name}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Precio',
      key: 'price'
    },
    {
      title: 'Unidad',
      key: 'unit'
    },
    {
      title: 'Cantidad',
      key: 'quantity'
    },
    {
      title: 'Photo',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Avatar src={data.photo} sx={{ mr: 2 }} />
          </Box>
        );
      }
    }
  ];
  return children({ columns });
};
