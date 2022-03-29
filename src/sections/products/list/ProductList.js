// import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Divider, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Label from '../../../components/Label';

// ----------------------------------------------------------------------

const hasDiscount = price => {
  const applyDiscount = price.blisterPriceWithDiscount > 0 || price.priceWithDiscount > 0;
  return (
    applyDiscount &&
    (price.priceWithDiscount !== price.price ||
      (price.blisterPrice && price.blisterPriceWithDiscount !== price.blisterPrice))
  );
};

// ----------------------------------------------------------------------

// UserCard.propTypes = {
//   product: PropTypes.object.isRequired,
// };

export default function UserCard({ product }) {
  const { name, photo, stock, price, blisterSize, totalPost, avatarUrl, following } = product;

  return (
    <Card>
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
        {/* <NextLink href={linkTo} passHref>
          <Link color="inherit"> */}
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        {/* </Link>
        </NextLink> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div>
            <Typography component="span">{blisterSize > 0 ? 'Blister size ' : 'Unidad'}</Typography>

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
            {hasDiscount(price) && (
              <Typography
                component="span"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through'
                }}
              >
                {fCurrency(price.blisterPrice > 0 ? price.blisterPrice : price.price)}
              </Typography>
            )}

            <Typography variant="subtitle1">
              {fCurrency(
                price.blisterPriceWithDiscount > 0
                  ? price.blisterPriceWithDiscount ?? prices.blisterPrice
                  : price.priceWithDiscount ?? price.price
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* <Typography
        variant='h4'
        sx={{ mt: 2.0, ml: 2.0, mr: 2.0, mb: 1.5 }}
        noWrap={true}
      >
        {name}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' spacing={0.5}>
            {price.priceWithDiscount && (
              <Typography
                component='span'
                sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                {fCurrency(price.price)}
              </Typography>
            )}

            <Typography variant='subtitle1'>
              {fCurrency(price.priceWithDiscount)}
            </Typography>
          </Stack>
        </Stack>
      </Box> */}
    </Card>
  );
}
