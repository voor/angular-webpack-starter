var path = require('path');
var webpack = require('webpack');
var webpackManifest = require('./webpackManifest');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var paths = require('./paths');

module.exports = function(env) {
  var jsSrc = path.resolve(paths.sourceDirectory);
  var jsDest = paths.publicDirectory + '/js/';
  var publicPath = '/js/';

  var webpackConfig = {
    context: jsSrc,

    plugins: [
      new ngAnnotatePlugin({
        add: true,
        // other ng-annotate options here
      })
    ],

    resolve: {
      extensions: ['', '.js']
    },

    module: {
      loaders: [
        // Used for the babel.  This is applied to ALL js files, so they must ALL be ES6 compliant.
        {
          test: /\.js$/,
          loader: 'babel-loader?stage=1',
          exclude: /node_modules/
        },
        // ngtemplate loader.  This is goin to be applied to ALL html files now.
        {
          test: /\.html$/,
          loader: "ngtemplate?relativeTo=" + (path.resolve(__dirname, './app')) + "/!html"
        }
        // SASS loader.  This will apply to all style files.
        // {
        //   test: /\.scss$/,
        //   loader: "style!css!sass?outputStyle=expanded&" +
        //     // Avoid using Bower.
        //     // "includePaths[]=" +
        //     // (path.resolve(__dirname, "./bower_components")) + "&" +
        //     "includePaths[]=" +
        //     (path.resolve(__dirname, "./node_modules"))
        // }
      ]
    }
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = {
      app: ['./app.js']
    }

    webpackConfig.output = {
      path: jsDest,
      filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      publicPath: publicPath
    }

    // Factor out common dependencies into a shared.js
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      })
    )
  }

  if (env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  if (env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, paths.publicDirectory),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig;
};
