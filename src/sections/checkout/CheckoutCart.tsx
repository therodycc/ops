import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
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
import { CreateOrderDto, OrderState } from '../../interfaces/order/order';
import { LoadingButton } from '@mui/lab';
import { createOrder } from '../../redux/slices/order';
import { Notification } from '../../interfaces/notification';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export const CheckoutCart = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [insurance, setInsurance] = useState(0);

  const {
    user: { id: profileId, officeId }
  } = useSelector<AppState, AuthState>(state => state.auth);

  const { subTotal, discount, total, itbis, products } = useSelector<AppState, CartState>(
    state => state.cart
  );

  const isEmptyCart = products.length === 0;

  const { isLoading: isCreatingOrder } = useSelector<AppState, OrderState>(state => state.order);

  const {
    new: isNewNotification,
    type,
    message
  } = useSelector<AppState, Notification>(state => state.notification);

  useEffect(() => {
    if (!isNewNotification) return;

    enqueueSnackbar(message);
  }, [isNewNotification, type, message]);

  const handleDeleteCart = cartId => {
    dispatch(removeCart(cartId));
  };

  const createOrderHandler = () => {
    const orderDto: CreateOrderDto = {
      profileId,
      officeId,
      products: products.map(({ id, unit, quantity }) => {
        return {
          id,
          unit,
          quantity
        };
      })
    };
    dispatch(createOrder(orderDto));
  };

  const applyInsuranceCreditHandle = ({ amount }: InsuranceCredit) => {
    setInsurance(amount);
  };

  const updateQuantity = (
    cartId: string,
    productId: string,
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
        />

        {!isEmptyCart && (
          <ApplyInsuranceCredit total={parseInt(total)} onApply={applyInsuranceCreditHandle} />
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isEmptyCart}
          onClick={createOrderHandler}
          loading={isCreatingOrder}
        >
          Crear orden
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
