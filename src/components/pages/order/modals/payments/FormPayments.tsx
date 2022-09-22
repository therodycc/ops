import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { PaymentContext } from '../../../../../contexts/payment';
import { useDebounce } from '../../../../../hooks/common/useDebounce';
import { OrderState } from '../../../../../interfaces/order/order';
import { AppState } from '../../../../../redux/rootReducer';
import { FormProvider, RHFTextField } from '../../../../hook-form';

interface FormPaymentsProps {
  handlePay: (amount) => void;
}
export const FormPayments = ({ handlePay }: FormPaymentsProps) => {
  const { isLoading, error, handleChangeAmount } = useContext(PaymentContext);

  const { detail } = useSelector<AppState, OrderState>(state => state.order);
  const [personError, setPersonError] = useState<null | string>(null);

  const [amountInput, setAmountInput] = useState(0);

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

  const { reset, setError, handleSubmit, setValue, watch } = methods;

  const result = watch();
  const textValue = useDebounce(amountInput);

  useEffect(() => {
    setAmountInput(+result?.amount || 0);
  }, [result]);

  useEffect(() => {
    handleChangeAmount(+textValue || 0);
  }, [textValue]);

  const onSubmit = async data => {
    if (+data.amount > detail?.paymentDetail.pending)
      return handleError('El monto no puede ser mayor al pendiente');
    handlePay(data);
  };

  const handleError = (error: string) => {
    setPersonError(error);
    setTimeout(() => {
      setPersonError(null);
    }, 3000);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ marginTop: '20px' }}>
          Monto
        </Typography>
        <RHFTextField type="number" name="amount" placeholder="100.00" />
      </Stack>
      {(!!error || personError) && (
        <Alert severity="error" sx={{ marginTop: '10px' }}>
          {error || personError}
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
