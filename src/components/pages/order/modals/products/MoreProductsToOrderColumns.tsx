import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ColumnsI, ColumnsTableI } from '../../../../../interfaces/table/table.interface';
import { CounterCart } from '../../../../../sections/checkout/CounterCart';
import { formatAmount } from '../../../../../utils/currencyFormat';
import { getPriceAndApplyDiscount } from '../../../../../utils/price.utils';
import { NetzerSelect } from '../../../../common/form/select';
import Iconify from '../../../../Iconify';
import Image from '../../../../Image';

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
              options={Object.keys(data?.price).map(key => {
                return {
                  label: getNameOfKeys(key),
                  value: key
                };
              })}
              props={{
                id: data.id + data?.unit,
                value: data?.unit,
                disabled: data?.disabledSelected
              }}
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
        return (
          <React.Fragment>{formatAmount(getPriceAndApplyDiscount(data, data.unit))}</React.Fragment>
        );
      }
    },
    {
      title: 'Cantidad',
      render: ({ data, index }) => {
        return (
          <CounterCart
            quantity={data.quantity}
            available={data.stock}
            onIncrease={(updatedQuantity: number) =>
              onIncrease(data.cartId, data.id, updatedQuantity, data.unit, index)
            }
            onDecrease={(updatedQuantity: number) =>
              onDecrease(data.cartId, data.id, updatedQuantity, data.unit, index)
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
              <Iconify icon={'ic:round-verified'} sx={{ color: 'green' }} width={20} height={20} />
            ) : (
              <Iconify icon={'ic:round-close'} sx={{ color: 'red' }} width={20} height={20} />
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
            <Typography variant="subtitle2">{formatAmount(data.total)}</Typography>
            <IconButton onClick={() => removeProduct(index, data.id)} sx={{ mb: 1 }}>
              <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
  return children({ columns });
};
