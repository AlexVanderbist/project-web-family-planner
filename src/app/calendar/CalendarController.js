angular.module('app')
  .controller('CalendarController', CalendarController);

/** @ngInject */
function CalendarController($log, ApiService, $interval, $state, $scope, $rootScope) {
  var vm = this;

  vm.calendarCount = 0;
  var cycleTimer;

  function init() {
    $log.debug("CalendarController loaded.");

    ApiService.getCalendars().then(
      function onSuccess(response) {
        if(!response.data.length) return $rootScope.nextSlide();
        $log.debug(response.data);

        vm.calendars = response.data;
        vm.calendar = vm.calendars[0];
      }, function onError(response) {
        $log.error("Calendar error", response);
        $rootScope.nextSlide();
      });

    // cycleTimer = $interval(function() {
    //   if(vm.calendarCount +1 <= vm.calendars.length) {
    //     vm.calendarCount++;
    //     // vm.calendar = vm.calendars[vm.calendarCount];
    //     // vm.calendar.events = [];
    //     // vm.calendars[vm.calendarCount].events.forEach(function(event) {
    //     //   vm.calendar.events.push(event);
    //     // });
    //   } else {
    //     vm.calendarCount = 0;
    //     $interval.cancel(cycleTimer);
    //     //return $rootScope.nextSlide();
    //   }
    // }, 4000);
  }

  init();
}
