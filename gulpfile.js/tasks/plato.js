var gulp = require('gulp');
var plato = require('plato');

var gutil = require("gulp-util");
var colors = gutil.colors;
var env = gutil.env;
var log = gutil.log;
var glob = require('glob');

var paths = require('../lib/paths');
var config = {
  files: paths.sourceDirectory + "**/*.js", //glob.sync('./src/client/app/**/*.js'),

  options: {
    title: 'Plato Inspections Report',
    exclude: /\/src\/client\/app\/.*\.spec\.js/
  },
  outputDir: './report/plato'
};

/**
 * Start Plato inspector and visualizer
 */
gulp.task('plato', function(cb) {

  var files = glob.sync(config.files);

  plato.inspect(files, config.outputDir, config.options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    log(overview.summary);
    cb();
  }
});

module.exports = config;
