/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, 'node_modules/.cache'),
      };

      return webpackConfig;
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        PORTAL_URL: 'http://localhost:7004',
        API_URL: 'https://develop.api.mtcidadao.mti.mt.gov.br',
      }),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },

  devServer: {
    port: 3000,
  },
};
