// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
// lightbox
import 'react-image-lightbox/style.css';

//redux
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';

// contexts
import { AuthContext } from '../providers/auth.provider';
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';

// utils
import { getSettings } from '../utils/settings';

// theme
import ThemeProvider from '../theme';
// components
import Settings from '../components/settings';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import NotistackProvider from '../components/NotistackProvider';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContext>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <ThemeProvider>
                  <NotistackProvider>
                    <MotionLazyContainer>
                      <ThemeColorPresets>
                        <Settings />
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </ThemeColorPresets>
                    </MotionLazyContainer>
                  </NotistackProvider>
                </ThemeProvider>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </AuthContext>
        </PersistGate>
      </Provider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async context => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings
  };
};
