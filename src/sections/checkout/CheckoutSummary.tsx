// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

interface CheckoutSummaryProps {
  total: number;
  itbis: number;
  discount: number;
  insurance: number;
  subTotal: number;
  onEdit?: () => void;
  enableEdit?: any;
}

export const CheckoutSummary = ({
  total,
  itbis,
  discount,
  insurance,
  subTotal,
  onEdit,
  enableEdit = false
}: CheckoutSummaryProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Resumen de la Compra"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Productos
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subTotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Itbis
            </Typography>
            <Typography variant="subtitle2">{discount ? fCurrency(itbis) : '-'}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subTotal + itbis + discount)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Descuento
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'blue' }}>
              {discount ? fCurrency(-discount) : '-'}
            </Typography>
          </Stack>

          {insurance > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Seguro medico
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'blue' }}>
                -{fCurrency(insurance)}
              </Typography>
            </Stack>
          )}

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total - insurance)}
              </Typography>
              {/* <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography> */}
            </Box>
          </Stack>

          {/* <TextField
            fullWidth
            placeholder="RNC"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => checkRnc('someRnc')} sx={{ mr: -0.5 }}>
                    Consultar
                  </Button>
                </InputAdornment>
              )
            }}
          /> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
