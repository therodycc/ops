import { CardHeader, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '../../../../interfaces/order/order';
import { AppState } from '../../../../redux/rootReducer';
import { formatAmount } from '../../../../utils/currencyFormat';
import { NetzerTable } from '../../../common/table';
import Iconify from '../../../Iconify';
import { PaymentsColumns } from './PaymentsColumns';

interface PaymentsTableProps {
  onShowModalHandle: Function;
}
export const PaymentsTable: FC<PaymentsTableProps> = ({ onShowModalHandle }) => {
  const { detail } = useSelector<AppState, OrderState>(state => state.order);

  return (
    <React.Fragment>
      <Grid
        container
        padding={'10px'}
        marginTop={'10px'}
        justifyContent="flex-end"
        spacing={2}
      ></Grid>
      <PaymentsColumns>
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={detail?.payments}
            {...(detail?.paymentDetail.isMissingPayment
              ? {
                  buttonTable: {
                    variant: 'contained',
                    color: 'success',
                    children: 'Agregar metodo de pago',
                    onClick: onShowModalHandle,
                    sx: { color: 'white', width: 'auto' },
                    startIcon: <Iconify icon={'eva:plus-fill'} />
                  }
                }
              : {})}
            leftSection={
              <div style={{ margin: '10px 0px' }}>
                <Typography variant="h6">
                  Total : {formatAmount(detail?.paymentDetail?.total)}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Pendiente: {formatAmount(detail?.paymentDetail?.pending)}
                </Typography>
              </div>
            }
          />
        )}
      </PaymentsColumns>
    </React.Fragment>
  );
};
