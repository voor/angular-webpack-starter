var gulp = require('gulp');
var express = require('express');

var gutil = require('gulp-util');
var compress = require('compression');
var logger = require('morgan');
var open = require('open');

var paths = require('../lib/paths');
var config = {
  root: process.cwd() + paths.publicDirectory.substr(1),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

gulp.task('server', function() {
  var url = 'http://localhost:' + config.port;

  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port)

  gutil.log('production server started on ' + gutil.colors.green(url));
  open(url);
});

module.exports = config;
