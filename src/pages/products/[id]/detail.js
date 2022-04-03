import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Grid, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getProduct, addCart } from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { SkeletonProductDetail } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ProductImage } from '../../../sections/products/detail/ProductImage';
import { ProductDetailSummary } from '../../../sections/products/detail/ProductDetailSummary';
import { CartWidget } from '../../../sections/products/detail//CartWidget';

ProductDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;

  const { product } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddCart = product => {
    dispatch(addCart(product));
  };

  return (
    <Page title="Detalle de Producto">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            {
              name: 'Productos',
              href: PATH_PRODUCTS.root
            },
            { name: `Detalle de ${product?.name}` }
          ]}
        />

        <CartWidget />
        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductImage product={product} />
                </Grid>

                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailSummary
                    product={product}
                    // cart={checkout.cart}
                    onAddCart={handleAddCart}
                    // onGotoStep={handleGotoStep}
                  />
                </Grid>
              </Grid>
            </Card>
          </>
        )}

        {!product && <SkeletonProductDetail />}
        {/*{error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
