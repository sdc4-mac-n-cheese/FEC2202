const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    plugins: [new CompressionPlugin({
      include: /\/.(js|jsx)$/,
    })],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'defaults',
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      }
    ],
  },
};
