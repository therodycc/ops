import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '../../../../interfaces/order/order';
import { AppState } from '../../../../redux/rootReducer';
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
      <PaymentsColumns>
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={detail?.payments}
            buttonTable={{
              variant: 'contained',
              color: 'success',
              children: 'Agregar metodo de pago',
              onClick: onShowModalHandle,
              sx: { color: 'white', width: 'auto' },
              startIcon: <Iconify icon={'eva:plus-fill'} />
            }}
          />
        )}
      </PaymentsColumns>
    </React.Fragment>
  );
};
