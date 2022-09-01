import { Controller } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Image from './Image';
import Iconify from './Iconify';
import { OrderPayment } from '../enums/order.payment';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}));

const PAYMENT_METHODS = [
  {
    id: 1,
    title: 'Efectivo',
    icons: ['/illustrations/ic_cash.svg'],
    description: 'Efectivo en caja'
  },
  {
    id: 5,
    title: 'Tarjeta de credito al Mensajero',
    icons: ['/illustrations/ic_visa.svg', '/illustrations/ic_mastercard.svg'],
    description: 'Pagar en Tarjeta de Credito al Mensaje cuando se haga la entrega'
  },
  {
    id: 4,
    title: 'Efectivo al Mensajero',
    icons: [],
    description: 'Pagar en efectivo cuando al Mensaje cuando se haga la entrega'
  }
];

// ----------------------------------------------------------------------

interface PaymentMethodsProps {
  //   paymentOptions: any[];
  title: string;
  selected?: OrderPayment;
  disabled?: boolean;
  showOnlySelected?: boolean;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  title,
  selected: selectedPayment,
  disabled = false,
  showOnlySelected = false
}: PaymentMethodsProps) => {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title={title} />
      <CardContent>
        <RadioGroup row>
          <Stack spacing={2}>
            {PAYMENT_METHODS.map((method, i) => {
              const { id, title, icons, description } = method;
              const selected = id === selectedPayment;
              if (selectedPayment && showOnlySelected && !selected) return null;

              return (
                <OptionStyle
                  key={title}
                  sx={{
                    ...(selected && {
                      boxShadow: 'rgb(145 158 171 / 16%) 0px 20px 40px -4px'
                    })
                  }}
                >
                  <FormControlLabel
                    disabled={disabled && !selected}
                    checked={selected}
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
                      {icons.map(icon => (
                        <Image key={icon} sx={{ width: '30px' }} alt={title} src={icon} />
                      ))}
                    </Stack>
                  )}
                </OptionStyle>
              );
            })}
          </Stack>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
