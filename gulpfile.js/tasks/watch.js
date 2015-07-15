var gulp = require('gulp');
var nunjucks = require('./nunjucks');
var images = require('./images');
var sass = require('./sass');
var fonts = require('./fonts');
var watch = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(images.src, function() {
    gulp.start('images');
  });
  watch(sass.src, function() {
    gulp.start('sass');
  });
  watch(fonts.src, function() {
    gulp.start('fonts');
  });
  watch(nunjucks.watch, function() {
    gulp.start('nunjucks');
  });
});
