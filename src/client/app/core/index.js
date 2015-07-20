var name = 'app.core';
module.exports = name;

require('angular-animate');
require('angular-sanitize');
require('angular-aria');
require('angular-material');
require('angular-toastr');
require('angular-ui-router');

angular
  .module(name, [
    'ngAnimate',
    'ngSanitize',
    'ngMaterial',
    'toastr',
    'blocks.exception',
    'blocks.logger',
    'blocks.router',
    'ui.router',
    require('./dataservice'),
    require('./config'),
    require('./constants'),
    require('./core.route')
  ]);
