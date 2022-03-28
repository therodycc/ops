// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userCards } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ProductList } from '../../sections/products/list';
import { productService } from '../../services/product.service';
import { useEffect, useState } from 'react';
import { SkeletonProductItem } from '../../components/skeleton';

// ----------------------------------------------------------------------

UserCards.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService.list().then(response => {
      const newProducts = response.data?.data ?? [];
      setProducts(stateProducts => {
        return newProducts;
      });
      setIsLoading(false);
    });
  }, []);

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
        />

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
          {(isLoading ? [...Array(12)] : products).map((product, index) =>
            product ? (
              <ProductList key={product.id} product={product} />
            ) : (
              <SkeletonProductItem key={index} />
            )
          )}
        </Box>
      </Container>
    </Page>
  );
}
