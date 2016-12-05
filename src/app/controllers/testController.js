angular
	.module('app')
	.controller('TestController', function () {
  var vm = this;

  function _init() {
    vm.test = 'This is test view!';
  }

  _init();
});
