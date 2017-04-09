var angular = require('angular');
var ngRute = require('angular-route');

var app = angular.module('app', [
    'ngRoute'
]);

angular.module('app').config(['$locationProvider','$routeProvider',
    function config($locationProvider,$routeProvider){
            $locationProvider.hashPrefix('!');
            $routeProvider.
               when('/pagosList', {
                template: require('./components/pagos-list/pagos-list.html')//,
//                controller: 'pagosCtrl'
            }).when('/pagosAdd',{
                template: require('./components/pagos-add/pagos-add.html')//,
//                controller: 'pagosCtrl'                
            }).otherwise('pagosList');
  }]
);

app.controller('pagosCtrl',['$scope',
    function($scope){
        $scope.pagos = [
        {
            name: 'EPEC',
            value: 147,
            month: 'enero'
        },{
            name: 'EPEC',
            value: 148,
            month: 'febrero'
        },{
            name: 'ECOGAS',
            value: 247,
            month: 'enero'
        },{
            name: 'ECOGAS',
            value: 248,
            month: 'febrero'
        }
        ];               
        console.log($scope.pagos)
        
        $scope.newpago = {
            name: '',
            value: 0,
            month: ''
        };
        
        $scope.update = function(newpago){
            console.log(newpago);
            nuevo = {
            name: newpago.name,
            value: newpago.value,
            month: newpago.month
        }; 
            $scope.pagos.push(nuevo);
            
        }
        console.log($scope.pagos)
        
    }                              
]);