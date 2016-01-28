define(["backbone","marionette","underscore","hbs!app/applets/medication_review/list/medicationListTemplate","hbs!app/applets/medication_review/charts/graphTemplate","app/applets/medication_review/eventHandlers","app/applets/medication_review/appletHelper","app/applets/medication_review/list/medicationListView","app/applets/medication_review/medicationCollectionHandler","app/applets/medication_review/charts/medications","app/applets/medication_review/list/detailController"],function(e,i,t,n,a,d,l,r,o,c,s){var p=e.Model.extend({defaults:{recentDaysFilter:"1825"}}),m=new p,h=e.Marionette.LayoutView.extend({initialize:function(){o.initialized||o.initCollections(),o.fetchAllMeds();var e=this;this.listenTo(ADK.Messaging,"globalDate:selected",function(i){e.globalDateSelected()}),this.medicationListView=new r,this.medicationGraphItemView=new c},globalDateSelected:function(){this.medicationListView.collection.reset(),o.fetchAllMeds()},onRender:function(){this.appletMain.show(this.medicationListView),this.graph.show(this.medicationGraphItemView)},template:n,model:m,className:"medReviewApp",regions:{appletMain:"#med-review-applet-main",graph:"#timelineTab"},events:{"click #name":"sortByName","click #vatype":"sortByType","click #status":"sortByStatus","click #add-non-va-med-btn":"launchAddNonVaMedModal","click #add-med-order-btn":"launchAddMedOrderModal","keydown #medGroupType":"onEnter","keydown #medGroupItem":"onEnter","click #med-timeline-view-btn":"resetWidth"},templateHelpers:{inVista:function(){return ADK.PatientRecordService.isPatientInPrimaryVista()}},onEnter:function(e){(13==e.which||32==e.which)&&$(e.target).click()},launchAddNonVaMedModal:function(e){e.preventDefault();var i=ADK.Messaging.getChannel("medicationChannel");i.trigger("addNonVaMed:clicked",e)},launchAddMedOrderModal:function(e){e.preventDefault();var i=ADK.Messaging.getChannel("medicationChannel");i.trigger("addOrder:clicked",e)},resetWidth:function(){var e=setInterval(function(){clearInterval(e),$(window).trigger("resize")},200)}}),w={id:"medication_review",viewTypes:[{type:"expanded",view:h}],defaultViewType:"expanded"};return function(){var e=ADK.Messaging.getChannel("medicationChannel");e.reply("refresh",function(e){var i=(w.getRootView(),$.Deferred());return i.resolve({medicationCollectionHandler:o}),i.promise()})}(),s.initialize(w.id),w});