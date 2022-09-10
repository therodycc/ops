import { Avatar, Box, Checkbox, TableCell, Typography } from '@mui/material';
import { ColumnsI, ColumnsTableI } from '../../../interfaces/table/table.interface';
import Image from '../../Image';

interface ColumnsProductsOrderProps extends ColumnsTableI {
  handleDelete?: Function;
}

export const ColumnsProductsOrder = ({ children, handleDelete }: ColumnsProductsOrderProps) => {
  let columns: ColumnsI[] = [
    {
      title: 'Producto',
      render: ({ data }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              alt="product image"
              src={data.photo}
              sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
            />
            <Box>
              <Typography noWrap variant="subtitle2" sx={{ maxWidth: 180 }}>
                {data?.name}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body2">
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  ></Typography>
                  {data?.unit}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      }
    },
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
      title: 'Precio',
      key: 'price'
    },
    {
      title: 'Unidad',
      key: 'unit'
    },
    {
      title: 'Cantidad de productos',
      key: 'quantity'
    }
  ];
  return children({ columns });
};
