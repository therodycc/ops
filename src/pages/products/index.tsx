// React
import { useCallback, useEffect } from 'react';
// @mui
import { Box, Container, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// next
// layouts
import Layout from '../../layouts';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// Redux
import { getProducts } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import { useRouter } from 'next/router';
import { ProductSearch } from '../../components/ProductSearch';
import { SkeletonProductItem } from '../../components/skeleton';
import { Product } from '../../interfaces/product/product';
import { CartWidget } from '../../sections/products/detail/CartWidget';
import { ProductList } from '../../sections/products/list';

// ----------------------------------------------------------------------

ProductListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductListPage() {
  const { themeStretch } = useSettings();
  const { replace, push } = useRouter();
  const dispatch = useDispatch();

  const { products } = useSelector((state: any) => state.product);

  const productSelectedHandler = useCallback(
    (product: Product) => {
      replace(PATH_PRODUCTS.new);
    },
    [replace]
  );

  const goToDetail = useCallback(
    ({ id }: Product) => {
      push(PATH_PRODUCTS.detail(id));
    },
    [replace]
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Orden - Detalle">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Ordenes"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Productos', href: PATH_PRODUCTS.root },
            { name: 'Detalle' }
          ]}
        />
        <CartWidget />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ProductSearch onSelect={goToDetail} />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            }
          }}
        >
          {(!products ? [...Array(12)] : products).map((product, index) =>
            product ? (
              <ProductList
                key={product.id}
                product={product}
                onSelect={product => productSelectedHandler(product)}
              />
            ) : (
              <SkeletonProductItem key={index} />
            )
          )}
        </Box>
      </Container>
    </Page>
  );
}
