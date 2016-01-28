define(["backbone","marionette","underscore","moment"],function(e,t,n,r){"use strict";var i={};return i.parseExposure=function(e){var t="";return e.forEach(function(e){var n=e.uid.split(":");"Y"==n[3]&&(""!==t&&(t+="; "),t+=n[2])}),t&&""!==t.trim()||(t="No exposures"),t},i.toTitleCase=function(e){return e?e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}):""},i.getStandardizedDescription=function(e){return e.codes&&e.codes.forEach(function(t){-1!=t.system.indexOf("http://snomed.info/sct")&&(e.standardizedDescription=t.display,e.snomedCode=t.code)}),e},i.getStatusName=function(e){return e.statusName&&(e.statusName=this.toTitleCase(e.statusName)),e},i.getServiceConnected=function(e){return void 0!==e.serviceConnected?e.serviceConnected===!0?e.serviceConnectedDisp="Yes":e.serviceConnectedDisp="No":e.serviceConnectedDisp="",e},i.getProblemText=function(e){if(e.problemText){var t=e.problemText.indexOf("(ICD-9");t>0&&(e.problemText=e.problemText.substring(0,t).trim());var n=e.problemText.indexOf("(SCT");n>0&&(e.problemText=e.problemText.substring(0,n).trim())}return e},i.getICDCode=function(e){return e.icdCode&&(e.icdCode=e.icdCode.replace("urn:icd:","")),e},i.getICDName=function(e){return e.icdName?e.icdName=e.icdName:e.icdName=e.problemText,e},i.getProblemGroupByData=function(e){var t,n;return e.get("standardizedDescription")?(n="standardizedDescription",t=e.get(n)):(n="problemText",t=e.get(n)),{groupbyValue:t,groupbyField:n}},i.getAcuityName=function(e){return e.acuityName?(e.acuityName=this.toTitleCase(e.acuityName),"Chronic"==e.acuityName?e.chronic=!0:"Moderate"==e.acuityName&&(e.moderate=!0)):e.acuityName="Unknown",e},i.getFacilityColor=function(e){return e.facilityCode&&"DOD"==e.facilityCode?e.facilityColor="DOD":e.facilityColor="nonDOD",e},i.getCommentBubble=function(e){return e.comments&&e.comments.length>0&&(e.commentBubble=!0),e},i.sortDate=function(e,t){var n=new Date(e.dateTime),r=new Date(t.dateTime);return-1*(n-r)},i.sortData=function(e){e.problemGroup.get("allGroupedEncounters").sort(function(e,t){return i.sortDate(e,t)})},i.compare=function(e,t){return e-t},i.getTimeSince=function(e){var t;e.encounters?(e.encounters.sort(function(e,t){return i.sortDate(e,t)}),t=e.encounters[0].dateTime):t=e.entered||e.updated;var n=ADK.utils.getTimeSince(t);return e.timeSince=n.timeSince,e.timeSinceText=n.timeSinceDescription,e.timeSinceDateString=t,e.timeSinceDate=r(t,"YYYYMMDD"),e},i});