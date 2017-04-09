var webpack = require('webpack');

module.exports = {
  context: __dirname + '/MisPagos2/assets',
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/MisPagos2/static/dist',
    filename: 'app.bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      } 
    ]
  }
};