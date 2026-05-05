const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
    static: {
      directory: require('path').resolve(__dirname, 'public'),
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8080',
      },
    ],
  },
});
