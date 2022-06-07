// @mui
import { Box, Card, Typography, Stack, Link } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//paths
// components
import Image from '../../../components/Image';
import Label from '../../../components/Label';
import { Product } from '../../../interfaces/product/product';

interface ProductListProps {
  product: Product;
  onSelect(product: Product): void;
}
// ----------------------------------------------------------------------

export default function ProductList({ product, onSelect }: ProductListProps) {
  const { name, photo, stock, price, blisterSize, hasDiscount } = product;

  return (
    <Card sx={{ cursor: 'pointer' }} onClick={() => onSelect(product)}>
      <Link color="inherit">
        <Box sx={{ position: 'relative' }}>
          <Label
            variant="filled"
            color={stock > 10 ? 'success' : 'warning'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {stock} disp
          </Label>
          <Image src={photo} alt={photo} ratio="16/9" />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <div>
              <Typography component="span">{blisterSize > 0 ? 'Blister ' : 'Unidad'}</Typography>

              {blisterSize > 0 && (
                <Typography
                  component="span"
                  sx={{
                    color: 'text.disabled'
                  }}
                >
                  {blisterSize}
                </Typography>
              )}
            </div>

            <Stack direction="row" spacing={0.5}>
              {hasDiscount && (
                <Typography
                  component="span"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through'
                  }}
                >
                  {fCurrency(price.blister?.original ?? price.unit.original)}
                </Typography>
              )}

              <Typography variant="subtitle1">
                {fCurrency(
                  price.blister?.discount
                    ? price.blister.discount ?? price.blister.original
                    : price.unit.discount ?? price.unit.original
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Link>
    </Card>
  );
}
