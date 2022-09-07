// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ORDER } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
// _mock_
// layouts
import Layout from '../../../layouts';
// components
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { OrderTabs } from '../../../components/pages/order/OrderTabs';
import { OrderState } from '../../../interfaces/order/order';
import { AppState } from '../../../redux/rootReducer';
import { getOrderDetail } from '../../../redux/slices/order';

export default function OrderDetail() {
  const { currentTab, onChangeTab } = useTabs('Resumen');
  const dispatch = useDispatch();
  const { query } = useRouter();
  const id: string = query.id as string;

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [id]);

  const { detail: orderDetail } = useSelector<AppState, OrderState>(state => state.order);

  const ORDERS_TABS = OrderTabs({ orderDetail });

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

// ----------------------------------------------------------------------

OrderDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
