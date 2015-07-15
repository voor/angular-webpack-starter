var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');

var paths = require('../lib/paths');
var config = {
  autoprefixer: {
    browsers: ['last 2 version']
  },
  src: paths.sourceDirectory + "/**/*.{sass,scss}",
  dest: paths.publicDirectory + '/css',
  settings: {
    indentedSyntax: true, // Enable .sass syntax!
    imagePath: '/images' // Used by the image-url helper
  }
};

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

module.exports = config;
