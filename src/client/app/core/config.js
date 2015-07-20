var name = 'app.core.config';
module.exports = name;

var core = angular.module(name, []);

core.config(toastrConfig);

/* @ngInject */
function toastrConfig(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right',
    timeOut: 5000
  });
}

var config = {
  appErrorPrefix: '[angular-webpack-starter Error] ',
  appTitle: 'My Angular App'
};

core.value('config', config);

core.config(configure);

/* @ngInject */
function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({
    docTitle: config.appTitle
  });
}
