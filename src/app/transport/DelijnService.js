angular.module('app')
  .service('DelijnService', DelijnService);

/** @NgInject */
function DelijnService($http) {
  this.getNextBusses = function (busstop) {
    return $http({
      method: 'GET',
      url: 'https://www.delijn.be/rise-api-core/haltes/doorkomstenditmoment/'+busstop+'/13'
    })
  };
}
