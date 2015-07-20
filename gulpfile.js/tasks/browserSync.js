var browserSync = require('browser-sync');
var gulp = require('gulp');

var paths = require('../lib/paths');
var config = {
  server: {
    baseDir: paths.publicDirectory
  },

  files: ['dist/client/**/*.html']
};

gulp.task('browserSync', function() {
  return browserSync(config);
});

module.exports = config;
