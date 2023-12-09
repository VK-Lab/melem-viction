import { useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

import { vicTestNet } from '@/config/chains';
import RouterGuard from '@/hocs/RouterGuard';
import Web3AuthContainer from '@/modules/AuthContainer';
import store from '@/store';
import theme from '@/theme';

import '@/assets/styles.css';
import 'react-toastify/dist/ReactToastify.css';

const { chains, publicClient } = configureChains(
  [vicTestNet],
  [publicProvider()]
);

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() =>
    createConfig({
      publicClient,
      connectors: [
        new MetaMaskConnector({
          chains,
        }),
      ],
    })
  );
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>D2E Dashboard</title>
        <link rel="shortcut icon" href="/img/chakra-logo.png" />
        <link rel="apple-touch-icon" href="/img/chakra-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="D2E Dashboard" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <WagmiConfig config={client}>
              <RouterGuard>
                <Component {...pageProps} />
              </RouterGuard>
            </WagmiConfig>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Web3AuthContainer />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
