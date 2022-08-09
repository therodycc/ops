import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { dispatch, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_CHECKOUT } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { Scrollbar } from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
// import RHFCheckbox from '../../components/hook-form/RHFCheckbox';
//
import { CheckoutSummary } from './CheckoutSummary';
import { CheckoutProductList } from './CheckoutProductList';
import { ApplyInsuranceCredit, InsuranceCredit } from './ApplyInsuranceCredit';
import { removeCart, updateCart } from '../../redux/slices/cart';
import { CartDto, CartState } from '../../interfaces/cart/cart';
import { AppState } from '../../redux/rootReducer';
import { ProductUnit } from '../../enums/product-unit.enum';
import { AuthState } from '../../interfaces/user';
// ----------------------------------------------------------------------

export const CheckoutCart = () => {
  const dispatch = useDispatch();

  const {
    user: { id: profileId }
  } = useSelector<AppState, AuthState>(state => state.auth);
  const { subTotal, discount, total, itbis, products } = useSelector<AppState, CartState>(
    state => state.cart
  );

  const [insurance, setInsurance] = useState(0);

  const isEmptyCart = products.length === 0;

  const handleDeleteCart = cartId => {
    dispatch(removeCart(cartId));
  };

  const handleNextStep = () => {
    //dispatch(onNextStep());
  };

  const applyInsuranceCreditHandle = ({ amount }: InsuranceCredit) => {
    setInsurance(amount);
  };

  const updateQuantity = (
    cartId: number,
    productId: number,
    quantity: number,
    unit: ProductUnit
  ) => {
    const cartDto: CartDto = {
      cartId,
      productId,
      quantity,
      profileId,
      unit
    };

    dispatch(updateCart(cartDto));
  };

  const handleApplyDiscount = value => {
    //dispatch(applyDiscount(value));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Carrito
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({products.length} productos)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={products}
                onDelete={handleDeleteCart}
                onIncrease={updateQuantity}
                onDecrease={updateQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="El carrito esta vacio"
              description="Parece que aun no has agregado productos en el carrito"
              img="/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <NextLink href={PATH_CHECKOUT.root} passHref>
          <Button color="inherit" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Seleccionar otros productos
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        {/* <RHFCheckbox onChange={e => console.log(e)}>Hola</RHFCheckbox> */}
        <CheckoutSummary
          total={total}
          itbis={itbis}
          discount={discount}
          insurance={insurance}
          subTotal={subTotal}
          // onApplyDiscount={handleApplyDiscount}
        />

        {!isEmptyCart && (
          <ApplyInsuranceCredit total={total} onApply={applyInsuranceCreditHandle} />
        )}

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isEmptyCart}
          onClick={handleNextStep}
        >
          Crear orden
        </Button>
      </Grid>
    </Grid>
  );
};
