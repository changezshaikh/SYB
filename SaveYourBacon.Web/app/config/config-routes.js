app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'AddressSearchController',
            templateUrl: 'app/address-search/address-search.html'
        })
        .otherwise({
            redirectTo: '/address-search'
        });

}]);