// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { Scrollbar } from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
//
import { CheckoutSummary } from './CheckoutSummary';
import { CheckoutProductList } from './CheckoutProductList';

// ----------------------------------------------------------------------

export const CheckoutCart = () => {
  const { subTotal, discount, total, itbis, products } = useSelector((state: any) => state.cart);

  const isEmptyCart = products.length === 0;

  const handleDeleteCart = productId => {
    // //dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    //dispatch(onNextStep());
  };

  const handleIncreaseQuantity = productId => {
    //dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = productId => {
    //dispatch(decreaseQuantity(productId));
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
                // onDelete={handleDeleteCart}
                // onIncreaseQuantity={handleIncreaseQuantity}
                // onDecreaseQuantity={handleDecreaseQuantity}
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

        <NextLink href={PATH_DASHBOARD.eCommerce.root} passHref>
          <Button color="inherit" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Continuar comprando
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          total={total}
          itbis={itbis}
          discount={discount}
          subTotal={subTotal}
          // onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={products.length === 0}
          onClick={handleNextStep}
        >
          Pagar
        </Button>
      </Grid>
    </Grid>
  );
};
