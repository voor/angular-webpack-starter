var path = require('path');
var webpack = require('webpack');
var webpackManifest = require('./webpackManifest');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var paths = require('./paths');
var gutil = require("gulp-util");
var colors = gutil.colors;

module.exports = function(env) {
  var jsSrc = path.resolve(paths.sourceDirectory);
  var jsDest = path.resolve(path.join(paths.publicDirectory, 'js'));
  var publicPath = '/js/';

  /*
   * These are dependencies that we know do not have further requires inside of
   *    them, so facilitate a faster parsing process.
   */
  var deps = [
    'angular/angular.js',
    'angular-animate/angular-animate.min.js',
    'angular-aria/angular-aria.min.js',
    'angular-material/angular-material.min.js',
    'angular-sanitize/angular-sanitize.min.js',
    'angular-toastr/dist/angular-toastr.tpls.min.js',
    'angular-ui-router/build/angular-ui-router.min.js',
    'moment/min/moment.min.js',
    'underscore/underscore-min.js',
  ];

  gutil.log('Load templates relative to: ' + path.resolve(paths.sourceDirectory));
  var webpackConfig = {
    context: jsSrc,

    plugins: [
      new ngAnnotatePlugin({
        add: true,
        // other ng-annotate options here
      }),
      // Moment attempts to load in all of the locales, we're just going to ignore those.
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    resolve: {
      root: path.resolve(paths.sourceDirectory + '/app'),
      extensions: ['', '.js'],
      alias: {}
    },

    module: {
      preLoaders: [{
        test: /\.js$/,
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: 'baggage?[file].html'
      }],
      loaders: [
        // Expose Angular to the global scope, so we don't need to import it into everything.
        // {
        //   test: path.resolve(node_modules_dir, deps[0]),
        //   loader: "expose?React"
        // },

        // Used for the babel.  This is applied to ALL js files, so they must ALL be ES6 compliant.
        {
          test: /\.js$/,
          loaders: ['ng-annotate', 'babel-loader?stage=1'],
          exclude: /node_modules/
        },
        // ngtemplate loader.  This is goin to be applied to ALL html files now.
        {
          test: /\.html$/,
          loader: "ngtemplate?relativeTo=/" + path.resolve(paths.sourceDirectory) + "/!html"
        }
      ],
      // Libraries you don't want to parse for performance.
      noParse: []
    }
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = {
      app: ['./app']
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


    // Run through deps and extract the first part of the path,
    // as that is what you use to require the actual node modules
    // in your code. Then use the complete path to point to the correct
    // file and make sure webpack does not try to parse it
    deps.forEach(function(dep) {
      var depPath = path.resolve(paths.nodeDirectory, dep);
      gutil.log("Not parsing:" + colors.blue.bold(depPath) + ' and will resolve it from ' + colors.blue.bold(dep.split(path.sep)[0]));
      webpackConfig.resolve.alias[dep.split(path.sep)[0]] = depPath;
      webpackConfig.module.noParse.push(depPath);
    });
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
