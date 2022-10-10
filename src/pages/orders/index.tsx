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
import { AlertDialog } from '../../components/common/alert';
import { useEffect, useState } from 'react';

export default function OrderListPage() {
  const { themeStretch } = useSettings();
  const [showDialog, setShowDialog] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowDialog(false);
    }, 5000);
  }, []);

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
        <OrdersTable />
      </Container>
      {showDialog && (
        <AlertDialog
          title={'Test'}
          message={'test'}
          type={'success'}
          sx={{ width: 'auto', zIndex: 9999, position: 'fixed', top: 10, right: 10 }}
        />
      )}
    </Page>
  );
}

// ----------------------------------------------------------------------

OrderListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
