import { Box, IconButton, Stack, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import { ColumnsI, ColumnsTableI } from '../../interfaces/table/table.interface';
import { CounterCart } from './CounterCart';

interface CheckoutProductsColumnsProps extends ColumnsTableI {
  onIncrease: Function;
  onDecrease: Function;
  onDelete: Function;
}

export const CheckoutProductsColumns = ({
  children,
  onDecrease,
  onDelete,
  onIncrease
}: CheckoutProductsColumnsProps) => {
  let columns: ColumnsI[] = [
    {
      title: 'Product',
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
      title: 'Precio',
      key: 'price'
    },
    {
      title: 'Cantidad',
      render: ({ data }) => {
        return (
          <CounterCart
            quantity={data.quantity}
            available={data.stock}
            onIncrease={(updatedQuantity: number) =>
              onIncrease(data.cartId, data.id, updatedQuantity, data.unit)
            }
            onDecrease={(updatedQuantity: number) =>
              onDecrease(data.cartId, data.id, updatedQuantity, data.unit)
            }
          />
        );
      }
    },
    {
      title: 'Descuento',
      key: 'discount'
    },
    {
      title: 'Total',
      render: ({ data }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">{data.total}</Typography>
            <IconButton onClick={() => onDelete(data.cartId)} sx={{ mb: 1 }}>
              <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
  return children({ columns });
};
