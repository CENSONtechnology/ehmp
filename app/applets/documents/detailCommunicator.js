define(["app/applets/documents/appletHelper","app/applets/documents/docDetailsDisplayer","app/applets/documents/debugFlag"],function(e,t,i){var n={initialize:function(n){var o=ADK.Messaging.getChannel(n);o.reply("detailView",function(n){var o=(n.patient.icn||n.patient.pid,$.Deferred()),c={criteria:{filter:'or(eq("uid","'+n.uid+'"),eq("results[].uid","'+n.uid+'"))'},patient:new Backbone.Model({icn:n.patient.icn,pid:n.patient.pid}),resourceTitle:"patient-record-document-view",viewModel:{parse:e.parseDocResponse},cache:!0},r=ADK.PatientRecordService.fetchCollection(c);return r.on("sync",function(){var c=r.first();if(c){var a=c.get("kind"),d=e.getResultsFromUid(c),s=e.getChildDocs(c),l=t.getView(c,a,d,s);l.done(function(e){e.title=e.title||t.getTitle(c,a),o.resolve(e)}),l.fail(function(e){o.reject(e)})}else{i&&console.log('document "'+n.uid+'" not found in documents-view, checking in uid resource');var u={criteria:{uid:n.uid},patient:new Backbone.Model({icn:n.patient.icn,pid:n.patient.pid}),resourceTitle:"uid",viewModel:{parse:e.parseDocResponse},cache:!0};u.onSuccess=function(i){var n=i.first(),c=n.get("kind"),r=e.getResultsFromUid(n),a=e.getChildDocs(n),d=t.getView(n,c,r,a);d.done(function(e){e.title=e.title||t.getTitle(n,c),o.resolve(e)}),d.fail(function(e){o.reject(e)})},u.onError=function(e,t){o.reject('Unable to fetch document with uid "'+n.uid+'": '+t.statusText)},ADK.PatientRecordService.fetchCollection(u)}},this),o.promise()})}};return n});