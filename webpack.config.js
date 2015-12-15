const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css',},
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
