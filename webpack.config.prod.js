var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
var COMPONENT_PATH = path.resolve(CLIENT_PATH, 'components');
var LOGIN_PATH = path.resolve(COMPONENT_PATH ,'login');
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/index'
  ],
  entry: {
    index: path.resolve(CLIENT_PATH, 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    // chunkFilename: '[id].chunk.js'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new htmlWebpackPlugin({
      title: '首页',
      template: path.resolve(TEMPLATE_PATH,'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
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
      //img
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      // IMAGE
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'url-loader?limit=8192'
      // },
      //FONT_AWESOME
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
      //   loader: 'file'
      // }
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: [
      //     'url?limit=10240&name=img/[hash:8].[name].[ext]',
      //     'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
      //   ],
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }
    ]
  }
};
