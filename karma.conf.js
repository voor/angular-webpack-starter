var paths = require('./gulpfile.js/lib/paths');
var karmaWebpack = require('karma-webpack');
var buildWebpackConfig = require('./gulpfile.js/lib/buildWebpackConfig');
var path = require('path');

var karmaConfig = {
  frameworks: ['jasmine'],
  files: [
    'src/client/**/*.spec.js'
  ],
  preprocessors: {
    'src/client/**/*.spec.js': ['webpack']
  },
  webpack: buildWebpackConfig('test'),
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true' ? 'Firefox' : 'Chrome')]
};

['bardjs/bard.js', 'angular/angular.js'].forEach(function(angularHelper) {
  karmaConfig.files.unshift(path.resolve(paths.nodeDirectory, angularHelper));
});

module.exports = function(config) {
  config.set(karmaConfig);
};
