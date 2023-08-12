// i18n
import "../locales/i18n";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lightbox
/* eslint-disable import/no-unresolved */
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// editor
import "react-quill/dist/quill.snow.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
// next
import Head from "next/head";
// @mui
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// utils
import createEmotionCache from "../utils/createEmotionCache";
// theme
import ThemeProvider from "../theme";
// locales
import ThemeLocalization from "../locales";
import { StyledChart } from "../components/chart";
import ProgressBar from "../components/progress-bar";
import SnackbarProvider from "../components/snackbar";
import { MotionLazyContainer } from "../components/animate";
import { ThemeSettings, SettingsProvider } from "../components/settings";
import { AuthProvider } from "../auth/FirebaseContext";

import { DataProvider } from "src/firebase/dataProvider";
import { IsMobileProvider } from "src/utils/isMobileProvider";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  emotionCache: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <AuthProvider>
        <DataProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <ThemeLocalization>
                      <SnackbarProvider>
                        <StyledChart />
                        <ProgressBar />
                        {getLayout(
                          <IsMobileProvider>
                            <Component {...pageProps} />
                          </IsMobileProvider>
                        )}
                      </SnackbarProvider>
                    </ThemeLocalization>
                  </ThemeSettings>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </DataProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
