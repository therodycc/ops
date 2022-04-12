import { Box, IconButton, Typography } from '@mui/material';
import Iconify from './Iconify';

export interface IncrementerProps {
  stock: number;
  quantity: number;
  onIncrementQuantity(): void;
  onDecrementQuantity(): void;
}

export const Incrementer = ({ stock, quantity, onIncrementQuantity, onDecrementQuantity }) => {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <IconButton
        size="large"
        color="inherit"
        disabled={quantity <= 1}
        onClick={onDecrementQuantity}
      >
        <Iconify icon={'eva:minus-fill'} width={14} height={14} sx={{}} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton
        size="large"
        color="inherit"
        disabled={quantity >= stock}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={'eva:plus-fill'} width={14} height={14} sx={{}} />
      </IconButton>
    </Box>
  );
};
