angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: 'app/setup/setup.html',
      controller: 'SetupController as setup'
    })
    .state('app', {
      url: '/',
      template: '<ui-view/>',
      // redirectTo: 'app.weather',
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
    })
    .state('app.messages', {
      url: 'messages',
      templateUrl: 'app/messages/messages.html',
      controller: 'MessagesController as messages'
    })
    .state('app.calendar', {
      url: 'calendar',
      templateUrl: 'app/calendar/calendar.html',
      controller: 'CalendarController as calendar'
    });
}
