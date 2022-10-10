import { useCallback, useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Button, Card, CardHeader, Grid, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_CHECKOUT } from '../../routes/paths';
// components
import EmptyContent from '../../components/EmptyContent';
import Iconify from '../../components/Iconify';
import { Scrollbar } from '../../components/Scrollbar';
// import RHFCheckbox from '../../components/hook-form/RHFCheckbox';
//
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import React from 'react';
import { BoxDetails } from '../../components/common/box/BoxDetails';
import { NetzerButton } from '../../components/common/button';
import { NetzerModal } from '../../components/common/modal';
import { ProductUnit } from '../../enums/product-unit.enum';
import { CartDto, CartState } from '../../interfaces/cart/cart';
import { Notification } from '../../interfaces/notification';
import { CreateOrderDto, OrderState } from '../../interfaces/order/order';
import { AuthState } from '../../interfaces/user';
import { AppState } from '../../redux/rootReducer';
import { removeCart, updateCart } from '../../redux/slices/cart';
import { createOrder } from '../../redux/slices/order';
import { ApplyInsuranceCredit, InsuranceCredit } from './ApplyInsuranceCredit';
import { CheckoutProductList } from './CheckoutProductList';
import { CheckoutSummary } from './CheckoutSummary';
import { ClientForm } from './modals/ClientForm';
import { getRowsForBoxClient } from '../../settings/checkout/getRowsForBoxClient';
import { assignClientToOrderAction, CartOrderState } from '../../redux/slices/cart-order';

// ----------------------------------------------------------------------

export const CheckoutCart = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showModalClient, setShowModalClient] = useState(false);

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
    progressDataToCreateOrder,
    existClient,
    profileId: clientId
  } = useSelector<AppState, CartOrderState>(state => state.cartOrder);

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
      profileId: existClient ? clientId : profileId,
      officeId,
      ...progressDataToCreateOrder,
      products: products.map(({ id, unit, quantity }) => {
        return {
          id,
          unit,
          quantity
        };
      })
    };
    dispatch(assignClientToOrderAction({ progressDataToCreateOrder: null }));
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
    const cartDto: CartDto = { cartId, productId, quantity, profileId, unit };
    dispatch(updateCart(cartDto));
  };

  const handleApplyDiscount = value => {
    //dispatch(applyDiscount(value));
  };

  const showModalClientAction = useCallback(() => {
    setShowModalClient(_prev => !_prev);
  }, []);

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
        {!isCreatingOrder && !progressDataToCreateOrder && !isEmptyCart && (
          <Grid
            item
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems="flex-end"
            xs={12}
            sx={{ margin: '15px 0' }}
          >
            <NetzerButton
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              isLoading={false}
              color={'info'}
              onClick={showModalClientAction}
            >
              Asignar a Cliente
            </NetzerButton>
          </Grid>
        )}
        <Grid item marginBottom={3}>
          {progressDataToCreateOrder && (
            <BoxDetails
              isLoading={!true}
              header={
                <Grid item display={'flex'} justifyContent={'space-between'} alignItems="start">
                  <Typography variant="h6">Cliente</Typography>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={showModalClientAction}
                    startIcon={<Iconify icon={'akar-icons:pencil'} />}
                  >
                    Editar cliente
                  </Button>
                </Grid>
              }
              rows={getRowsForBoxClient(progressDataToCreateOrder, true)}
            />
          )}
        </Grid>
        <CheckoutSummary
          title={'Resumen de la Compra'}
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

      <NetzerModal
        title={
          <React.Fragment>
            <Typography variant="h5">Asignar cliente</Typography>
            <Typography variant="subtitle2" color="gray">
              Asignar orden a un cliente
            </Typography>
          </React.Fragment>
        }
        active={showModalClient}
        toggle={showModalClientAction}
      >
        <Grid item justifyContent="flex-start">
          <ClientForm toggle={showModalClientAction} />
        </Grid>
      </NetzerModal>
    </Grid>
  );
};
