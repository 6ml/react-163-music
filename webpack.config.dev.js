var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.resolve(CLIENT_PATH, 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    // publicPath: path.join(__dirname, 'dist'),
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: '首页',
      template: path.resolve(TEMPLATE_PATH,'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      // js
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client')
      },
      // CSS
      { 
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.join(__dirname, 'client')
      },
      // IMAGE
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      //FONT_AWESOME
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file'
      }
    ]
  }
};
