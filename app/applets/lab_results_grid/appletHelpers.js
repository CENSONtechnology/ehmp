define(["backbone","underscore","moment"],function(e,t,a){"use strict";var r={getDateForChart:function(e){var t=e+"";return t=t.slice(0,12),t=t.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,"$1-$2-$3 $4:$5"),t=new a(t).format("MMM DD YYYY HH:mm")},updateChart:function(e,a){var n=a.pluck("observed");n=t.map(n,function(e){return r.getDateForChart(e)});var o=a.pluck("resultNumber");e.xAxis[0].setCategories(n),e.series[0].setData(o)},chartOptions:{chart:{type:"line",renderTo:"chart-container",zoomType:"x",panning:!0,panKey:"shift",events:{selection:function(e){}}},tooltip:{},title:{text:null},plotOptions:{series:{dataLabels:{}}},xAxis:{type:"datetime",dateTimeLabelFormats:{millisecond:"%b %d %Y",second:"%b %d %Y",minute:"%b %d %Y",hour:"%b %d %Y",day:"%b %d %Y",week:"%b %d %Y",month:"%b %d %Y",year:"%b %d %Y"}},yAxis:{title:{text:"Temperature (°C)"}},credits:!1,series:[{data:[],name:"Lab Result",showInLegend:!1}]},setTimeSince:function(e){if(void 0!==e&&""!==e){var t=moment(e,"YYYYMMDDHHmmssSSS"),a=moment(),r=moment.duration(a.diff(t)),n=parseFloat(r.asYears()),o=parseFloat(r.asDays()),s=parseFloat(r.asMonths()),i=parseFloat(r.asHours()),m=parseFloat(r.asMinutes());m>0&&60>m&&(i=1);var d="y",c="m",l="h",u="";return s>=24?u=Math.round(n)+d:24>s&&o>60?u=Math.round(s)+c:o>=2&&60>=o?u=Math.round(o)+c:2>o&&(u=Math.round(i)+l),u}},getNumericTime:function(e){if(void 0===e)return e;var t=e,a=/(\d+)/gi,r=t.match(a);switch(t=t.substr(t.length-1)){case"y":t=1==r?"year":"years";break;case"m":t=1==r?"month":"months";break;case"M":t=1==r?"month":"months";break;case"d":t=1==r?"month":"months";break;case"h":t=1==r?"day":"days"}return e=r+" "+t},parseLabResponse:function(e){var t=e.low,a=e.high;if(t&&a&&(e.referenceRange=t+"-"+a),e.interpretationCode){var r=e.interpretationCode.split(":").pop(),n="",o="label-danger";"HH"===r&&(r="H*",n="Critical High"),"LL"===r&&(r="L*",n="Critical Low"),"H"===r&&(n="Abnormal High",o="label-warning"),"L"===r&&(n="Abnormal Low",o="label-warning"),e.interpretationCode=r,e.flagTooltip=n,e.labelClass=o}if(e.categoryCode){var s=e.categoryCode.slice(e.categoryCode.lastIndexOf(":")+1);switch(s){case"EM":case"MI":case"SP":case"CY":case"AP":e.result="View Report",e.typeName||(e.typeName=e.categoryName),e.pathology=!0}}return e},getModalTitle:function(e){return e.get("typeName")+" - "+e.get("specimen")},getObservedFormatted:function(e){var t="";return e&&(t=moment(e,"YYYYMMDDHHmmssSSS").format("MM/DD/YYYY - HH:mm")),t}};return r});