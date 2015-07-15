var gulp = require('gulp');
var del = require('del');
var paths = require('../lib/paths');

gulp.task('clean', function(cb) {
  del([
    paths.publicDirectory
  ], cb);
});
