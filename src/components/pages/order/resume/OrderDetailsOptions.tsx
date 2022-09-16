import moment from 'moment';
import { OrderDetail } from '../../../../interfaces/order/order';
moment.locale('en-ES');

interface OrderDetailsOptionsI {
  orderDetail: OrderDetail;
}

export const orderDetailsOptions = ({ orderDetail }: OrderDetailsOptionsI) => {
  return [
    {
      title: 'ID',
      description: orderDetail?.id
    },
    {
      title: 'Fecha',
      description: moment(orderDetail?.date.created).format('h:mm A dddd, D [de] MMMM ')
    },
    {
      title: 'Status',
      description: orderDetail?.statusDescription
    },
    {
      divider: true
    },
    {
      title: 'ID',
      description: orderDetail?.profile?.id
    },
    {
      title: 'Cliente',
      description: orderDetail?.profile?.fullName
    },
    {
      title: 'Celular',
      description: orderDetail?.profile?.cellphone
    }
  ];
};

export default orderDetailsOptions;
