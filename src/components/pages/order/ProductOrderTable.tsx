import { Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OrderDetail } from '../../../interfaces/order/order';
import { NetzerModal } from '../../common/modal';
import { NetzerTable } from '../../common/table';
import Iconify from '../../Iconify';
import { ColumnsProductsOrder } from './ColumnsProductsOrder';
import { MoreProductsToOrderTable } from './modals/products/MoreProductsToOrderTable';
interface ProductOrderTableProps {
  products: OrderDetail['products'];
}

export const ProductOrderTable: React.FC<ProductOrderTableProps> = ({ products }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    console.log('delete');
  };

  const onShowModalHandle = useCallback(() => {
    setShowModal(_prev => !_prev);
  }, [dispatch]);

  return (
    <React.Fragment>
      <NetzerModal
        title={
          <Typography variant="subtitle1" padding="0px 15px">
            {' '}
            Agregar más productos
          </Typography>
        }
        active={showModal}
        toggle={onShowModalHandle}
      >
        <MoreProductsToOrderTable toggle={onShowModalHandle} />
      </NetzerModal>
      <ColumnsProductsOrder handleDelete={handleDelete}>
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={products}
            buttonTable={{
              variant: 'contained',
              color: 'success',
              children: 'Agregar productos',
              onClick: onShowModalHandle,
              sx: { color: 'white', width: 'auto' },
              startIcon: <Iconify icon={'eva:plus-fill'} />
            }}
          />
        )}
      </ColumnsProductsOrder>
    </React.Fragment>
  );
};
