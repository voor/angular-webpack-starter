var buildWebpackConfig = require('./gulpfile.js/lib/buildWebpackConfig');

// http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
module.exports = buildWebpackConfig('development');
