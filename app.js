angular.module('fbCommunicationApp', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('fbCommunicationApp').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('client', {
        url: '/dashboard',
        templateUrl: 'partial/client/client.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/dashboard');

});

angular.module('fbCommunicationApp').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
