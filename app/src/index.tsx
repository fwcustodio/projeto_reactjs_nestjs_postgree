import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { WebgateProvider as _WebgateProvider } from '@xvia/webgate-connect';
import { BrowserRouter } from 'react-router-dom';
import createCache from '@emotion/cache';

const WebgateProvider = _WebgateProvider as any;

const baseName = window?.__APP_BASE__ || '/';
const cache = createCache({ key: 'css' });
cache.compat = true;

const PORTAL_URL = process.env.PORTAL_URL;

const root = createRoot(document.getElementById('root')!); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter basename={baseName}>
    <WebgateProvider portalUrl={PORTAL_URL as string}>
      <App cache={cache} />
    </WebgateProvider>
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
