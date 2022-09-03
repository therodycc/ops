// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ORDER } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
// _mock_
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { OrderDetailSummary } from '../../../sections/order/OrderDetailSummary';
import { useRouter } from 'next/router';
import { useOrderDetail } from '../../../hooks/useOrderDetail';
import { OrderDetail as TOrderDetail } from '../../../interfaces/order/order';
import ProductOrderTable from '../../../components/pages/order/ProductOrderTable';

// ----------------------------------------------------------------------

OrderDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrderDetail() {
  const { currentTab, onChangeTab } = useTabs('general');

  const { query } = useRouter();
  const id: string = query.id as string;

  const orderDetail: TOrderDetail = useOrderDetail(id);

  const OrderDetail = <OrderDetailSummary order={orderDetail} />;
  const ORDERS_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'icon-park-solid:view-grid-detail'} width={20} height={20} />,
      component: OrderDetail
    },
    {
      value: 'billing',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <ProductOrderTable />
    },
    {
      value: 'notifications',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <h2>Hola</h2>
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <h2>Hola</h2>
    },
    {
      value: 'change_password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <h2>Hola</h2>
    }
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={
            orderDetail?.profile.firstName
              ? `Orden de ${orderDetail?.profile.firstName}`
              : 'Cargando...'
          }
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Ordenes', href: PATH_ORDER.root },
            {
              name: orderDetail?.profile.firstName
                ? `Order de ${orderDetail?.profile.firstName}`
                : ''
            }
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ORDERS_TABS.map(tab => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 2 }} />

        {ORDERS_TABS.map(tab => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
