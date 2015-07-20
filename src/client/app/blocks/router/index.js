var name = 'blocks.router';
module.exports = name;

angular.module(name, [
  'ui.router',
  require('./router-helper.provider'),
  'blocks.logger'
]);
