import { OrderDetail } from '../../../interfaces/order/order';
import { OrderDetailSummary } from './OrderDetailSummary';
import Iconify from '../../Iconify';
import { ProductOrderTable } from './ProductOrderTable';

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
};
