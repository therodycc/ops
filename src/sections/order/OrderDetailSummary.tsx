import { Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
moment.locale('en-ES');

import Iconify from '../../components/Iconify';
import { OrderDetail } from '../../interfaces/order/order';
import { CheckoutSummary } from '../checkout';
import { OrderPrescriptions } from './OrderPrescriptions';

interface OrderDetailSummaryProp {
  order: OrderDetail;
}

export const OrderDetailSummary: React.FC<OrderDetailSummaryProp> = ({
  order
}: OrderDetailSummaryProp) => {
  if (!order) return null;

  const { id, date, prescriptions, summary, profile } = order;

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} md={9} lg={8} spacing={1}>
        <Grid item xs={12} md={7} lg={7}>
          <Card>
            <CardHeader title="Detalle" sx={{ mb: 3 }} />

            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ID
                  </Typography>
                  <Typography variant="subtitle2">{id}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Fecha
                  </Typography>

                  <Typography variant="subtitle2">
                    {moment(date.created).format('h:mm A dddd, D [de] MMMM ')}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>

                  <Typography variant="subtitle2">
                    <Iconify
                      icon={'ic:round-verified'}
                      sx={{ color: 'success.main' }}
                      width={16}
                      height={16}
                    />
                    &nbsp;Verified purchase
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ID
                  </Typography>

                  <Typography variant="subtitle2">{profile.id}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Cliente
                  </Typography>

                  <Typography variant="subtitle2">{profile.fullName}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Celular
                  </Typography>

                  <Typography variant="subtitle2">{profile.cellphone}</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5} lg={5}>
          <CheckoutSummary
            title={'Resumen de la orden'}
            total={summary.total}
            itbis={summary.itbis}
            discount={summary.discount}
            insurance={0}
            subTotal={'0'}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={3} lg={4}>
        <OrderPrescriptions prescriptions={prescriptions} />
      </Grid>
    </Grid>
  );
};
