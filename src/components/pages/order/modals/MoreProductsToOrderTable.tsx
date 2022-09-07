import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductUnit } from '../../../../enums/product-unit.enum';
import { AuthState } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/rootReducer';
import { getProducts } from '../../../../redux/slices/product';
import { getPriceAndApplyDiscount } from '../../../../utils/price.utils';
import { NetzerTable } from '../../../common/table';
import { ProductSearch } from '../../../ProductSearch';
import { MoreProductsToOrderColumns } from './MoreProductsToOrderColumns';

export const MoreProductsToOrderTable = () => {
  const dispatch = useDispatch();
  const {
    user: { id: profileId, officeId }
  } = useSelector<AppState, AuthState>(state => state.auth);

  const [productsToBeAdded, setProductsToBeAdded] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addNewProductTo = useCallback(product => {
    console.log({ product });
    console.log(getPriceAndApplyDiscount(product, Object.keys(product?.price)?.[0] as ProductUnit));
    setProductsToBeAdded(_prev => [
      ..._prev,
      {
        ...product,
        unit: Object.keys(product?.price)?.[0],
        quantity: 1,
        total: getTotal(
          1,
          getPriceAndApplyDiscount(product, Object.keys(product?.price)?.[0] as ProductUnit)
        )
      }
    ]);
  }, []);

  const getTotal = useCallback((quantity: number | string, price: number | string) => {
    return Number(quantity) * Number(price);
  }, []);

  const selectedWayOfProduct = useCallback((product, way) => {
    setProductsToBeAdded(_prev => {
      const index = _prev.findIndex(_product => _product.id === product.id);
      _prev[index].unit = way;
      _prev[index].total = getTotal(
        _prev[index].quantity,
        _prev[index].price[product.unit].discount || _prev[index].price[product.unit].unit
      );
      return [..._prev];
    });
  }, []);

  const updateQuantity = (
    cartId: string,
    productId: string,
    quantity: number,
    unit: ProductUnit
  ) => {
    setProductsToBeAdded(_prev => {
      const index = _prev.findIndex(_product => _product.id === productId);
      _prev[index].quantity = quantity;
      _prev[index].unit = unit;
      _prev[index].total = getTotal(
        _prev[index].quantity,
        _prev[index]?.price?.[unit].discount || _prev[index]?.price?.[unit]?.original
      );
      console.log();
      return [..._prev];
    });
  };

  const removeProduct = useCallback((id: number) => {
    setProductsToBeAdded(_prev => _prev.filter((_product, index) => index !== id));
  }, []);

  return (
    <React.Fragment>
      <Grid container padding={'10px'} marginTop={'10px'} justifyContent="flex-end" spacing={2}>
        <ProductSearch onSelect={addNewProductTo} />
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
        <LoadingButton variant="outlined" onClick={() => {}} style={{ margin: '1rem 0.7rem' }}>
          Cancelar selección
        </LoadingButton>

        <LoadingButton variant="contained" onClick={() => {}} style={{ margin: '1rem 0.7rem' }}>
          Confirmar selección
        </LoadingButton>
      </Grid>
    </React.Fragment>
  );
};
