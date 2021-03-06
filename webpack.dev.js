const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV']), new webpack.HotModuleReplacementPlugin()],
});
