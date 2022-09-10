import { LoadingButton } from '@mui/lab';
import { Alert, Grid } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductUnit } from '../../../../enums/product-unit.enum';
import { useProductCart } from '../../../../hooks/common/useProductCart';
import { OrderState } from '../../../../interfaces/order/order';
import { AuthState } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/rootReducer';
import { addMoreProductsToOrder } from '../../../../redux/slices/order';
import { NetzerTable } from '../../../common/table';
import Iconify from '../../../Iconify';
import { ProductSearch } from '../../../ProductSearch';
import { MoreProductsToOrderColumns } from './MoreProductsToOrderColumns';
interface MoreProductsToOrderTableProps {
  toggle: Function;
}

export const MoreProductsToOrderTable: FC<MoreProductsToOrderTableProps> = ({ toggle }) => {
  const dispatch = useDispatch();
  const {
    user: { id: profileId, officeId }
  } = useSelector<AppState, AuthState>(state => state.auth);

  const { detail, isLoading } = useSelector<AppState, OrderState>((state: AppState) => state.order);

  const {
    addNewProductTo,
    productsToBeAdded,
    removeProduct,
    selectedWayOfProduct,
    updateQuantity,
    showError
  } = useProductCart();

  const addProductsToOrder = () => {
    dispatch(
      addMoreProductsToOrder(
        detail?.id,
        productsToBeAdded.map(item => {
          return {
            id: item.id,
            quantity: item.quantity,
            unit: item.unit as ProductUnit
          };
        }),
        toggle
      )
    );
  };

  return (
    <React.Fragment>
      <Grid container padding={'10px'} marginTop={'10px'} justifyContent="flex-start" spacing={2}>
        <ProductSearch onSelect={addNewProductTo} />
        {showError.show && (
          <Alert style={{ margin: '0rem 0.7rem' }} severity="error" onClose={() => {}}>
            {showError.message}
          </Alert>
        )}
      </Grid>
      <MoreProductsToOrderColumns
        onDecrease={updateQuantity}
        onIncrease={updateQuantity}
        removeProduct={removeProduct}
        selectedWayOfProduct={selectedWayOfProduct}
      >
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={productsToBeAdded}
            // rowAction={({ data }) => goToDetail(data?.id)}
            // pagination={{
            //     page,
            //     count,
            //     onPageChange: handleChangePage,
            //     rowsPerPage: size,
            //     onRowsPerPageChange: handleChangeRowsPerPage
            // }}
          />
        )}
      </MoreProductsToOrderColumns>
      <Grid container justifyContent="flex-end" spacing={2}>
        <LoadingButton
          variant="outlined"
          onClick={() => toggle?.()}
          style={{ margin: '1rem 0.7rem' }}
        >
          Cancelar selección
        </LoadingButton>

        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={() => {
            addProductsToOrder();
          }}
          style={{ margin: '1rem 0.7rem' }}
        >
          Confirmar selección
        </LoadingButton>
      </Grid>
    </React.Fragment>
  );
};
