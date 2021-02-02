const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    publicPath: '',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'resources/[hash][ext][query]'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      cache: false,
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};