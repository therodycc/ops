// @mui
import { Container } from '@mui/material';
// routes
import { PATH_PRODUCTS, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import NewProductForm from '../../sections/products/new/NewProductForm';
// sections
// import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

ProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Producto: Crear Nuevo">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Crear Nuevo Producto"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Productos', href: PATH_PRODUCTS.root },
            { name: 'Crear Producto' }
          ]}
        />
        <NewProductForm />
      </Container>
    </Page>
  );
}
