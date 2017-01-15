angular.module('app')
  .controller('MessagesController', MessagesController);

/** @NgInject */
function MessagesController($log, ApiService) {

  var vm = this;

  vm.messages = [];

  function _init() {
    $log.log("MessagesController loaded!");

    ApiService.getMessages().then(
      function onSucces(response) {
        $log.debug(response);
        vm.messages = response.data;
      },
      function onError(response) {
        $log.error("Getting messages failed:", response);
      }
    );
  }
  _init();

}
