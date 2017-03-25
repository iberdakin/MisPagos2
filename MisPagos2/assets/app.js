var angular = require('angular');

var app = angular.module('app', [
    require('angular-route'),
    require('angular-ui-bootstrap'),
]);

require('./components/pagos-list/pagos-list')(app);
