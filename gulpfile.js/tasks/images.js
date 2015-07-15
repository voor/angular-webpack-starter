var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

var paths = require('../lib/paths');
var config = {
  src: paths.sourceDirectory + "/images/**",
  dest: paths.publicDirectory + "/images"
};

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

module.exports = config;
