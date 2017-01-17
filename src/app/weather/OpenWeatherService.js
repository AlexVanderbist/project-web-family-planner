angular
  .module('app')
  .service('OpenWeatherService', OpenWeatherService);

/** @ngInject */
function OpenWeatherService($log, $http) {
  var svc = this;

  var apiKey = '5e82f8d95dafe191dfa259b75be0520c';

  svc.getTodayWeather = function (location) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        q: location,
        apikey: apiKey,
        units: 'metric'
      }
    });
  };

  svc.getWeatherForecast = function (location) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      params: {
        q: location,
        apikey: apiKey,
        units: 'metric'
      }
    });
  };
}
