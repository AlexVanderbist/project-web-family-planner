angular
  .module('app')
  .service('OpenWeatherService', OpenWeatherService);

/** @ngInject */
function OpenWeatherService($log, appConfig, $http) {
  var svc = this;

  svc.getTodayWeather = function () {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        q: 'Antwerp,BE',
        apikey: appConfig.openWeatherApi.apiKey,
        units: 'metric'
      }
    });
  };
}
