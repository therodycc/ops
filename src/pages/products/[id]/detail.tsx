import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Grid, Container, Stack, Box, InputAdornment } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { addToCart, removeCart, updateCart } from '../../../redux/slices/cart';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { SkeletonProductItem } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ProductImage } from '../../../sections/products/detail/ProductImage';
import { ProductDetailSummary } from '../../../sections/products/detail/ProductDetailSummary';
import { CartWidget } from '../../../sections/products/detail/CartWidget';
import { ProductList } from '../../../sections/products/list';
import InputStyle from '../../../components/InputStyle';
import Iconify from '../../../components/Iconify';
import { productService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product/product';

ProductDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { themeStretch } = useSettings();

  const [productQuery, setProductQuery] = useState<string>('');

  const [product, setProduct] = useState<Product>(null);
  const [products, setProducts] = useState<Product[]>(null);
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { query } = useRouter();
  // const { id } = query;

  // const { product } = useSelector((state: any) => state.product);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilterProducts(productQuery);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [productQuery]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    productService.list().then(response => {
      setProducts(response?.data?.data ?? []);
    });
  };

  const onSelectProductHandle = (product: Product) => {
    setProduct(product);
    setShowProductDetail(true);
  };

  const onRemoveCart = (cartId: number) => {
    dispatch(removeCart(cartId));
  };

  const onUpdateCart = product => {
    dispatch(updateCart(product));
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

  const onAddCart = product => {
    let timeout;

    clearTimeout(timeout);
    timeout = setTimeout(() => dispatch(addToCart(product)), 1000);
  };

  return (
    <Page title="Detalle de Producto">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            {
              name: 'Productos',
              href: PATH_PRODUCTS.root
            },
            { name: `Detalle de ${product?.name}` }
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
                <Grid item xs={6} md={6} lg={5} sx={{ top: 40 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 4,
                      gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)'
                      },
                      ml: 5,
                      mt: 5
                    }}
                  >
                    {(!products ? [...Array(4)] : products).map((product: Product, index) =>
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
                    onRemoveCart={onRemoveCart}
                    onAddCart={onAddCart}
                    onUpdateCart={onUpdateCart}
                  />
                )}
                {/* {!product && <SkeletonProductDetail />} */}
              </Grid>
            </Grid>
          </Card>
        </>

        {/*{error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
