var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gutil = require("gulp-util");

var colors = gutil.colors;

gulp.task('build', function(cb) {
  process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  gutil.log("Building in environment: " + colors.green(process.env.NODE_ENV));
  gulpSequence('clean', ['fonts', 'images'], ['sass', 'nunjucks'], ['watch', 'browserSync'], cb);
});
