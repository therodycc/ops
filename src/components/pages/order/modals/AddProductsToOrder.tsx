import { LoadingButton, Masonry } from '@mui/lab';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NetzerModal } from '../../../common/modal';
import { MoreProductsToOrderTable } from './MoreProductsToOrderTable';

export const AddProductsToOrder = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const onShowModalHandle = useCallback(() => {
    setShowModal(_prev => !_prev);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Masonry columns={3} spacing={2}>
        <LoadingButton
          variant="contained"
          onClick={onShowModalHandle}
          style={{ margin: '1rem 0.7rem' }}
        >
          Agregar mas productos
        </LoadingButton>
      </Masonry>
      <NetzerModal title="Agregar más productos" active={showModal} toggle={onShowModalHandle}>
        <MoreProductsToOrderTable toggle={onShowModalHandle} />
      </NetzerModal>
    </React.Fragment>
  );
};
