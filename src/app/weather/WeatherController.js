angular.module('app')
  .controller('WeatherController', WeatherController);

/** @ngInject */
function WeatherController($document, $log, $timeout) {
  var vm = this;

  $log.log("WeatherController loaded.");

  function getPercentageFromValues(val, min, max) {
    var percentage = (val - min) / (max - min) * 100;
    return percentage + '%';
  }

  function init() {
    vm.temperature = 20;
    vm.thermometerStyle = {};

    $timeout(function () {
      vm.thermometerStyle = {
        height: getPercentageFromValues(vm.temperature, -10, 35)
      };
    }, 200);
  }
  init();
}
