var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');

var paths = require('../lib/paths');
var config = {
  src: paths.sourceDirectory + '/fonts/**/*',
  dest: paths.publicDirectory + '/fonts'
};

gulp.task('fonts', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

module.exports = config;
