import { Avatar, Box, Checkbox, TableCell, Typography } from '@mui/material';
import { ColumnsTableI } from '../../../interfaces/table/table.interface';

interface ColumnsProductsOrderProps extends ColumnsTableI {
  handleDelete?: Function;
}

const ColumnsProductsOrder = ({ children, handleDelete }: ColumnsProductsOrderProps) => {
  let columns = [
    {
      title: () => {
        return <Typography variant="body2">Product</Typography>;
      },
      render: row => (
        <TableCell padding="checkbox">
          <Checkbox checked={true} onClick={() => {}} />
        </TableCell>
      )
    },
    {
      title: 'Product',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data.id}</Typography>
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

export default ColumnsProductsOrder;
