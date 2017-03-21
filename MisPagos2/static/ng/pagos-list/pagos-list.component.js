angular.
  module('pagosList').
    component('pagosList',{
	  templateUrl: '../static/ng/pagos-list/pagos-list.template.html',
	  controller: function pagosListController(){
		this.pagos = [
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
	  }
	});