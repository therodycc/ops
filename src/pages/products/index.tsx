// React
import { useEffect } from 'react';
// @mui
import { Button } from '@mui/material';
import { Container, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../routes/paths';
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
import { getProducts } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import { ProductList, ProductSearch } from '../../sections/products/list';
import { SkeletonProductItem } from '../../components/skeleton';
import { useRouter } from 'next/router';
import { Product } from '../../interfaces/product/product';

// ----------------------------------------------------------------------

ProductListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductListPage() {
  const { themeStretch } = useSettings();
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const { products } = useSelector((state: any) => state.product);

  const productSelectedHandler = (product: Product) => {
    // Pass the current id
    replace(PATH_PRODUCTS.new);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Productos - Lista">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lista de Productos"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Productos', href: PATH_PRODUCTS.root },
            { name: 'Lista' }
          ]}
          action={
            <NextLink href={PATH_PRODUCTS.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                Agregar Producto
              </Button>
            </NextLink>
          }
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ProductSearch />
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
