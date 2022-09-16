import { useContext, useRef } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { OrderState } from '../../../../../interfaces/order/order';
import { AppState } from '../../../../../redux/rootReducer';
import { FormProvider, RHFTextField } from '../../../../hook-form';
import { PaymentContext } from '../../../../../contexts/payment';

interface FormPaymentsProps {
  handlePay: (amount) => void;
}
export const FormPayments = ({ handlePay }: FormPaymentsProps) => {
  const { isLoading, error } = useContext(PaymentContext);

  const defaultValues = useRef({
    amount: ''
  });

  const paymentSchema = Yup.object().shape({
    amount: Yup.string().required('En monto es requerido')
  });

  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: defaultValues.current
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async amount => {
    handlePay(amount);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Monto
        </Typography>
        <RHFTextField name="amount" placeholder="100.00" />
      </Stack>
      {!!error && (
        <Alert severity="error" sx={{ marginTop: '10px' }}>
          {error}
        </Alert>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ marginTop: '20px' }}
      >
        Pagar
      </LoadingButton>
    </FormProvider>
  );
};
