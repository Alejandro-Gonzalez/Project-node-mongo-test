var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {"app":"./assets/js/app.js", "appReact":"./assets/js/index.js"},
    output: {
        path: "./assets/js/build",
        filename: "[name].js"
    },
    externals: {
      "jquery" : "jQuery"

    },
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [
                require.resolve('babel-preset-stage-0'),
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react')
            ],plugins: [
                require.resolve('babel-plugin-transform-es2015-modules-amd')
            ]
          }
        }, {
          test: /\.(scss|sass|css)$/,
          loader: ExtractTextPlugin.extract('style-loader', ['css-loader','sass-loader'])
        }]
    },
    plugins: [
        new ExtractTextPlugin("../../css/[name].css")
    ]
};