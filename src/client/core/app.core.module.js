import uirouter from 'angular-ui-router';

module.exports = 'app.core';

angular.module('app.core', [
  'blocks.exception', 'blocks.logger', 'blocks.router',
  uirouter, 'ngplus'
]);
