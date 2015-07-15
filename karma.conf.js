var paths = require('./gulpfile.js/lib/paths');
var karmaWebpack = require('karma-webpack');
var webpackConfig = require('./webpack.config')('test');

var karmaConfig = {
  frameworks: ['jasmine'],
  files: [
    'src/client/**/*.spec.js'
  ],
  preprocessors: {
    'src/client/**/*.spec.js': ['webpack']
  },
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true' ? 'Firefox' : 'Chrome')]
};

module.exports = function(config) {
  config.set(karmaConfig);
};
