import { Grid } from '@mui/material';
import { OrderDetail } from '../../interfaces/order/order';
import { OrderPrescriptions } from './OrderPrescriptions';

interface OrderDetailSummaryProp {
  order: OrderDetail;
}

export const OrderDetailSummary: React.FC<OrderDetailSummaryProp> = ({
  order
}: OrderDetailSummaryProp) => {
  if (!order) return null;
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={9} lg={8}>
          <h2>Hola</h2>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <OrderPrescriptions prescriptions={order.prescriptions} />
        </Grid>
      </Grid>
    </>
  );
};
