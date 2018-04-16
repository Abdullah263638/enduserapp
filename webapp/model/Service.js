sap.ui.define(["sap/ui/base/Object", "sap/m/BusyDialog"], function(Object, BusyDialog) {
	"use strict";
	var Service = Object.extend("com.sap.build.standard.endUserApp.model.Service", {
		constructor: function() {},
		
		setModel: function(model) {
			this.model = model;
		},
		
		getProject: function(filters) {
			var me = this;
			var filters = new Array(); 
			var filterByName = new sap.ui.model.Filter("Userid", sap.ui.model.FilterOperator.EQ, "P1942248500");
			filters.push(filterByName);  
			return new Promise(function(resolve, reject) {
				me.model.read("/ExProjectSet", {
					filters: filters,
					success: function(data) {
						resolve(data.results);
					},
					error: function(error) {
						reject(error);
					}
				});
			});
		}
	});
	return new Service();
});