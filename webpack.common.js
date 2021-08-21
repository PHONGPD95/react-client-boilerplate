const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        commons: {
          test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
          name: 'common',
          chunks: 'all',
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new Dotenv({ systemvars: true }),
    new ESLintPlugin(),
  ],
  resolve: {
    alias: {
      '~actions': path.resolve(__dirname, 'src/actions'),
      '~api': path.resolve(__dirname, 'src/api'),
      '~assets': path.resolve(__dirname, 'src/assets'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~containers': path.resolve(__dirname, 'src/containers'),
      '~constants': path.resolve(__dirname, 'src/constants'),
      '~reducers': path.resolve(__dirname, 'src/reducers'),
      '~sagas': path.resolve(__dirname, 'src/sagas'),
      '~styles': path.resolve(__dirname, 'src/styles'),
      '~utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, 'src/styles/base.scss')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
