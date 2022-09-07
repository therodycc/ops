import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ColumnsI, ColumnsTableI } from '../../../../interfaces/table/table.interface';
import { CounterCart } from '../../../../sections/checkout/CounterCart';
import { getPriceAndApplyDiscount } from '../../../../utils/price.utils';
import { NetzerSelect } from '../../../common/select';
import Iconify from '../../../Iconify';
import Image from '../../../Image';
import Label from '../../../Label';

interface MoreProductsToOrderColumnsProps extends ColumnsTableI {
  onIncrease: Function;
  onDecrease: Function;
  selectedWayOfProduct: Function;
  removeProduct: Function;
}

const getNameOfKeys = (key: string) =>
  ({
    blister: 'Blister',
    unit: 'Unidad',
    box: 'Caja'
  }?.[key]);

export const MoreProductsToOrderColumns = ({
  children,
  onDecrease,
  onIncrease,
  selectedWayOfProduct,
  removeProduct
}: MoreProductsToOrderColumnsProps) => {
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
      title: 'Vender como',
      render: ({ data }) => {
        return (
          <React.Fragment>
            <NetzerSelect
              id={data.id}
              selected={data?.unit}
              options={Object.keys(data?.price).map(key => {
                return {
                  label: getNameOfKeys(key),
                  value: key
                };
              })}
              onChange={value => {
                selectedWayOfProduct(data, value);
              }}
            />
          </React.Fragment>
        );
      }
    },
    {
      title: 'Precio',
      render: ({ data }) => {
        return <React.Fragment>{getPriceAndApplyDiscount(data, data.unit)}</React.Fragment>;
      }
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
      render: ({ data }) => {
        return (
          <Grid justifyContent={'center'}>
            {data?.price[data.unit]?.discount ? (
              <Label variant={'ghost'} color="success">
                <Iconify icon={'ic:round-verified'} width={20} height={20} />:
              </Label>
            ) : (
              <Label variant={'ghost'} color="warning">
                <Iconify icon={'ic:round-close'} width={20} height={20} />
              </Label>
            )}
          </Grid>
        );
      }
    },
    {
      title: 'Total',
      render: ({ data, index }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">{data.total}</Typography>
            <IconButton onClick={() => removeProduct(index)} sx={{ mb: 1 }}>
              <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
  return children({ columns });
};
