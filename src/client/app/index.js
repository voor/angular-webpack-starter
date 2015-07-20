require('angular');

angular.module('app', [
  require('./blocks/exception'),
  require('./blocks/logger'),
  require('./blocks/router'),
  require('./core')
]);

module.exports = 'app';
