// @mui
import { Button, RadioGroup, Stack } from '@mui/material';
// hooks
// components
import React, { memo, useCallback, useContext, useState } from 'react';
import { PaymentContext } from '../../../../../contexts/payment';
import { OrderPayment } from '../../../../../enums/order.payment';
import Iconify from '../../../../Iconify';
import { PaymentOptionItem } from './PaymentOptionItem';
import { PaymentsOptions } from './PaymentsOptions';

export const PaymentMethods: React.FC<PaymentMethodsProps> = memo(function PaymentMethod({
  disabled = false
}: PaymentMethodsProps) {
  const [paymentsMethods, setPaymentMethods] = useState(PaymentsOptions);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { changeStep, step, handleMethodChange, handleChangeAmount } = useContext(PaymentContext);

  const handleSelectPayment = useCallback(
    (_id: number) => {
      setIsSelected(_prev => !_prev);
      step === 0 ? changeStep(1) : [changeStep(0), handleChangeAmount(0)];
      setPaymentMethods(_prev =>
        _prev.map(paymentMethod => {
          if (paymentMethod.id === _id) {
            handleMethodChange(paymentMethod.methodId);
          }
          return {
            ...paymentMethod,
            active: paymentMethod.id === _id
          };
        })
      );
    },
    [step]
  );

  const onEditPress = useCallback(() => {
    changeStep(0);
    setIsSelected(false);
    handleChangeAmount(0);
  }, []);

  return (
    <React.Fragment>
      <RadioGroup row>
        <Stack spacing={2} sx={{ width: '100%' }}>
          {paymentsMethods?.map((method, i) => {
            const { id, active, title, icons, description } = method;
            return (
              <React.Fragment key={id}>
                {method.active === false && isSelected ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <PaymentOptionItem
                    id={id}
                    icons={icons}
                    active={active}
                    title={title}
                    description={description}
                    disabled={disabled}
                    onClick={handleSelectPayment}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </RadioGroup>

      {step === 1 && (
        <Button
          sx={{
            color: 'gray',
            marginTop: '5px'
          }}
          onClick={onEditPress}
          startIcon={<Iconify icon={'akar-icons:pencil'} />}
        >
          Seleccionar otros productos
        </Button>
      )}
    </React.Fragment>
  );
});

interface PaymentMethodsProps {
  //   paymentOptions: any[];
  title: string;
  selected?: OrderPayment;
  disabled?: boolean;
  showOnlySelected?: boolean;
}
