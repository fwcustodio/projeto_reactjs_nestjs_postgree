import { StaticRouter } from 'react-router-dom/server';

import React from 'react';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { ROUTES } from '../src/routes/constants';
import { WebgateProvider as _WebgateProvider } from '@xvia/webgate-connect';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import App from '../src/App';
const WebgateProvider = _WebgateProvider as any;

const PORT = process.env.SERVER_PORT || 3006;
const app = express();

function renderPage(head: string, root: string) {
  const indexFile = resolve('build/index.html');
  const html = readFileSync(indexFile, 'utf-8');
  let response = html.replace('</head>', `${head}</head>`);
  response = response.replace('<div id="root"></div>', `<div id="root">${root}</div>`);
  return response;
}

function handleRender(req: Request, res: Response) {
  const authorizationHeader = req.header('authorization');
  const accessToken = authorizationHeader?.replace('Bearer ', '');

  const cache = createCache({ key: 'css' });
  cache.compat = true;
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <WebgateProvider
        portalUrl={process.env.PORTAL_URL as string}
        context={{
          accessToken,
          initialized: true,
          serverData: {},
        }}
      >
        <App cache={cache} />
      </WebgateProvider>
    </StaticRouter>,
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(app);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // We define some global variables here in order to speed up performance
  // as we want this data to be available as soon as possible when the app is
  // rendered by the browser. But be aware that by doing this we are giving uo
  // on the browser caching feature. It is better to load a javascript instead<
  const globalVars = `${emotionCss}`;

  res.setHeader('Content-Type', 'text/html');
  res.send(renderPage(globalVars, app));
}

app.get('/system/check', (req, res) => {
  res.status(200).send('success');
});

app.get(['/index.html', '/'], handleRender);
app.use(express.static(resolve('build')));
app.get(Object.values(ROUTES), handleRender);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
