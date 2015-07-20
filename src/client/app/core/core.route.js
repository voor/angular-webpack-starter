var name = 'app.core.route';
module.exports = name;

// Race condition with loading states, need to declare this first.
var templateUrl = require('./404.html');

angular
  .module(name, [])
  .run(appRun);

/* @ngInject */
function appRun(routerHelper) {
  var otherwise = '/404';
  routerHelper.configureStates(getStates(), otherwise);
}

function getStates() {
  return [{
    state: '404',
    config: {
      url: '/404',
      templateUrl: templateUrl,
      title: '404'
    }
  }];
}
