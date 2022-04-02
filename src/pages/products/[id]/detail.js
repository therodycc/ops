import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
// import { useDispatch, useSelector } from '../../../redux/store';
// import { getProduct, addCart, onGotoStep } from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { SkeletonProductDetail } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { productService } from '../../../services/product.service';
import Image from '../../../components/Image';
// import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ProductDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { themeStretch } = useSettings();

  // const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const { query } = useRouter();
  const { id } = query;

  // const { product, error, checkout } = useSelector(state => state.product);

  useEffect(() => {
    productService.detail(id).then(response => {
      let responseProduct = response.data;
      console.log(responseProduct);
      setProduct(responseProduct);
    });
  }, [id]);

  // const handleAddCart = product => {
  //   dispatch(addCart(product));
  // };

  // const handleGotoStep = step => {
  //   dispatch(onGotoStep(step));
  // };

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
            { name: `Detalle de Producto ${product?.name}` }
          ]}
        />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <Box sx={{ p: 5 }}>
                    <Box
                      sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}
                    >
                      <Image
                        key={product.photo}
                        alt="large image"
                        src={product.photo}
                        ratio="1/1"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>

            {/* <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      label={`Review (${product.reviews.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProductDetailsReview product={product} />
                </TabPanel>
              </TabContext>
            </Card> */}
          </>
        )}

        {!product && <SkeletonProductDetail />}
        {/*{error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
