import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { OrderStatus } from '../../../enums/order.status';
import { ColumnsI, ColumnsTableI } from '../../../interfaces/table/table.interface';
import Label from '../../Label';

interface OrdersColumnsProps extends ColumnsTableI {}

export const OrdersColumns = ({ children }: OrdersColumnsProps) => {
  let columns: ColumnsI[] = [
    {
      title: 'ID',
      render: ({ data }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">{data.id}</Typography>
          </Stack>
        );
      }
    },
    {
      title: 'Cliente',
      render: ({ data }) => {
        return <Typography>{data.profile.fullName}</Typography>;
      }
    },
    {
      title: 'Fecha',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{moment(new Date(data.date.created)).fromNow()}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Status',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Label
              variant={'ghost'}
              color={
                ((data.status === OrderStatus.PAID || data.status === OrderStatus.COMPLETED) &&
                  'success') ||
                ((data.status === OrderStatus.DRAFT ||
                  data.status === OrderStatus.PENDING_PAYMENT) &&
                  'warning') ||
                'error'
              }
            >
              {data.statusDescription}
            </Label>
          </Box>
        );
      }
    },
    {
      title: 'Canal',
      render: ({ data }) => {
        return (
          <Label variant={'ghost'} color={(data.source === 'mobile' && 'info') || 'default'}>
            {data.source}
          </Label>
        );
      }
    },
    {
      title: 'Total',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data.payments.total}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Falta pago',
      render: ({ data }) => {
        return (
          <Label
            variant={'ghost'}
            color={(data.payments.isMissingPayment && 'warning') || 'default'}
          >
            {data.payments.pending}
          </Label>
        );
      }
    },
    {
      title: 'Seguro?',
      render: ({ data }) => {
        return (
          <Label variant={'ghost'} color={(data.hasPrescriptions && 'info') || 'default'}>
            {data.hasPrescriptions ? 'Si' : 'No'}
          </Label>
        );
      }
    },
    {
      title: 'Vacia?',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data.isDraft ? 'Si' : 'No'}</Typography>
          </Box>
        );
      }
    }
  ];
  return children({ columns });
};
