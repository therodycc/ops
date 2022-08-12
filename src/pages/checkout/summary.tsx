import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, StepConnector } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// import { getCart } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_PRODUCTS } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CheckoutCart } from '../../sections/checkout';

// ----------------------------------------------------------------------

CheckoutSummaryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CheckoutSummaryPage() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  // const { checkout } = useSelector(state => state.product);

  // const { cart, billing, activeStep } = checkout;

  // const isComplete = activeStep === STEPS.length;

  // useEffect(() => {
  //   if (isMountedRef.current) {
  //     dispatch(getCart(cart));
  //   }
  // }, [dispatch, isMountedRef, cart]);

  // useEffect(() => {
  //   if (activeStep === 1) {
  //     dispatch(createBilling(null));
  //   }
  // }, [dispatch, activeStep]);

  return (
    <Page title="Carrito">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Carrito"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            {
              name: 'Productos',
              href: PATH_PRODUCTS.root
            },
            { name: 'Carrito' }
          ]}
        />

        {/* <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map(label => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid> */}

        <CheckoutCart />

        {/* {!isComplete ? (
          <>
            {activeStep === 0 && <CheckoutCart />}
            {activeStep === 1 && <CheckoutBillingAddress />}
            {activeStep === 2 && billing && <CheckoutPayment />}
          </>
        ) : (
          <CheckoutOrderComplete open={isComplete} />
        )} */}
      </Container>
    </Page>
  );
}
