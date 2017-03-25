var template = require('./pagos-list.html');

function pagosListController() {
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

module.exports = function (ngModule) {
	ngModule.component('pagosList',{
	  template: template,
	  controller: pagosListController
	});
}