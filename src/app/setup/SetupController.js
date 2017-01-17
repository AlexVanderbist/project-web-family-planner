angular.module('app')
  .controller('SetupController', SetupController);

/** @ngInject */
function SetupController($log, AppConfig, ScreenConfigService, $interval, $state) {
  var vm = this;

  // Vars
  vm.uiUrl = AppConfig.uiUrl;
  vm.screenCode = ScreenConfigService.screenCode;
  vm.screenName = null;
  vm.countdown = 15;

  var checkTimer;
  var countdownTimer;

  function init() {
    $log.debug("SetupController loaded.");

    checkTimer = $interval(checkScreenExists, 5000);
  }

  function checkScreenExists () {
    ScreenConfigService.getScreenConfig(function(err, config) {
      if(config) {
        $interval.cancel(checkTimer);
        vm.screenName = config.name;
        countdownTimer = $interval(function countdown() {
          if(vm.countdown <= 0) {
            $interval.cancel(countdownTimer);
            $state.go('app');
          }
          vm.countdown--;
        }, 1000);
      }
    });
  }
  init();
}
