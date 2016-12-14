angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      template: '<ui-view/>',
      controller: 'MainController as main'
    })
    .state('app.weather', {
      url: 'weather',
      templateUrl: 'app/weather/weather.html',
      controller: 'WeatherController as weather'
    })
    .state('app.transport', {
      url: 'transport',
      templateUrl: 'app/transport/transport.html',
      controller: 'TransportController as transport'
    });
}
