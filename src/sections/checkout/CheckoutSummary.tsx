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
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

interface CheckoutSummaryProps {
  total: string;
  itbis: string;
  discount: string;
  subTotal: string;
  insurance: number;
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
              Subtotal
            </Typography>
            <Typography variant="subtitle2">{subTotal}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Itbis
            </Typography>
            <Typography variant="subtitle2">{itbis ? itbis : '-'}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Descuentos
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              {discount ? -discount : '-'}
            </Typography>
          </Stack>

          {insurance > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Seguro medico
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'red' }}>
                -{insurance}
              </Typography>
            </Stack>
          )}

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'blue' }}>
                {total}
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
