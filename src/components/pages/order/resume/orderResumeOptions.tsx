import { Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { OrderDetail } from '../../../../interfaces/order/order';
moment.locale('en-ES');

interface OrderResumeOptionsI {
  orderDetail: OrderDetail;
}

export const orderResumeOptions = ({ orderDetail }: OrderResumeOptionsI) => {
  return [
    {
      title: 'Subtotal',
      description: orderDetail?.summary?.subTotal
    },
    {
      title: 'Itbis',
      description: orderDetail?.summary?.itbis
    },
    {
      title: 'Descuentos',
      description: (
        <React.Fragment>
          <Typography variant="subtitle2" sx={{ color: 'red' }}>
            {orderDetail?.summary?.discount ? `-${orderDetail?.summary?.discount}` : '-'}
          </Typography>
        </React.Fragment>
      )
    },
    // TODO:  order details need a insurance field
    // orderDetail.summary.insurance > 0 &&
    false
      ? {
          title: 'Seguro Medico',
          description: (
            <React.Fragment>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Seguro medico
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'red' }}>
                  {/* -{insurance} */}
                </Typography>
              </Stack>
            </React.Fragment>
          )
        }
      : {},
    {
      divider: true
    },
    {
      title: 'Total',
      description: (
        <React.Fragment>
          <Typography variant="subtitle1" sx={{ color: 'blue' }}>
            {orderDetail?.summary?.total}
          </Typography>
        </React.Fragment>
      )
    }
  ];
};

export default orderResumeOptions;
