var name = 'app.core.constants';
module.exports = name;

angular
  .module(name, [])
  .constant('moment', require('moment'));
