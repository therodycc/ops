import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// routes
import { PATH_CHECKOUT } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export const CartWidget = () => {
  const { products } = useSelector((state: any) => state.cart);
  const totalProduct = products.length;

  return (
    <NextLink href={PATH_CHECKOUT.summary} passHref>
      <RootStyle>
        <Badge showZero badgeContent={totalProduct} color="error" max={99}>
          <Iconify icon={'eva:shopping-cart-fill'} width={24} height={24} />
        </Badge>
      </RootStyle>
    </NextLink>
  );
};
