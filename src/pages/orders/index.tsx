// React
import { useEffect, useState } from 'react';
// @mui
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Container, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ORDER, PATH_PRODUCTS } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// next
import NextLink from 'next/link';
// _mock_
import { _userCards } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// Redux
import { useDispatch, useSelector } from '../../redux/store';
// sections
// import { ProductList, ProductSearch } from '../../sections/products/list';
// import { SkeletonProductItem } from '../../components/skeleton';
import { useRouter } from 'next/router';
import { Product } from '../../interfaces/product/product';
import { getOrders } from '../../redux/slices/order';
import { CartWidget } from '../../sections/products/detail/CartWidget';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { OrderState } from '../../interfaces/order/order';
import { AppState } from '../../redux/rootReducer';

// ----------------------------------------------------------------------

OrderListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrderListPage() {
  const { themeStretch } = useSettings();

  //   const isMountedRef = useIsMountedRef();
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const { orders } = useSelector<AppState, OrderState>(state => state.order);

  //   const productSelectedHandler = (product: Product) => {
  //     // Pass the current id
  //     replace(PATH_PRODUCTS.new);
  //   };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (isMountedRef.current) {
  //       setOrders(orders);
  //     }
  //   }, [dispatch]);

  return (
    <Page title="Ordenes - Lista">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Ordenes"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Ordenes', href: PATH_ORDER.root },
            { name: 'Lista' }
          ]}
        />
        <CartWidget />
        {/*  */}

        <Grid container>
          {orders.map(order => (
            <Grid key={order.id} item xs={8} md={8} lg={8}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title={order.products[0].name} />
                <CardContent>
                  <Stack spacing={10}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Aqui iria informacion relacionada con la fecha, labels y los status
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
