var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function(cb) {
  require("gulp-util").log("Building in environment:" + process.env.NODE_ENV);
  gulpSequence('clean', ['fonts', 'images'], ['sass', 'nunjucks'], ['watch', 'browserSync'], cb);
});
