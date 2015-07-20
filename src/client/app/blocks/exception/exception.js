var name = 'app.blocks.exception.exceptionFactory';
module.exports = name;

angular
  .module(name, [])
  .factory('exception', exception);

/* @ngInject */
function exception(logger) {
  var service = {
    catcher: catcher
  };
  return service;

  function catcher(message) {
    return function(reason) {
      logger.error(message, reason);
    };
  }
}
