angular
  .module('app')
  .controller('MainController', MainController);

/** @ngInject */
function MainController($timeout, $state, $log, $rootScope) {

  // Variables
  currentSlideId = 0;
  slides = [
    {
      name: 'weather',
      duration: 5000
    },
    {
      name: 'transport',
      duration: 5000
    }
  ];

  var nextSlide = function () {
    currentSlideId = (currentSlideId + 1 === slides.length ? 0 : currentSlideId + 1);
    $state.go("app." + slides[currentSlideId].name);
    $timeout(nextSlide, slides[currentSlideId].duration);
  }

  function _init() {
    $log.debug('MainController loaded!');

    // nextSlide();
  }
  _init();
}
