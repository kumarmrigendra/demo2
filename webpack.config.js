var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

var DIST_DIR   = path.join(__dirname, "dist"),  
    CLIENT_DIR = path.join(__dirname, "src");

module.exports = {  
    context: CLIENT_DIR,

    entry: "./index.js",
    plugins: [HtmlWebpackPluginConfig, new CleanWebpackPlugin(['dist'])],
    output: {
        path:     DIST_DIR,
        filename: "bundle.js"
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".js",".jsx"]
    }
};
