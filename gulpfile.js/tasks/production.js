var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('production', function(cb) {
  process.env.NODE_ENV = 'production';
  require("gulp-util").log(process.env.NODE_ENV);
  gulpSequence('build', cb);
});
