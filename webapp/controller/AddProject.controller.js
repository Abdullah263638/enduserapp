sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(BaseController, MessageBox, Utilities, History,Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.endUserApp.controller.AddProject", {
		handleRouteMatched: function(oEvent) {

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}
				var filters = [];
		var filterByName = new sap.ui.model.Filter("Userid", sap.ui.model.FilterOperator.EQ, "S0019143758");
		filters.push(filterByName);
		var oList = this.byId("projecten");
		var oBinding = oList.getBinding("items");
		oBinding.filter(filters);

		},
			SaveButton: function(){
				
			var projectnaam = this.byId("Projectnaam").getValue();
			var bedrijfsnaam = this.byId("Bedrijfsnaam").getValue();
			var startdatum = this.byId("Startdatum").getValue();
			var einddatum = this.byId("Einddatum").getValue();
		    //this function checks its value, you can insert more checks on the value
				   if(projectnaam === "") {
					alert('Vul projectnaam in');
						 }
				  if(bedrijfsnaam === "") {
					alert('Vul bedrijfsnaam in');
						 }
				  if(startdatum === "") {
			alert('Vul startdatum in');
				 }
				  if(einddatum === "") {
			alert('Vul einddatum in');
				 }
				 else{
				 var project = {
						"Id": 1,
						"Name": projectnaam,
						"Startdatum": startdatum,
						"Einddatum":  einddatum,
						"Bedrijsnaam": bedrijfsnaam,
						"Skillsid": 0,
						"Userid": 'S0019143758',
						"Typedeveloperid": 0,
						"Typefuncid": 0 ,
			};
				var oProjectModel = this.getView().getModel();
			
			oProjectModel.create("/ExProjectSet", project, {
				success: function(data) {
				sap.m.MessageToast.show("Save Post");

				},
				error: function(response) {
					sap.m.MessageToast.show("Error Post");

				}
			}); 
			
				 }
			
			},
		_onPageNavButtonPress: function() {

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}
		},
		getQueryParameters: function(oLocation) {

			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
	
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("AddProject").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
	
		}
	});
}, /* bExport= */ true);