import { SnackbarProvider } from 'notistack';
import React from 'react';
import Root from './Root';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';

interface AppProps {
  cache: EmotionCache;
}
const App: React.FC<AppProps> = ({ cache }) => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={createTheme()}>
        <GlobalStyles styles={() => ({})} />

        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <CssBaseline />

          <Root />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
