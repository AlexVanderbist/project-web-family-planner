angular.module('app')
  .controller('MessagesController', MessagesController);

/** @NgInject */
function MessagesController($log, ApiService, $rootScope) {

  var vm = this;

  vm.messages = [];

  function _init() {
    $log.debug("MessagesController loaded!");

    ApiService.getMessages().then(
      function onSucces(response) {
        // If no data is returned; next slide
        if(! response.data.length) $rootScope.nextSlide();
        vm.messages = response.data;
      },
      function onError(response) {
        $log.error("Getting messages failed:", response);
        $rootScope.nextSlide();
      }
    );
  }
  _init();

}
