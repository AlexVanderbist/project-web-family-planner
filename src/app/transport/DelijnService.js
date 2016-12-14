angular.module('app')
  .service('DelijnService', DelijnService);

/** @NgInject */
function DelijnService($http) {
  this.getNextBusses = function (callback) {
    $http({
      method: 'GET',
      url: 'https://www.delijn.be/rise-api-core/haltes/doorkomstenditmoment/105458/13'
    }).then(function successResponse(response) {
      callback(null, response.data.lijnen);
    }, function errorResponse(response) {
      callback(response);
    });
  };
}
