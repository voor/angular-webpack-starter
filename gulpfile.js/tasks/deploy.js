var gulp = require('gulp');

var paths = require('../lib/paths');
var config = {
  src: paths.publicDirectory + '/**/*'
};

gulp.task('deploy', ['production'], function(cb) {
  // TODO Implement.
  cb();
});

module.exports = config;
