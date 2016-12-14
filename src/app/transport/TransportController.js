angular.module('app')
  .controller('TransportController', TransportController);

/** @NgInject */
function TransportController(DelijnService, $log) {
  var vm = this;

  vm.nextBusses = [];

  function _init() {
    $log.debug('TransportController loaded!');

    DelijnService.getNextBusses(function (err, busses) {
      if (!err) vm.nextBusses = busses;
    });
  }
  _init();
}
