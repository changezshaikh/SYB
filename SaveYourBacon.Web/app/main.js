(function () {
    'use strict';

    var app = angular.module('SavingYourBacon', [
        'ngRoute', 'ngAnimate', 'controllers', 'services', 'directives', 'filters',
        'ui.bootstrap',
        'grid'
    ]);

    var services = angular.module('services', ['ngResource']);
    var controllers = angular.module('controllers', []);
    var directives = angular.module('directives', []);
    var filters = angular.module('filters', []);

})();