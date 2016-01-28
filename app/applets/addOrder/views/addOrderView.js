define(["backbone","marionette","underscore","hbs!app/applets/addOrder/templates/addOrderTemplate","hbs!app/applets/addOrder/templates/visitTemplate","hbs!app/applets/addOrder/templates/footerTemplate","app/applets/addOrder/views/opMedManagerView","app/applets/addOrder/views/orderTypeView","app/applets/addOrder/helpers/opMedModelUtil"],function(e,t,i,r,d,o,s,a,n){"use strict";var l,p=e.Marionette.ItemView.extend({template:o,events:{"click #btn-add-order-accept":"addOrder"},addOrder:function(e){$(e.currentTarget).html("<i class='fa fa-spinner fa-spin'></i> <span> Saving Order Record ...</span>"),$(e.currentTarget).addClass("disabled").attr("disabled"),e.preventDefault(),n.saveMed()}}),g=e.Marionette.ItemView.extend({template:d,events:{"click #change-visit-btn":"selectVisit"},selectVisit:function(){var e=ADK.Messaging.getChannel("visit"),t=this;e.command("openVisitSelector","visit_select",{oid:n.getVisitModel(),gridView:t})},initialize:function(){this.model.get("visit")}});return e.Marionette.LayoutView.extend({className:"add-order-styles",template:r,regions:{errorRegion:"#error-container",visitRegion:"#visit-region",orderTypeRegion:"#order-type-region",orderRegion:"#order-form-region"},initialize:function(){l=new e.Model,l.set("visit",ADK.PatientRecordService.getCurrentPatient().get("visit")),this.model=l},onRender:function(){var e=new g({model:this.model});this.visitRegion.show(e);var t=new a({model:this.model});this.orderTypeRegion.show(t)},modelEvents:{change:"modelChanged"},modelChanged:function(e){if(e.changed.hasOwnProperty("orderType")&&"outpatientMeds"===this.model.get("orderType")){var t=new s({model:l});this.orderView=t,this.orderRegion.show(t)}$("#mainModalLabel").text("Add "+this.model.get("orderTypeText")),this.orderTypeRegion.reset()},showModal:function(e,t){if(void 0===l.get("visit")){var i=ADK.Messaging.getChannel("visit"),r=this;i.command("openVisitSelector","visit_select",{oid:n.getVisitModel(),gridView:r})}else{var d={size:"medium",footerView:p},o=new ADK.UI.Modal({view:this,options:d});o.show()}}})});