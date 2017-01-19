angular
  .module('app', ['ui.router'])

  .run(function (ScreenConfigService, ApiService, $rootScope, $state, $transitions) {

    /**
     * Dont allow setup route when screen already exists
     */
    $transitions.onStart({to: 'setup'}, function (transition) {
      ScreenConfigService.getScreenConfig(function(err, config) {
        if(config) return false;
        return true;
      });
    });

    /**
     * Redirect to setup when screen is not registered yet
     */
    $transitions.onStart({}, function (trans) { // on any app route , do the following...
      var toState = trans.to();
      trans.addResolvable({
        token: 'screenConfig', // the token can be anything, here, we never actually use it in this specific case
        deps: ['$state', 'ScreenConfigService', '$q'], // inject what I need
        resolveFn: function ($state, ScreenConfigService, $q) {
          return new $q(function(resolve, reject) { // make sure this is a promise, in order to delay the route

            ScreenConfigService.getScreenConfig(function (err, config) {
              // If the screen is not registered -> redirect to setup
              if (err && ! toState.name.includes('setup')) {
                $state.go('setup');
                reject();
              } else {
                resolve();
              }

              if (config && toState.name.includes('setup')) {
                $state.go('app');
                reject();
              } else {
                resolve();
              }
            });
          })
        }
      });
    });

  })
