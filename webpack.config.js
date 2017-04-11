const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // Occurence ensures consistent build hashes (webpack 1.x only)
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Handle errors more cleanly
    new webpack.NoErrorsPlugin(),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
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
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],

        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
