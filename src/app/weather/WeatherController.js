angular.module('app')
  .controller('WeatherController', WeatherController);

/** @ngInject */
function WeatherController($document, $log, $timeout, OpenWeatherService) {
  var vm = this;

  vm.thermometerStyle = {
    height: '0%'
  };

  // Set time to day or night
  vm.time = ((new Date()).getHours() > 20 || (new Date()).getHours() < 8 ? 'night' : 'day');

  function getPercentageFromValues(val, min, max) {
    var percentage = (val - min) / (max - min) * 100;
    return percentage + '%';
  }

  function init() {
    $log.debug("WeatherController loaded.");

    OpenWeatherService.getTodayWeather().then(function (response) {
      vm.temperature = response.data.main.temp;
      vm.thermometerStyle = {
        height: getPercentageFromValues(vm.temperature, -10, 35)
      };
    }, function (response) {
      $log.error("Couldn't get weather from OpenWeatherService", response);
    });
  }
  init();
}
