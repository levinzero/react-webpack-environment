const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //开发环境配置
  // devtool: 'cheap-module-source-map', //正式环境配置
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }],
    }, ]

  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/template.html'),
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    host: '0.0.0.0',
    port: 5000,
    historyApiFallback: true,  // 该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000"
    },
  }
}