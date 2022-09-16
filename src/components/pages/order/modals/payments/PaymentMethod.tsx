// @mui
import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../../../../../hooks/useResponsive';
// components
import React, { memo, useCallback, useContext, useState } from 'react';
import { OrderPayment } from '../../../../../enums/order.payment';
import Iconify from '../../../../Iconify';
import Image from '../../../../Image';
import { PaymentsOptions } from './PaymentsOptions';
import { PaymentContext } from '../../../../../contexts/payment';

export const PaymentMethods: React.FC<PaymentMethodsProps> = memo(function PaymentMethod({
  disabled = false
}: PaymentMethodsProps) {
  const isDesktop = useResponsive('up', 'sm');

  const [paymentsMethods, setPaymentMethods] = useState(PaymentsOptions());
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { changeStep, step, handleMethodChange } = useContext(PaymentContext);

  const handleSelectPayment = useCallback(
    (_id: number) => {
      setIsSelected(_prev => !_prev);
      step === 0 ? changeStep(1) : changeStep(0);
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

  return (
    <React.Fragment>
      <RadioGroup row>
        <Stack spacing={2} sx={{ width: '100%' }}>
          {paymentsMethods?.map((method, i) => {
            const { id, title, icons, description } = method;
            return (
              <React.Fragment key={id}>
                {method.active === false && isSelected ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <div onClick={() => handleSelectPayment(id)}>
                    <OptionStyle
                      key={title}
                      sx={{
                        ...(method.active && {
                          boxShadow: 'rgb(145 158 171 / 16%) 0px 20px 40px -4px'
                        })
                      }}
                    >
                      <FormControlLabel
                        disabled={disabled && !method.active}
                        checked={method.active}
                        value={id}
                        control={
                          <Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />
                        }
                        label={
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="subtitle2">{title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {description}
                            </Typography>
                          </Box>
                        }
                        sx={{ flexGrow: 1, py: 3 }}
                      />

                      {isDesktop && (
                        <Stack direction="row" spacing={1} flexShrink={0}>
                          {icons?.map(icon => (
                            <Image key={icon} sx={{ width: '30px' }} alt={title} src={icon} />
                          ))}
                        </Stack>
                      )}
                    </OptionStyle>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </RadioGroup>
    </React.Fragment>
  );
});

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}));

// ----------------------------------------------------------------------

interface PaymentMethodsProps {
  //   paymentOptions: any[];
  title: string;
  selected?: OrderPayment;
  disabled?: boolean;
  showOnlySelected?: boolean;
}
