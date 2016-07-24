const path = require('path');
const webpack = require('webpack');

var featureFlags = new webpack.DefinePlugin({
  __DEV__: false,
  __PROD__: true,
});

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
  plugins: [featureFlags],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
