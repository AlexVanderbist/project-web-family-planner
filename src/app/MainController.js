angular
  .module('app')
  .controller('MainController', MainController);

/** @ngInject */
function MainController($timeout, $state, $log, $rootScope, ApiService) {

  // Variables
  $rootScope.currentSlideId = -1;
  $rootScope.slides = [];

  $rootScope.createSlides = function (response) {
    $rootScope.slides = [];
    if(response.data.length) {
      response.data.forEach(function(slideName) {
        $rootScope.slides.push({
          name: slideName,
          duration: 6000
        });
      });
    }
  }

  $rootScope.nextSlide = function () {

    // Get available slides
    ApiService.getAvailable().then($rootScope.createSlides);

    // Cycle through slides normally
    if($rootScope.slides.length) {

      // Cycle slides
      $rootScope.currentSlideId++;

      $log.debug($rootScope.currentSlideId, $rootScope.slides);

      // If we reached the end; refresh
      if($rootScope.currentSlideId >= $rootScope.slides.length) {
        $rootScope.currentSlideId = 0;
        $log.debug('reached the end; full refresh');
        window.location.reload(true);
      }

      $state.go('app.' + $rootScope.slides[$rootScope.currentSlideId].name);
      $timeout.cancel($rootScope.slideTimeout);
      $rootScope.slideTimeout = $timeout($rootScope.nextSlide, $rootScope.slides[$rootScope.currentSlideId].duration);

      // if($rootScope.slides[$rootScope.currentSlideId].name != 'calendar') {
      //   // Calendar will redirect on its own when done
      //   $rootScope.slideTimeout = $timeout($rootScope.nextSlide, $rootScope.slides[$rootScope.currentSlideId].duration);
      // }
    } else {
      $timeout.cancel($rootScope.slideTimeout);
      $rootScope.slideTimeout = $timeout($rootScope.nextSlide, 1000);
    }
  };

  function _init() {
    $log.debug('MainController loaded!');

    ApiService.getAvailable().then(function (response) {
      $rootScope.createSlides(response);
      $rootScope.nextSlide();
    });
  }
  _init();
}
