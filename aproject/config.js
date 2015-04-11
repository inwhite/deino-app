// Resolve conflict of twig and angular tags.
// app.config(['$interpolateProvider', function($interpolateProvider){
//     $interpolateProvider.startSymbol('[[').endSymbol(']]');
// }])
// Add ajax header, that server knows that Angular requet is ajax.
app
.config(function ($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
// Global handler of requests.
.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                goToLogin();
                //$location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);
