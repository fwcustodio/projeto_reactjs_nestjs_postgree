/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, 'node_modules/.cache'),
      };

      webpackConfig.module.rules = [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
        },
        {
          test: /\.m?js/,
          type: 'javascript/auto',
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ];

      webpackConfig.resolve.extensions = ['.*', '.js', '.jsx', '.ts', '.tsx'];

      return webpackConfig;
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.EnvironmentPlugin({
        PORTAL_URL: process.env.PORTAL_URL,
        URL_MT_LOGIN: process.env.URL_MT_LOGIN,
        URL_API: process.env.URL_API,
        CI_PROJECT_NAME: process.env.CI_PROJECT_NAME,
      }),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  eslint: {
    mode: 'file',
  },
  devServer: {
    port: 3006,
  },
};
