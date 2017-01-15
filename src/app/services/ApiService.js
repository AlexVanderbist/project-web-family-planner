angular
  .module('app')
  .service('ApiService', ApiService);

/** ngInject */
function ApiService($http, $log) {
  var svc = this;

  const baseUrl = 'http://planni.app/api/';

  svc.getMessages = function (eventId) {
    return $http.get(baseUrl + 'messages');
  }
}
