import { Card, Grid, Stack } from '@mui/material';
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
      <Card sx={{ mb: 3, width: 300 }}>
        <OrderPrescriptions prescriptions={order.prescriptions} />
      </Card>
    </>
  );
};
