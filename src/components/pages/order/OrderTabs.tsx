import { OrderDetail } from '../../../interfaces/order/order';
import { OrderDetailSummary } from './resume/OrderDetailSummary';
import Iconify from '../../Iconify';
import { ProductOrderTable } from './ProductOrderTable';
import { Payments } from './payments/Payments';
import { DeliveryTab } from './delivery';

interface OrderTabsProps {
  orderDetail: OrderDetail;
}
export const OrderTabs = ({ orderDetail }: OrderTabsProps) => {
  return [
    {
      value: 'Resumen',
      icon: <Iconify icon={'icon-park-solid:view-grid-detail'} width={20} height={20} />,
      component: <OrderDetailSummary orderDetail={orderDetail} />
    },
    {
      value: 'Productos',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <ProductOrderTable products={orderDetail?.products} />
    },
    {
      value: 'Pagos',
      icon: <Iconify icon={'oi:credit-card'} width={20} height={20} />,
      component: <Payments />
    },
    {
      value: 'Delivery',
      icon: <Iconify icon={'mdi:motorbike'} width={20} height={20} />,
      component: <DeliveryTab />
    }
  ];
};
