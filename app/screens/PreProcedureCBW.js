define(["app/screens/OrdersFull","app/screens/AllergyGridFull"],function(e,a){"use strict";var i={med:"medication_review_v2",document:"documents"},t={id:"pre-procedure-cbw",contentRegionLayout:"gridster",appletHeader:"navigation",appLeft:"patientInfo",predefined:!0,freezeApplets:!0,applets:[{id:"allergy_grid",title:"Allergies",instanceId:"ppcbw-allergy_grid-1",region:"ppcbw-allergy_grid-1",dataCol:"1",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"9",dataSizeX:"4",dataSizeY:"4",filterName:"Filtered Preprocedure",maximizeScreen:"allergy-grid-full",viewType:"gist"},{id:"appointments",title:"Appointments & Visits",instanceId:"ppcbw-appointments-1",region:"ppcbw-appointments-1",dataCol:"21",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"1",dataSizeX:"4",dataSizeY:"6",filterName:"Filtered Preprocedure",maximizeScreen:"appointments-full",viewType:"summary"},{id:"documents",title:"Documents",instanceId:"ppcbw-documents-1",region:"ppcbw-documents-1",dataCol:"13",dataMaxSizeX:12,dataMaxSizeY:12,dataMinSizeX:8,dataMinSizeY:4,dataRow:"7",dataSizeX:"8",dataSizeY:"6",filterName:"Filtered Preprocedure",viewType:"expanded",maximizeScreen:"documents-list"},{id:"lab_results_grid",title:"Numeric Lab Results",instanceId:"ppcbw-lab_results_grid-1",region:"ppcbw-lab_results_grid-1",dataCol:"9",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"1",dataSizeX:"4",dataSizeY:"6",filterName:"Filtered Preprocedure",maximizeScreen:"lab-results-grid-full",viewType:"gist"},{id:"problems",title:"Conditions",instanceId:"ppcbw-problems-1",region:"ppcbw-problems-1",dataCol:"1",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"1",dataSizeX:"4",dataSizeY:"4",filterName:"Filtered Preprocedure",maximizeScreen:"problems-full",viewType:"gist"},{id:"newsfeed",title:"Timeline",instanceId:"ppcbw-newsfeed-1",region:"ppcbw-newsfeed-1",dataCol:"1",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"5",dataSizeX:"4",dataSizeY:"4",filterName:"Filtered Preprocedure",viewType:"summary",maximizeScreen:"news-feed"},{id:"vitals",title:"Vitals",instanceId:"ppcbw-vitals-1",region:"ppcbw-vitals-1",dataCol:"5",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"1",dataSizeX:"4",dataSizeY:"6",filterName:"Filtered Preprocedure",maximizeScreen:"vitals-full",viewType:"gist"},{id:"orders",title:"Orders",instanceId:"ppcbw-orders-1",region:"ppcbw-orders-1",dataCol:"13",dataMaxSizeX:8,dataMaxSizeY:12,dataMinSizeX:4,dataMinSizeY:4,dataRow:"1",dataSizeX:"8",dataSizeY:"6",filterName:"Filtered Preprocedure",maximizeScreen:"orders-full",viewType:"summary"},{id:"medication_review_v2",title:"Medications Review",instanceId:"ppcbw-medication_review_v2-1",region:"ppcbw-medication_review_v2-1",dataCol:"5",dataMaxSizeX:12,dataMaxSizeY:12,dataMinSizeX:8,dataMinSizeY:4,dataRow:"7",dataSizeX:"8",dataSizeY:"6",filterName:"Filtered Preprocedure",viewType:"expanded",maximizeScreen:"medication-review"}],onResultClicked:function(e){var a=e.uid.split(":")[2],t=i[a],d=$.Deferred();if(t){if(!e.suppressModal){var r=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});r.show()}var n=ADK.Messaging.getChannel(t),l=n.request("detailView",e);l.done(function(a){if(e.suppressModal)d.resolve({view:a.view});else{var i=new ADK.UI.Modal({view:a.view,options:{size:"large",title:a.title}});i.show(),d.resolve()}}),l.fail(function(e){d.reject(e)})}else{var s=new DefaultDetailView;if(e.suppressModal)d.resolve({view:s});else{var o=new ADK.UI.Modal({view:new DefaultDetailView,options:{size:"large",title:"Detail - Placeholder"}});o.show(),d.resolve()}}return d.promise()},onStart:function(){a.setUpEvents(),e.setUpEvents();var i=ADK.Messaging.getChannel("activeMeds");i.on("detailView",this.onResultClicked)},onStop:function(){var a=ADK.Messaging.getChannel("activeMeds");a.off("detailView",this.onResultClicked),e.turnOffEvents()},patientRequired:!0};return t});