var browserSync = require('browser-sync');
var gulp = require('gulp');
var render = require('gulp-nunjucks-render');
var data = require('gulp-data');
var path = require('path');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var handleErrors = require('../lib/handleErrors');

var paths = require('../lib/paths');
var config = {
  watch: paths.sourceDirectory + '/**/*.nunjucks',
  src: [paths.sourceDirectory + '/**/*.nunjucks', '!**/{layouts,shared}/**'],
  dest: paths.publicDirectory,
  nunjucks: [paths.sourceDirectory],
  htmlmin: {
    collapseWhitespace: true
  }
};

gulp.task('nunjucks', ['webpack'], function() {
  render.nunjucks.configure(config.nunjucks, {
    watch: false
  });
  return gulp.src(config.src)
    .pipe(data(getWebpackManifest))
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.htmlmin)))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

function getWebpackManifest(file) {
  if (process.env.NODE_ENV == 'production') {
    return require(path.join(process.cwd(), paths.publicDirectory, "rev-manifest.json"));
  } else {
    return {
      app: "/js/app.js",
      shared: "/js/shared.js"
    };
  }
}

module.exports = config;
