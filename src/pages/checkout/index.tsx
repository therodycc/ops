import { useCallback, useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Grid, Container, Stack, Box, InputAdornment } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { addToCart, updateCart, removeCart } from '../../redux/slices/cart';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS, PATH_CHECKOUT } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import { SkeletonProductItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ProductImage } from '../../sections/products/detail/ProductImage';
import { ProductDetailSummary } from '../../sections/products/detail/ProductDetailSummary';
import { CartWidget } from '../../sections/products/detail/CartWidget';
import { ProductList } from '../../sections/products/list';
import InputStyle from '../../components/InputStyle';
import Iconify from '../../components/Iconify';
import { productService } from '../../services/product.service';
import { Product } from '../../interfaces/product/product';
import { CartDto } from '../../interfaces/cart/cart';

ProductDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { themeStretch } = useSettings();

  const [productQuery, setProductQuery] = useState<string>('');

  const [product, setProduct] = useState<Product>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilterProducts(productQuery);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [productQuery]);

  const getProductList = useCallback(
    () =>
      productService.list().then(response => {
        setProducts(response?.data?.data ?? []);
      }),
    [setProducts]
  );

  const onSelectProductHandle = (product: Product) => {
    setProduct(product);
    setShowProductDetail(true);
  };

  const onUpdateCart = (cartDto: CartDto) => {
    dispatch(updateCart(cartDto));
  };

  const onRemoveCart = (cartId: string) => {
    dispatch(removeCart(cartId));
  };

  const handleFilterProducts = async value => {
    setShowProductDetail(false);
    try {
      if (!value) {
        getProductList();
        return;
      }
      const response = await productService.filter(value);
      setProducts(response?.data?.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddCart = (cartDto: CartDto) => {
    let timeout;

    clearTimeout(timeout);
    timeout = setTimeout(() => dispatch(addToCart(cartDto)), 1000);
  };

  return (
    <Page title="Facturacion">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={product?.name ? `Detalle de ${product?.name}` : 'Productos'}
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            {
              name: 'Facturacion',
              href: PATH_CHECKOUT.root
            },
            { name: product?.name ? `Detalle de ${product?.name}` : '' }
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <InputStyle
            size="small"
            value={productQuery}
            sx={{ width: 300 }}
            onChange={e => setProductQuery(e.target.value)}
            placeholder="Buscar productos..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={'eva:search-fill'}
                    sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    setProductQuery('');
                  }}
                >
                  <Iconify
                    icon={productQuery.length > 0 ? 'eva:close-fill' : ''}
                    sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled', cursor: 'pointer' }}
                  />
                </InputAdornment>
              )
            }}
          />
        </Stack>

        <CartWidget />

        <>
          <Card>
            <Grid container sx={{ minHeight: 450 }}>
              {product && showProductDetail && (
                <Grid item xs={6} md={6} lg={5} sx={{ top: 40 }}>
                  <ProductImage product={product} />
                </Grid>
              )}

              {(!product || !showProductDetail) && (
                <Grid item xs={12} md={12} lg={12} sx={{ top: 40 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 3,
                      gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                      }
                    }}
                  >
                    {(!products ? [...Array(12)] : products).map((product: Product, index) =>
                      product ? (
                        <ProductList
                          key={`${product.id}-${product.unit}`}
                          product={product}
                          onSelect={onSelectProductHandle}
                        />
                      ) : (
                        <SkeletonProductItem key={index} />
                      )
                    )}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={7}>
                {product && showProductDetail && (
                  <ProductDetailSummary
                    product={product}
                    // cart={checkout.cart}
                    onAddCart={onAddCart}
                    onRemoveCart={onRemoveCart}
                    onUpdateCart={onUpdateCart}
                    // onGotoStep={handleGotoStep}
                  />
                )}
              </Grid>
            </Grid>
          </Card>
        </>

        {/*{error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
