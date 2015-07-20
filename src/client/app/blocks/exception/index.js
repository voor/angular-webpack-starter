var name = 'blocks.exception';
module.exports = name;

angular.module(name, [require('./exception-handler.provider'), require('./exception'), 'blocks.logger']);
