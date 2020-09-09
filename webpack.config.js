module.exports = {
  mode: 'development',
  module: {
    entry: './src/index.js',
    output: {
      path: path.resolve('dist'),
      filename: 'main.js'
    },
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node-modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    },]
  }
}