// React
// @mui
import { Card, CardHeader } from '@mui/material';

import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ORDER } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { OrdersTable } from '../../components/pages/order/OrdersTable';
import { CartWidget } from '../../sections/products/detail/CartWidget';

export default function OrderListPage() {
  const { themeStretch } = useSettings();

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
        <Card>
          <CardHeader title="Ordenes" sx={{ mb: 3 }} />
          <OrdersTable />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

OrderListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
