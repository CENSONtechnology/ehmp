define(["underscore","app/applets/vitals/util","hbs!app/applets/vitals/list/observedTemplate","hbs!app/applets/vitalsObservationList/templates/vitalsObservationListBodyTemplate","app/applets/vitalsObservationList/views/vitalsObservationListFooterView"],function(e,t,i,a,o){function r(e){return e=t.getObservedFormatted(e),e=t.getFacilityColor(e),e=t.getObservedFormattedCover(e),e=t.getResultedFormatted(e),e=t.getDisplayName(e),e=t.getTypeName(e),e=t.getResultUnits(e),e=t.getMetricResultUnits(e),e=t.getResultUnitsMetricResultUnits(e),e=t.getReferenceRange(e)}function n(t){var i=e.clone(t);return i.models=e.uniq(i.models,!0,function(e){return e.get("observedFormatted")}),i}var s="No Records Found",l="Patient Vitals Observed List",c={appletConfig:{name:"vitalsObservedList_modal",id:"vitalsObservedList-modalView"},filterDateRangeEnabled:!1};c.columns=[{name:"observedFormatted",label:"Date",template:i,cell:"handlebars",sortable:!0}];var d=new Backbone.Collection,v={},g=Backbone.Marionette.LayoutView.extend({template:a,collection:d,regions:{grid:".js-backgrid"},showModal:function(e,t){var i=this,a=t.collection;t.hasOwnProperty("gridView")===!0&&(v=t.gridView);var r=o.extend({bodyView:this}),g={size:"large",title:l,footerView:r,regionName:"vitalsObservationDialog"},p=new ADK.UI.Modal({view:this,options:g});p.show(),d=a,c.collection=n(a),c.emptyText=s,c.onClickRow=i.onClickRow,i.dataGrid=ADK.Views.DataGrid.create(c),i.grid.reset(),i.grid.show(i.dataGrid),c.collection>0&&(i.paginatorView=ADK.Views.Paginator.create({collection:c.collection}),i.grid.$el.append(i.paginatorView.render().el))},onClickRow:function(t,i,a){var o=t.attributes.observedFormatted,r=e.filter(d.models,function(e){return e.get("observedFormatted")==o}),n=ADK.Messaging.getChannel("vitalsEiE");n.trigger("vitalsEiE:clicked",i,{collection:r,title:o,checked:"",gridView:v})}});!function(){var e=ADK.Messaging.getChannel("vitalsObservationList");e.reply("vitalsObservationListView",function(){var e=p.getRootView();fetchOptions={criteria:ADK.UserService.getUserSession(),patient:ADK.PatientRecordService.getCurrentPatient(),resourceTitle:"patient-record-vital",viewModel:{parse:r},pageable:!0};var t=$.Deferred(),i=ADK.PatientRecordService.fetchCollection(fetchOptions);return i.on("sync",function(){t.resolve({view:new e,collection:i})},this),t.promise()})}();var p={id:"vitalsObservationList",getRootView:function(){return g}};return p});