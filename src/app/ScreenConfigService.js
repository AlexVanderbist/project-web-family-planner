angular
  .module('app')
  .service('ScreenConfigService', function ($http, AppConfig) {
    var svc = this;

    svc.screenCode = '123ABC';
    svc.screenConfig = null;

    const options = {
      headers: {
        'PlanniScreenCode': svc.screenCode
      }
    };

    svc.getScreenConfig = function (callback) {
      if(svc.screenConfig) return callback(null, svc.screenConfig);

      $http.get(AppConfig.apiUrl + 'screen', options).then(function onSuccess(response) {
        svc.screenConfig = response.data;
        console.log(svc.screenConfig);
        callback(null, svc.screenConfig);
      }, function onError(response) {
        callback(response);
      });
    }
  });
