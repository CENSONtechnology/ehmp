define(["underscore","jquery","backbone","marionette","highcharts","hbs!app/applets/encounters/templets/itemList","hbs!app/applets/encounters/templets/item","hbs!app/applets/encounters/templets/empty","hbs!app/applets/encounters/templets/wrong","app/applets/encounters/appConfig","app/applets/encounters/appUtil","app/applets/encounters/gistConfig"],function(t,e,i,n,o,s,r,a,l,c,h,g){"use strict";function p(t){u&&console.log("Custom filter---->>"+t),ADK.Messaging.getChannel("encounters_internal").trigger("filter_collection",t)}function d(t){u&&console.log("Custom filter---->>clear"),ADK.Messaging.getChannel("encounters_internal").trigger("clear_filter",t)}var u=c.debug,f={gistChartOptions:{global:{useUTC:!1,timezoneOffset:300},chart:{animation:!0,zoomType:"",type:"column",spacing:[1,1,1,1],backgroundColor:"#F2F2F2",events:{click:function(t){e(t.target).closest("[data-toggle=popover]").trigger("click")}}},credits:{enabled:!1},legend:{enabled:!1},title:{text:""},tooltip:{enabled:!1,hideDelay:10,borderWidth:1,formatter:function(){return this.point.plotX}},plotOptions:{series:{cursor:"pointer",pointWidth:5,pointInterval:2592e6,enableMouseTracking:!1},column:{grouping:!1,shadow:!1}},xAxis:{labels:{enabled:!1,style:{color:"red",fontSize:8}},type:"datetime",tickWidth:0,startOnTick:!1,endOnTick:!1,plotLines:[{color:"#F20000",value:h.nowChart(),dashStyle:"solid",width:2,zIndex:5}]},yAxis:[{labels:{enabled:!1},lineWidth:1,title:{enabled:!1,text:"y Value"}},{lineWidth:1,opposite:!0,title:{enabled:!1,text:"y Value"}}],series:[{data:[],type:"column",name:"",pointRange:2592e6,color:"rgb(124, 181, 236)"},{data:[],type:"column",color:"#406E7B",name:"now",pointRange:2592e6}]}},m={setPopover:function(t){t.$el.find(".has-popover").popup({trigger:"click",html:"true",container:"body",template:'<div class="popover popover-custom" style="max-width:100%" role="tooltip"> <div style="font-size:12px;padding:5px 5px;" class="popover-title"></div><div class="popover-content"></div></div>',placement:"bottom"})},reflowHChart:function(i){u&&console.log("Enc Gist sub gist ----->> reflow chart"),e(".gChartMin",i.target).each(function(){t.isUndefined(e(this).highcharts())||e(this).highcharts().reflow()})},showChart:function(t){u&&console.log("Show Enc Gist showChart ----->> show gist item"),t.gistOptions.gistChartOptions.series[0].data=[],t.gistOptions.gistChartOptions.series[0].name="",t.gistOptions.gistChartOptions.series[1].data=[],t.gistOptions.gistChartOptions.xAxis.plotLines[0].width=0,t.gistOptions.gistChartOptions.yAxis[0].max=null;var e,i=null;return t.model.get("processed")&&(u&&console.log(t.model.get("kind")),t.gistOptions.gistChartOptions.series[0].name=t.model.get("kind"),e=0,t.model.get("empty")&&(t.gistOptions.gistChartOptions.yAxis[0].max=10),t.gistOptions.gistChartOptions.series[1].data.push([h.convertChartDate(t.model.get("firstEvent")),0]),moment(h.nowChart()).isBefore(h.convertChartDate(t.model.get("maxChart")))&&moment(h.nowChart()).isAfter(h.convertChartDate(t.model.get("firstEvent")))&&(t.gistOptions.gistChartOptions.xAxis.plotLines[0].width=2),t.gistOptions.gistChartOptions.series[1].data.push([h.convertChartDate(t.model.get("maxChart")),0]),u&&(console.log("Enc Gist series[0] max value ----->> "+(e+1)),console.log(t.model.get("firstEvent")),console.log(t.model.get("maxChart"))),t.gistOptions.gistChartOptions.plotOptions.column.cropThreshold=t.model.get("count"),i=t.$el.find("#encounter-chart-container-"+t.model.get("elKind")),i.highcharts(t.gistOptions.gistChartOptions),t.$el.find(".highcharts-background").attr("fill","rgba(0,0,0,0)")),i},chartReflow:function(t){var e,i;i="undefined"!=typeof t.model?t.model:t,e=i.get("subKind")?"#encounter-chart-subcontainer-"+i.get("elKind")+"-"+i.get("elSubKind"):"#encounter-chart-container-"+i.get("elKind"),"undefined"!=typeof t.$(e).highcharts()&&t.$(e).highcharts().reflow()},binning_normal_function:function(t){return Math.log((t*t*t+1)/.1)},chartDataBinning:function(t){var i=t.model,n=[],o={},s={barPadding:6,normal_function:this.binning_normal_function,debug:!1};if(!i.get("empty")){var r="#encounter-chart-container-"+i.get("elKind"),a=e(r).width();s.chartWidth=a,"undefined"!=typeof e(r).highcharts()&&(o.series=i.get("chartData"),o.isDuration=i.get("isDuration")||!1,o.oldestDate=h.convertChartDate(i.get("firstEvent")),o.newestDate=h.convertChartDate(i.get("maxChart")),n=ADK.utils.chartDataBinning(o,s),t.$(r).highcharts().series[0].setData(n))}}},C=i.Marionette.ItemView.extend({template:a}),w=i.Marionette.CompositeView.extend({className:"encGistItem",template:r,gistOptions:f,childViewContainer:".gistSubList",chartPointer:null,initialize:function(){u&&console.log("initialize ----->> iItem"),this.collection=this.model.get("node")},buildChildView:function(e,i,n){if(t.isUndefined(e.get("kind")))return l;var o={appletConfig:{gistSubName:e.get("kind"),instanceId:window.appletConfig.instanceId,id:window.appletConfig.id},showInfoButton:window.showInfoButton,gistHeaders:g.gistHeaders[e.get("kind").toLowerCase()],gistModel:g.gistModel,collection:e.get("collection"),binningOptions:{barPadding:6,normal_function:m.binning_normal_function,debug:!1}};return ADK.Views.EventGist.create(o)},events:{"click .left-side":"onClickLeftSide","click .right-side":"onClickRightSide"},caretStatus:!1,caretOn:function(){this.$el.find("#caret").attr("class","caret")},caretOff:function(){this.$el.find("#caret").attr("class","right-caret")},caretSwitch:function(){var t=this.$el.find("#caret").attr("arrowPosition");"right"===t?(this.$el.find("#caret").attr("arrowPosition","down"),this.$el.find("#caret").attr("class","caret")):"down"===t&&(this.$el.find("#caret").attr("arrowPosition","right"),this.$el.find("#caret").attr("class","right-caret"))},onClickRightSide:function(t){u&&console.log(this.model.get("kind")+"-top-right-side"),t.preventDefault(),t.stopImmediatePropagation()},onClickLeftSide:function(t){t.preventDefault(),t.stopImmediatePropagation(),e("[data-toggle=popover]").popover("hide"),u&&console.log(this.model.get("kind")+"-top-left-side"),this.model.get("empty")||(e("#subpanel--"+this.model.get("elKind")).collapse("toggle"),this.caretSwitch())},onRender:function(){u&&console.log("onRender ----->> iItem"),this.chartPointer=m.showChart(this),m.setPopover(this),u&&console.log(this.model.get("kind"))},onDomRefresh:function(){u&&console.log("onDomRefresh ----->> iItem"),m.chartDataBinning(this),m.chartReflow(this)},onBeforeDestroy:function(){if(this.chartPointer){var t=this.chartPointer.highcharts();t&&t.destroy()}}}),b=i.Marionette.CompositeView.extend({template:s,emptyView:C,childView:w,childViewContainer:".encGistList",gistOptions:f,initialize:function(t){this.collection=t.collection,this.maximizeScreen=t.appletConfig.maximizeScreen,this._super=i.Marionette.CompositeView.prototype,this._super.initialize.apply(this,arguments),this.listenTo(this.collection,"customfilter",p),this.listenTo(this.collection,"clear_customfilter",d),this.listenTo(this.collection,"reset",function(){u&&console.log("EncGist ----->> Collection reset -->>GistView"),u&&console.log(this.collection)})},onShow:function(){u&&console.log("Show Enc Gist onShow ----->>"),this.$("#panel-encGist").on("shown.bs.collapse",m.reflowHChart)},onBeforeDestroy:function(){u&&console.log("Enc Gist onBeforeDestroy ----->>"),this.collection.off("customfilter",p,this),this.collection.off("clear_customfilter",d,this)},onDestroy:function(){this.$("#panel-encGist").off()}});return b});