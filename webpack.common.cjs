const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

// Turnstile site key for the contact / venue-request forms.
// Empty during `webpack serve` (dev) so the captcha widget is skipped locally;
// the real key is injected for production builds. Override via TURNSTILE_SITE_KEY.
const isDevServer = !!process.env.WEBPACK_SERVE;
const turnstileSiteKey =
  process.env.TURNSTILE_SITE_KEY ?? (isDevServer ? '' : '0x4AAAAAADOtRgkce3xPhltT');

const clientEnv = {
  'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY ?? ''),
  'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN ?? ''),
  'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID ?? ''),
  'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID ?? ''),
};

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      templateParameters: { turnstileSiteKey },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          to: 'assets',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'public/robots.txt'),
          to: 'robots.txt',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'public/sitemap.xml'),
          to: 'sitemap.xml',
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.DefinePlugin(clientEnv),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
