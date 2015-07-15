var assign = require('object-assign');
var buildWebpackConfig = require('../lib/buildWebpackConfig');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');
var browserSync = require('browser-sync');

gulp.task('webpack', ['analyze'], function(callback) {
  var built = false;

  var config = buildWebpackConfig(process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'production') {
    webpack(config, function(err, stats) {
      logger(err, stats);
      callback();
    });
  } else {
    webpack(config).watch(200, function(err, stats) {
      logger(err, stats);
      browserSync.reload();
      // On the initial compile, let gulp know the task is done
      if (!built) {
        built = true;
        callback();
      }
    });
  }
});
