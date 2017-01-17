angular
  .module('app')
  .service('OpenWeatherService', OpenWeatherService);

/** @ngInject */
function OpenWeatherService($log, $http) {
  var svc = this;

  var apiKey = '5e82f8d95dafe191dfa259b75be0520c';

  svc.getTodayWeather = function () {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        q: 'Antwerp,BE',
        apikey: apiKey,
        units: 'metric'
      }
    });
  };
}
