const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 添加在这里

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'build/',
    inline: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      //添加在这里
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
};
