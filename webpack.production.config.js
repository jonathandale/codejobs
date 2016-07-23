const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.svg$/,
        loader: 'file?name=[name].[ext]&context=./dist',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  postcss: function (webpack) {
    return [
      require('autoprefixer')(),
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-cssnext")(),
    ];
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
