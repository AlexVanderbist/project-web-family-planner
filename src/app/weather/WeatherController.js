angular.module('app')
  .controller('WeatherController', WeatherController);

/** @ngInject */
function WeatherController($document, $log, $timeout, OpenWeatherService, $interval, ScreenConfigService) {
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

    // Load todays weather
    OpenWeatherService.getTodayWeather(ScreenConfigService.screenConfig.household.address)
      .then(function (response) {
        vm.weatherDescription = response.data.weather[0].main;
        vm.weather = response.data.main;
        vm.thermometerStyle = {
          height: getPercentageFromValues(vm.temperature, -10, 35)
        };
      });

    // Load tomorrows weather
    OpenWeatherService.getWeatherForecast(ScreenConfigService.screenConfig.household.address)
      .then(function (response) {
        console.log(response);
        vm.weatherForecast = response.data;
      });

    $interval(function () {
      vm.time = (vm.time === 'day' ? 'night' : 'day');
    }, 5000);
  }

  init();
}
