var assign = require('object-assign');
var buildWebpackConfig = require('../lib/buildWebpackConfig');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

var paths = require('../lib/paths');

gulp.task('webpack', ['analyze'], function(callback) {
  var built = false;

  var config = buildWebpackConfig(process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'production') {
    webpack(config, function(err, stats) {
      logger(err, stats);
      callback(err);
    });
  } else {

    var compiler = webpack(config);

    var server = new WebpackDevServer(compiler, {
      // webpack-dev-server options
      publicPath: '/js/',
      stats: {
        colors: true
      }
    });
    server.listen(5050, "localhost", function() {
      callback();
    });
  }
});
