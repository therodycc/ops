// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect } from '../../../components/hook-form';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getPricesBySellTypeAndQuantity } from '../utils/product.util';
import { Product } from '../../../interfaces/product/product';
import { CartDto } from '../../../interfaces/cart/cart';
import { Incrementer } from '../../../components/Incrementer';
import { PATH_CHECKOUT } from '../../../routes/paths';
import { AlertDialog } from '../../../override/mui/dialog/AlertDialog';
import { ProductUnit } from '../../../enums/product-unit.enum';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

export interface ProductDetailProps {
  product: Product;
  onAddCart(cart: CartDto): void;
  onUpdateCart(cart: CartDto): void;
}

// ----------------------------------------------------------------------

export const ProductDetailSummary = ({ product, onAddCart, onUpdateCart }: ProductDetailProps) => {
  const theme = useTheme();

  const cardDataRef = useRef<CartDto>(null);
  const { replace } = useRouter();

  const { products: cardProducts } = useSelector((state: any) => state.cart);
  const DEFAULT_SELL_TYPE: ProductUnit = ProductUnit.BLISTER;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [productInCart, setProductInCart] = useState<Product>(null);
  const [stock, setStock] = useState(product.stock);
  const [selectedSellType, setSelectedSellType] = useState<ProductUnit>(DEFAULT_SELL_TYPE);

  const { id, name, blisterSize, activeSubstances } = product;
  const price = getPricesBySellTypeAndQuantity(product, selectedSellType, quantity);
  const defaultValues = {
    id,
    name,
    stock,
    price,
    quantity,
    sellType: ProductUnit.BLISTER
  };

  const methods = useForm({
    defaultValues
  });
  const { watch, setValue, handleSubmit } = methods;
  const values = watch();

  const isProductInCard = useCallback(
    _selectedSellType =>
      cardProducts.find(
        ({ id, selectedSellType: productSelectedSellType }) =>
          product.id === id && _selectedSellType === productSelectedSellType
      ),
    [product, selectedSellType, cardProducts]
  );

  useEffect(() => {
    let productInCart = isProductInCard(selectedSellType);
    if (!productInCart)
      productInCart = isProductInCard(
        selectedSellType === ProductUnit.BLISTER ? ProductUnit.UNIT : ProductUnit.BLISTER
      );

    if (productInCart) updateSellType(productInCart.selectedSellType);
    else if (product.blisterSize > 0) updateSellType(ProductUnit.BLISTER);
    else updateSellType(ProductUnit.BLISTER);
  }, [cardProducts]);

  useEffect(() => {
    const productInCart = isProductInCard(selectedSellType);

    if (productInCart) {
      updateSellType(productInCart.selectedSellType);
      updateCounterQuantity(productInCart.quantity);
      setProductInCart(productInCart);
    } else {
      if (blisterSize === 0) updateSellType(ProductUnit.UNIT);
    }
  }, [cardProducts, selectedSellType, isProductInCard]);

  const updateCounterQuantity = newValue => {
    setQuantity(newValue);
    setValue('quantity', newValue);
  };

  const updateSellType = sellType => {
    if (sellType === ProductUnit.BLISTER) {
      let stock = parseInt(`${product.stock / blisterSize}`) ?? 1;
      setStock(stock);
    } else {
      if (stock !== product.stock) setStock(product.stock);
    }

    if (productInCart?.selectedSellType && productInCart?.selectedSellType === sellType) {
      updateCounterQuantity(stock > 0 ? productInCart.quantity ?? 1 : 0);
    } else {
      updateCounterQuantity(stock > 0 ? 1 : 0);
    }
    setSelectedSellType(sellType);
  };

  const handleAddCart = async () => {
    try {
      const data: CartDto = {
        productId: product.id,
        quantity,
        selectedSellType
      };

      if (!productInCart?.id) onAddCart(data);
      else if (
        productInCart.selectedSellType === data.selectedSellType &&
        productInCart.quantity !== data.quantity
      ) {
        onUpdateCart(data);
      } else {
        // Trying to add same products with different sell type.
        cardDataRef.current = data;
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async data => {
    try {
      if (!productInCart) {
        handleAddCart();
      }

      replace(PATH_CHECKOUT.summary);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle>
      <AlertDialog
        open={isModalOpen}
        title="Confirmation"
        description="Este producto ya esta en el carrito con otra unidad. Seguro que desea agregarlo nuevamente?"
        okButtonText="SI"
        cancelButtonText="NO"
        onAccept={() => {
          setIsModalOpen(false);
          if (isProductInCard(selectedSellType)) onUpdateCart(cardDataRef.current);
          else onAddCart(cardDataRef.current);
        }}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

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

        {(activeSubstances as any[])?.map(({ name }, i) => (
          <Label key={`${i} - ${name}`} sx={{ color: 'text.disabled', margin: '0 2px' }}>
            {name}
          </Label>
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
            <option key={1} value={ProductUnit.UNIT}>
              Unidad
            </option>

            {blisterSize && (
              <option key={12} value={ProductUnit.BLISTER}>
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
              quantity={values.quantity}
              stock={stock}
              onIncrementQuantity={() => updateCounterQuantity(quantity + 1)}
              onDecrementQuantity={() => updateCounterQuantity(quantity - 1)}
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
            color={values.quantity > 0 ? 'warning' : 'error'}
            variant="contained"
            startIcon={
              <Iconify
                icon={values.quantity > 0 ? 'ic:round-add-shopping-cart' : 'ic:delete'}
                sx={{}}
              />
            }
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {values.quantity > 0 ? 'Agregar Al Carrito' : 'Eliminar del carrito'}
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Comprar Ahora
          </Button>
        </Stack>

        {/* <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack> */}
      </FormProvider>
    </RootStyle>
  );
};
