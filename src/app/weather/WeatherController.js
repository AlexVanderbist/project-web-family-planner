angular.module('app')
  .controller('WeatherController', WeatherController);

/** @ngInject */
function WeatherController($document, $log, $timeout, OpenWeatherService) {
  var vm = this;

  function getPercentageFromValues(val, min, max) {
    var percentage = (val - min) / (max - min) * 100;
    return percentage + '%';
  }

  function init() {
    $log.debug("WeatherController loaded.");

    vm.thermometerStyle = {
      height: '0%'
    };

    OpenWeatherService.getTodayWeather().success(function (data) {
      vm.temperature = data.main.temp;
      vm.thermometerStyle = {
        height: getPercentageFromValues(vm.temperature, -10, 35)
      };
    });
  }
  init();
}
