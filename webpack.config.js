const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon:path.resolve(__dirname,'public/favicon.ico'),
    }),
    new CopyWebpackPlugin({
            patterns:[
            {from:'public/images',to:'images'},
            {from: "public/database.json", to: "database.json" }
    ]
    }),   
  ],
  entry:['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname,'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve:{
    extensions:["*",".js",".jsx"]
  },
devServer:{
    historyApiFallback: true,
    port:3000
  }
};
