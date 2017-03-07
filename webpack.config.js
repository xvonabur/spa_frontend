let path = require('path');
let webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // Occurence ensures consistent build hashes (webpack 1.x only)
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Handle errors more cleanly
    new webpack.NoErrorsPlugin()
  ],
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  module: {
    preLoaders: [
      // ESLint
      { 
        test: /\.jsx?$/, 
        loader: 'eslint', 
        exclude: /node_modules/ 
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],

        include: [
          path.resolve(__dirname, "src"),
        ]
      },
    ]
  }
};
