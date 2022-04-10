import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Button, Divider, IconButton, Typography } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect } from '../../../components/hook-form';
import { useEffect, useState } from 'react';
import { getPricesBySellTypeAndQuantity } from '../utils/product.util';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export const ProductDetailSummary = ({ product, onAddCart, onUpdateCart }) => {
  const theme = useTheme();

  const { push } = useRouter();
  const { id, name, blisterSize, activeSubstances, cover } = product;

  const { products: cardProducts } = useSelector((state) => state.cart);


  const [quantity, setQuantity] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(null);
  const [stock, setStock] = useState(product.stock);
  const [selectedSellType, setSelectedSellType] = useState('BLISTER');



  const price = getPricesBySellTypeAndQuantity(product, selectedSellType, quantity);

  const updateQuantity = newValue => {
    setQuantity(newValue);
    setValue('quantity', newValue);
  };

  useEffect(() => {
    const productInCart = cardProducts.find(_product => product.id === _product.id);
    if (productInCart) {
      updateQuantity(productInCart.quantity);
      updateSellType(productInCart.selectedSellType);
      setIsProductInCart(productInCart);
    }
  }, [product, cardProducts, setIsProductInCart]);

  const updateSellType = sellType => {
    if (sellType === 'BLISTER') {
      stock = parseInt(product.stock / blisterSize);
      setStock(stock);
      updateQuantity(stock > 0 ? 1 : 0);
    } else {
      if (stock !== product.stock) setStock(product.stock);
    }

    setSelectedSellType(sellType);
  };

  const defaultValues = {
    id,
    name,
    cover,
    stock,
    price,
    quantity,
    sellType: 'BLISTER'
  };

  const methods = useForm({
    defaultValues
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async data => {
    // try {{...other}
    //   if (!alreadyProduct) {
    //     onAddCart({
    //       ...data,
    //       subtotal: data.price * data.quantity
    //     });
    //   }
    //   onGotoStep(0);
    //   push(PATH_DASHBOARD.eCommerce.checkout);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleAddCart = async () => {
    try {
      const data = {
        productId: product.id,
        quantity,
        selectedSellType
      };

      if (!isProductInCart) onAddCart(data);
      else onUpdateCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={stock > 0 ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase' }}
        >
          {stock > 0 ? 'Disponible' : 'No Disponible'}
        </Label>

        <Typography variant="h5" sx={{ mt: 2, mb: 1 }} paragraph>
          {name}
        </Typography>

        {activeSubstances?.map(({ name }, i) => (
          <Typography key={`${i} - ${name}`} variant="outlined" sx={{ color: 'text.disabled' }}>
            {name} {activeSubstances.length - 1 > i ? '| ' : ''}
          </Typography>
        ))}

        <Divider sx={{ mt: 3, mb: 3, borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Vende como
          </Typography>

          <RHFSelect
            onChange={e => updateSellType(e.target.value)}
            name="sellType"
            size="small"
            fullWidth={false}
            value={selectedSellType}
            FormHelperTextProps={{
              sx: { textAlign: 'right', margin: 0, mt: 1 }
            }}
          >
            <option key={1} value={'UNIT'}>
              Unidad
            </option>

            {blisterSize && (
              <option key={12} value={'BLISTER'}>
                Blister ({blisterSize}) unid.
              </option>
            )}
          </RHFSelect>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Cantidad
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              quantity={values.quantity}
              stock={stock}
              onIncrementQuantity={() => updateQuantity(quantity + 1)}
              onDecrementQuantity={() => updateQuantity(quantity - 1)}
            />
            <Typography
              variant="caption"
              component="div"
              sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
            >
              Disponible: {stock}
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Typography variant="h4" sx={{ mt: 3, mb: 3, textAlign: 'right' }}>
          <Box
            component="span"
            sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 2.0 }}
          >
            {price.priceWithDiscount && fCurrency(price.price)}
          </Box>
          &nbsp; {fCurrency(price.priceWithDiscount ?? price.price)}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Agregar Al Carrito
          </Button>

          {/* <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button> */}
        </Stack>

        {/* <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack> */}
      </FormProvider>
    </RootStyle>
  );
};

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  stock: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func
};

function Incrementer({ stock, quantity, onIncrementQuantity, onDecrementQuantity }) {
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
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
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
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}

ProductDetailSummary.propTypes = {
  // cart: PropTypes.array,
  onAddCart: PropTypes.func,
  // onGotoStep: PropTypes.func,
  product: PropTypes.object
};
