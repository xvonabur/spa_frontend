const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
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
    // Handle errors more cleanly
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify('http://35.157.231.186/api'),
        'UPLOADS_URL': JSON.stringify('http://35.157.231.186'),
        'API_VERSION': JSON.stringify(2),
        'API_CONTENT_TYPE': JSON.stringify('application/vnd.api+json'),
        'NODE_ENV': JSON.stringify('production')
      }
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
        loaders: ['babel'],
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  }
}
