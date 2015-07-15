var gulp = require('gulp');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');

var jscs = require('gulp-jscs');
var handleErrors = require('../lib/handleErrors');

var paths = require('../lib/paths');
var config = {
  js: [
    paths.sourceDirectory + "**/*.js"
  ]
};

/**
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', /*['plato'],*/ function() {

  var jshint = analyzejshint([].concat(config.js));
  var jscs = analyzejscs([].concat(config.js));

  return merge(jshint, jscs);
});

module.exports = config;

////////////////

/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
  var jshintrcFile = overrideRcFile || './.jshintrc';
  return gulp
    .src(sources)
    .pipe(jshint(jshintrcFile))
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', handleErrors);
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
  return gulp
    .src(sources)
    .pipe(jscs('./.jscsrc'))
    .on('error', handleErrors);
}
