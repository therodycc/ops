// React
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
// @mui
import {
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  CardHeader,
  Typography,
  TableCell,
  TablePagination,
  TableContainer
} from '@mui/material';

import { Container, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ORDER } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// next
import NextLink from 'next/link';
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
import { getOrdersSummary } from '../../redux/slices/order';
import { CartWidget } from '../../sections/products/detail/CartWidget';
import { OrderState } from '../../interfaces/order/order';
import { AppState } from '../../redux/rootReducer';
import { Scrollbar } from '../../components/Scrollbar';
import Label from '../../components/Label';
import loadCustomRoutes from 'next/dist/lib/load-custom-routes';
import { OrderStatus } from '../../enums/order.status';
import EmptyContent from '../../components/EmptyContent';
import { SkeletonOrderList } from '../../components/skeleton';

// ----------------------------------------------------------------------

OrderListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrderListPage() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const dispatch = useDispatch();

  const isLight = theme.palette.mode === 'light';
  const { orders, count, isLoading } = useSelector<AppState, OrderState>(state => state.order);

  useEffect(() => {
    dispatch(getOrdersSummary(page + 1, size));
  }, [page, size]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   useEffect(() => {
  //     if (isMountedRef.current) {
  //       setOrders(orders);
  //     }
  //   }, [dispatch]);

  if (isLoading) return <SkeletonOrderList />;

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
          <Scrollbar>
            {orders && orders.length && (
              <TableContainer sx={{ minWidth: 720 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 140 }}>ID</TableCell>
                      <TableCell sx={{ width: 200 }}>Cliente</TableCell>
                      <TableCell sx={{ width: 140 }}>Fecha</TableCell>
                      <TableCell sx={{ width: 140 }}>Status</TableCell>
                      <TableCell sx={{ width: 120 }}>Source</TableCell>
                      <TableCell sx={{ width: 140 }}>Total</TableCell>
                      <TableCell sx={{ width: 120 }}>Falta pago</TableCell>
                      <TableCell sx={{ width: 140 }}>Seguro?</TableCell>
                      <TableCell sx={{ width: 160 }}>Vacia?</TableCell>

                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{order.id}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>{order.profile.fullName}</TableCell>
                        <TableCell>{moment(new Date(order.date.created)).fromNow()}</TableCell>

                        <TableCell>
                          <Label
                            variant={isLight ? 'ghost' : 'filled'}
                            color={
                              ((order.status === OrderStatus.PAID ||
                                order.status === OrderStatus.COMPLETED) &&
                                'success') ||
                              ((order.status === OrderStatus.DRAFT ||
                                order.status === OrderStatus.PENDING_PAYMENT) &&
                                'warning') ||
                              'error'
                            }
                          >
                            {order.statusDescription}
                          </Label>
                        </TableCell>

                        <TableCell>
                          <Label
                            variant={isLight ? 'ghost' : 'filled'}
                            color={(order.source === 'mobile' && 'info') || 'default'}
                          >
                            {order.source}
                          </Label>
                        </TableCell>

                        <TableCell>{order.payments.total}</TableCell>

                        <TableCell>
                          <Label
                            variant={isLight ? 'ghost' : 'filled'}
                            color={(order.payments.isMissingPayment && 'warning') || 'default'}
                          >
                            {order.payments.pending}
                          </Label>
                        </TableCell>

                        <TableCell>
                          <Label
                            variant={isLight ? 'ghost' : 'filled'}
                            color={(order.hasPrescriptions && 'info') || 'default'}
                          >
                            {order.hasPrescriptions ? 'Si' : 'No'}
                          </Label>
                        </TableCell>

                        <TableCell>{order.isDraft ? 'Si' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ p: 2, textAlign: 'right' }}>
                  <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={size}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </TableContainer>
            )}
            {!orders ||
              (!orders.length && (
                <EmptyContent
                  title="No hay ordenes que mostrar"
                  description="Al parecer no hay ordenes pendientes"
                  img="/illustrations/illustration_empty_cart.svg"
                />
              ))}
          </Scrollbar>

          {/* <Divider /> */}
        </Card>
      </Container>
    </Page>
  );
}
