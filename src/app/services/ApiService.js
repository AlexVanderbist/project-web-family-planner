angular
  .module('app')
  .service('ApiService', ApiService);

/** ngInject */
function ApiService($http, $log, ScreenConfigService, AppConfig) {
  var svc = this;

  const options = {
    headers: {
      'PlanniScreenCode': ScreenConfigService.screenCode
    }
  };

  svc.getAvailable = function () {
    return $http.get(AppConfig.apiUrl + 'available', options);
  }

  svc.getMessages = function (eventId) {
    return $http.get(AppConfig.apiUrl + 'messages', options);
  }

  svc.getScreenConfig = function () {
    return $http.get(AppConfig.apiUrl + 'screen', options);
  }

}
