import { Grid, Typography } from '@mui/material';
import React, { FC, memo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentContext } from '../../../../../contexts/payment';
import { OrderState } from '../../../../../interfaces/order/order';
import { AuthState } from '../../../../../interfaces/user';
import { AppState } from '../../../../../redux/rootReducer';
import { addPayToOrderAction } from '../../../../../redux/slices/order';
import { orderService } from '../../../../../services/order.service';
import { FormPayments } from './FormPayments';
import { PaymentMethods } from './PaymentMethod';
interface PaymentsModalProps {
  showModalPaymentsMethods: Function;
}
export const PaymentsModal: FC<PaymentsModalProps> = memo(function PaymentModal({
  showModalPaymentsMethods
}) {
  const { step, methodId, toggleLoading, handleError } = useContext(PaymentContext);
  const order = useSelector<AppState, OrderState>(state => state.order);
  const { user } = useSelector<AppState, AuthState>(state => state.auth);
  const dispatch = useDispatch();

  const handlePay = async formData => {
    toggleLoading();
    const result = await orderService.addPaymentToOrder({
      orderId: order?.detail?.id,
      payments: [
        {
          methodId,
          amount: +formData?.amount,
          reference: '',
          receivedBy: user.employeeId
        }
      ]
    });
    if (result.error) {
      return [toggleLoading(), handleError(result.error.message)];
    }
    dispatch(addPayToOrderAction({ detail: result.data }));
    return [toggleLoading?.(), showModalPaymentsMethods?.()];
  };

  return (
    <React.Fragment>
      <Grid container padding={'10px'} marginTop={'10px'} justifyContent="flex-end" spacing={2}>
        {step === 1 && (
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              sx={{ marginTop: '20px', color: 'gray', marginLeft: '10px' }}
            >
              Metodo de pago seleccionado
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <Typography variant="h6">Total : {'1000.00'}</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Pagado: {'1000.00'}
          </Typography>
        </Grid>
      </Grid>
      <PaymentMethods title={'Methodos de pago'} />
      {step === 1 && <FormPayments handlePay={handlePay} />}
    </React.Fragment>
  );
});
