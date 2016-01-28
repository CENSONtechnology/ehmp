define(["backbone","marionette","jquery","handlebars","app/applets/notesTray/tray/notesCollectionHandler","app/applets/notesTray/writeback/model","app/applets/notesTray/writeback/formFields","app/applets/notesTray/writeback/modelUtil","app/applets/notesTray/writeback/errorView","app/applets/notesTray/operations/operationConfirmationView"],function(e,t,i,o,s,n,a,l,d,r){var c,h=!1,m={fSign:!1,fClose:!1,fAuto:!1,fCancel:!1},u=6e4,f=ADK.Messaging.getChannel("notesTray"),g=!1,v=ADK.UI.Form.extend({fields:a.getForm(!0),events:{"mouseup #close-form-btn":"resetFocus","mousedown #actions-note-form-btn":"resetFocus","mouseup #actions-note-form-btn":"toggleDropdown","click .dropdown .dropdown-menu li":"toggleDropdown",submit:function(e){e.preventDefault(),h&&console.log("NOTES--->> sign Note"),this.onSaveSignForm(e,this)},"click #close-form-btn":function(e){e.preventDefault(),h&&console.log("NOTES--->> close Note"),this.onCloseForm(e,this,!0)},"click #cancel-form-btn":function(e){e.preventDefault(),h&&console.log("NOTES--->> cancel Note"),this.onCancelForm(e,this)},"keydown #text-0-content":function(e){this.signValidator.validateText(this.$el.find("#text-0-content").val()),this.setSignStatus(this.signValidator.validateForm()),this.setDataChangeStatus(!0)},"mouseover  #text-0-content":function(e){this.signValidator.validateText(this.$el.find("#text-0-content").val()),this.setSignStatus(this.signValidator.validateForm())},"change #documentDefUidUnique":function(e){this.addTitle(),this.signValidator.validateTitle(this.$el.find("#documentDefUidUnique").val()),this.setSignStatus(this.signValidator.validateForm()),this.setDataChangeStatus(!0)},"change #derivReferenceDate":function(e){this.signValidator.validateDate(this.$el.find("#derivReferenceDate").val()),this.setSignStatus(this.signValidator.validateForm()),this.setDataChangeStatus(!0)},"change #derivReferenceTime":function(e){this.signValidator.validateTime(this.$el.find("#derivReferenceTime").val()),this.setSignStatus(this.signValidator.validateForm()),this.setDataChangeStatus(!0)},"click #delete-form-btn":"deleteNote"},initialize:function(){this._super=ADK.UI.Form.prototype,this._super.initialize.apply(this,arguments),h&&console.log("initialize ----->> notesFormView");var e=this;_.isUndefined(this.model)||"true"===this.model.get("add")?(this.model=new n({derivReferenceDate:moment().format("MM/DD/YYYY"),derivReferenceTime:moment().format("HH:mm")}),ADK.PatientRecordService.getCurrentPatient().get("visit")?this.startAutosave():f.on("visit:ready",function(t){e.updateVisit(),e.startAutosave()})):(this.originalModel=new n(JSON.parse(JSON.stringify(this.model))),this.model=this.parseModel(this.model),this.model.set("deriv_isEditForm",!0),this.startAutosave(),c=this.checkModelSignReady(this.model)),this.dataChangeStatus=!1,this.isAutosaved=!1,this.buttonsDisabled=!1,f.on("preview-note-action-btn",this.showPreview,this),f.on("close-note-action-btn",this.onClickActionButton_Close,this),f.on("cancel:saveOriginalNote",this.onSaveOriginalNote,this),f.on("cancel:deleteAutosavedNote",this.onDeleteAutosavedNote,this)},resetFocus:function(e){e.preventDefault(),i("#notes-tray").focus()},toggleDropdown:function(e){e.preventDefault(),e.stopPropagation(),this.$(".dropdown").toggleClass("open")},addTitle:function(){var e=this.$("#documentDefUidUnique").val(),t=e.substring(0,e.indexOf("_"));this.model.set("documentDefUid",t),this.model.set("localTitle",this.$("#documentDefUidUnique").find(":selected").text()),this.enableText()},onClickActionButton:function(e){e.preventDefault(),e.stopPropagation()},onClickActionButton_Close:function(e){h&&console.log("form action button ----->> close");var t=!0;this.onCloseForm(e,this,t)},onClickActionButton_Save:function(e){h&&console.log("form action button ----->> save");var t=!1;this.onCloseForm(e,this,t)},showPreview:function(){h&&console.log("showPreview ----->> notesFormView");var e=this.model.clone(),t=this.$("#documentDefUidUnique").find(":selected").val(),i=t.substring(0,t.indexOf("_"));e.set("localTitle",this.$("#documentDefUidUnique").find(":selected").text()),e.set("documentDefUid",i),e.set("previewSource","form"),l.formatTextContent(e);var o=null;if(e.get("derivReferenceDate")){var s=e.get("derivReferenceDate")+" "+e.get("derivReferenceTime");o=moment(s,"MM/DD/YYYY HH:mm").format("YYYYMMDDHHmmss")}e.set("referenceDateTime",o),f.trigger("show:preview",e)},onRender:function(){h&&console.log("onRender ----->> notesFormView");_.isUndefined(this.model.id)?(this.model.set("lastSavedDisplayTime",null),this.$("#delete-form-btn").addClass("hidden")):(this.model.set("lastSavedDisplayTime",this.model.get("lastSavedTime")||this.model.get("lastUpdateTime")),this.$("#cancel-form-btn").addClass("hidden")),this.showTitlesLoading(),l.fetchTitles(this,_.bind(this.updateForm,this),_.bind(this.hideTitlesLoading,this),_.bind(this.showTitleError,this))},onShow:function(){if(h&&console.log("onShow ----->> notesFormView"),_.isUndefined(this.model.id))this.signValidator.newNotePreset(),this.setSignStatus(!1);else{var e=this.model.get("documentDefUidUnique");this.$el.find("#documentDefUidUnique").val(e),this.setSignStatus(this.isModelSignReady)}this.enableText()},enableText:function(){this.model.get("localTitle")?this.$el.find("#text-0-content").trigger("control:disabled",!1):this.$el.find("#text-0-content").trigger("control:disabled",!0)},parseModel:function(e){if(h&&console.log("parseModel ----->> notesFormView"),_.isUndefined(e.get("referenceDateTime"))||(e.set("derivReferenceDate",moment(e.get("referenceDateTime"),"YYYYMMDDHHmmssSSS").format("MM/DD/YYYY")),e.set("derivReferenceTime",moment(e.get("referenceDateTime"),"YYYYMMDDHHmmssSSS").format("HH:mm"))),!_.isUndefined(e.get("text"))){var t="",i=e.get("text");_.each(i,function(e){_.isUndefined(e.content)||(t+=e.content)}),e.set("derivBody",t)}return this.model=e=new n(e.toJSON()),e},checkModelSignReady:function(e){if(!_.isUndefined(e)){if(this.signValidator.validateDateTime(e.get("derivReferenceTime")),this.signValidator.validateTitle(e.get("documentDefUidUnique")),!_.isUndefined(e.get("text"))){var t="",i=e.get("text");_.each(i,function(e){_.isUndefined(e.content)||(t+=e.content)}),this.signValidator.validateText(t)}return this.signValidator.validateForm()}return!1},setSignStatus:function(e){e&&!this.buttonsDisabled?this.$("#sign-form-btn").removeAttr("disabled"):this.$("#sign-form-btn").attr("disabled","disabled")},setDataChangeStatus:function(e){e?this.dataChangeStatus=!0:this.dataChangeStatus=!1},signValidator:{isTimeValid:!1,isDateValid:!1,isTextValid:!1,isTitleValid:!1,reset:function(){this.isTimeValid=!1,this.isDateValid=!1,this.isTextValid=!1,this.isTitleValid=!1},newNotePreset:function(){this.isTimeValid=!0,this.isDateValid=!0,this.isTextValid=!1,this.isTitleValid=!0},validateText:function(e){this.isTextValid=!1,_.isUndefined(e)||e.length>1&&(this.isTextValid=!0)},validateTitle:function(e){this.isTitleValid=!1,_.isUndefined(e)||e&&e.length>1&&(this.isTitleValid=!0)},validateDate:function(e){this.isDateValid=!1,_.isUndefined(e)||e&&10===e.length&&(this.isDateValid=!0)},validateTime:function(e){this.isTimeValid=!1,_.isUndefined(e)||(console.log(e),5===e.length&&(this.isTimeValid=!0))},validateDateTime:function(e){this.isDateValid=!1,this.isTimeValid=!0,_.isUndefined(e)||"Invalid date"!==e&&null!==e&&""!==e&&(this.isDateValid=!0,this.isTimeValid=!0)},validateForm:function(){return this.isTimeValid&&this.isDateValid&&this.isTextValid&&this.isTitleValid}},updateForm:function(e,t){i("#documentDefUidUnique").trigger("control:picklist:set",[t]);var o=this.model.get("documentDefUidUnique");null!==o&&void 0!==o&&""!==o?(this.$el.find("#documentDefUidUnique").val(o),g=!0):this.$("#documentDefUidUnique").trigger("change")},showTitlesLoading:function(){0===this.$(".titles-loading-indicator").length&&this.$(".form-group.documentDefUidUnique label").after(i('<span class="title-loading-indicator"><i class="fa fa-spinner fa-spin"></i></span>')),this.$(".titles-loading-indicator").removeClass("hide")},hideTitlesLoading:function(){this.$(".title-loading-indicator").addClass("hide")},showTitleError:function(e){e=e.trim()+" Please reopen the form to try again.";var t=new ADK.UI.Notification({title:"Warning",message:e,type:"warning"});t.show()},validateSignForm:function(e){return e.model.errorModel.clear(),l.validateRequiredDate(e.model)&&l.validateRequiredTime(e.model)},validateCloseForm:function(e){return e.model.errorModel.clear(),l.validateTitle(e.model)&&l.validateDate(e.model)&&l.validateTime(e.model)},saveNote:function(e,t,i,o){this.disableButtons();var s=this,n=this.model.get("localId")?"/"+this.model.get("localId").replace("\n",""):"";this.model.url="/resource/write-health-data/patient/"+this.model.get("pid")+"/notes"+n,o||this.model.set("lastSavedTime",moment().format("YYYYMMDDHHmmss")),m={fSign:e,fClose:t,fAuto:i,fCancel:o},this.model.save(null,{error:function(e,i){var o={message:"There was an error saving your note. Please contact your System Administrator for assistance.",ok_callback:function(){h&&console.log("NOTES--->> ok callback, save note error"),m.fClose&&m.fAuto&&f.trigger("note:saved")}},n=new d(o);n.showModal(),t||s.enableButtons()},success:function(o,n){if(o.isNew()){o.set(n.data.notes);var a=o.get("localId");o.set({id:a,uid:a})}if(o.set("lastSavedDisplayTime",o.get("lastSavedTime")),t?setTimeout(function(){f.trigger("note:saved",o.get("uid"))},1e3):s.enableButtons(),h&&console.log("Successfully saved note."),f.trigger("notes:refresh-tray-btn"),!i){var l=new ADK.UI.Notification({title:"Success!",message:"Saved Successfully.",type:"success"});l.show()}e&&(h&&console.log("NOTES--->> sign note after save"),f.trigger("notes:sign",o))}})},updateVisit:function(){if(this.model.get("encounterUid"))return!0;var e=ADK.PatientRecordService.getCurrentPatient().get("visit");return e?(this.model.set("encounterName",e.locationDisplayName+e.formatteddateTime),this.model.set("encounterUid",e.localId),this.model.set("locationUid",e.locationUid),this.model.set("encounterDateTime",e.dateTime),this.model.set("facilityCode",e.facilityCode),this.model.set("facilityName",e.facilityName),this.model.set("facilityDisplay",e.facilityDisplay),this.model.set("facilityMoniker",e.facilityMoniker),!0):!1},autosaveNote:function(){var t=this;if(this.model.get("documentDefUid")){var i=this.$("#text-0-content").val(),s=this.model.get("text");s[0].content=i,this.model.set("text",s);var n=!1,a=!1,l=!0;this.isAutosaved=!0,this.saveNote(n,a,l)}else{var d=new ADK.UI.Alert({title:"Error",icon:"fa-exclamation-triangle",messageView:e.Marionette.ItemView.extend({template:o.compile("The auto-save will not occur until the title is set.")}),footerView:e.Marionette.ItemView.extend({template:o.compile('<button type="button" class="btn btn-primary ok-button" data-dismiss="modal">OK</button>'),events:{"click .ok-button":function(e){t.startAutosave()}}})});this.stopAutosave(),d.show()}},startAutosave:function(){this.autosaveTimer=setInterval(_.bind(this.autosaveNote,this),u)},stopAutosave:function(){clearInterval(this.autosaveTimer)},onCloseForm:function(e,t,o){h&&console.log("NOTES--->> onCloseForm");var s=(this.model.isValid({validationType:"close"}),this.validateCloseForm(t),Object.keys(t.model.errorModel.attributes));if(s.length){var n="#"+s[0];i(n).focus()}else this.saveNote(!1,o);return!1},onCancelForm:function(e,t){var i=!this.model.get("deriv_isEditForm"),o={message:"<h3>Are you sure you want to delete this note?</h3>",title:"Confirm Delete",title_icon:"fa-exclamation-triangle",yes_callback:function(){h&&console.log("NOTES--->> yes callback, close form"),ADK.UI.Workflow.hide()},no_callback:function(){h&&console.log("NOTES--->> no callback, close confirmation window ")}};if(!this.dataChangeStatus)return void ADK.UI.Workflow.hide();i&&this.dataChangeStatus&&(this.isAutosaved?o.yes_callback=function(){h&&console.log("NOTES--->> close new note form and delete autosaved note"),f.trigger("cancel:deleteAutosavedNote")}:o.yes_callback=function(){h&&console.log("NOTES--->> close new note form"),ADK.UI.Workflow.hide()}),!i&&this.dataChangeStatus&&(this.isAutosaved?o.yes_callback=function(){h&&console.log("NOTES--->> close edit note form and save original note"),f.trigger("cancel:saveOriginalNote"),ADK.UI.Workflow.hide()}:o.yes_callback=function(){h&&console.log("NOTES--->> close edit note form"),ADK.UI.Workflow.hide()});var s=new r(o);s.showModal()},onSaveOriginalNote:function(){this.model.set("text",this.originalModel.get("text")),this.model.set("localTitle",this.originalModel.get("localTitle")),this.model.set("documentDefUid",this.originalModel.get("documentDefUid")),this.model.set("documentDefUidUnique",this.originalModel.get("documentDefUidUnique")),this.model.set("summary",this.originalModel.get("summary")),this.model.set("derivReferenceDate",this.originalModel.get("derivReferenceDate")),this.model.set("derivReferenceTime",this.originalModel.get("derivReferenceTime")),this.model.set("lastSavedDisplayTime",this.originalModel.get("lastSavedDisplayTime")),this.model.set("lastSavedTime",this.originalModel.get("lastSavedTime"));var e=!1,t=!1,i=!0,o=!0;this.saveNote(e,t,i,o)},onDeleteAutosavedNote:function(){this.disableButtons(),f.trigger("note:delete",this.model,{silentOnSuccess:!0,successCallback:function(){ADK.UI.Workflow.hide()}})},deleteNote:function(){this.disableButtons(),f.trigger("note:promptDelete",this.model,{completeCallback:_.bind(this.enableButtons,this),successCallback:function(){ADK.UI.Workflow.hide()}})},onSaveSignForm:function(e,t){h&&console.log("NOTES--->> onSaveSignForm test");var o=(t.model.isValid({validationType:"sign"}),this.validateSignForm(t),Object.keys(t.model.errorModel.attributes));if(o.length){var s="#"+o[0];i(s).focus()}else{var n=!0,a=!0;this.saveNote(a,n)}return!1},disableButtons:function(){this.buttonsDisabled=!0,this.$("#close-form-btn").attr("disabled","disabled"),this.$("#sign-form-btn").attr("disabled","disabled"),this.$("#cancel-form-btn").attr("disabled","disabled"),this.$("#delete-form-btn").attr("disabled","disabled"),this.$("#close-note-action-btn").closest("li").attr("disabled","disabled")},enableButtons:function(){this.buttonsDisabled=!1,this.$("#close-form-btn").removeAttr("disabled"),this.$("#cancel-form-btn").removeAttr("disabled"),this.$("#delete-form-btn").removeAttr("disabled"),this.$("#close-note-action-btn").closest("li").removeAttr("disabled"),this.setSignStatus(this.signValidator.validateForm())},onDestroy:function(){this.stopAutosave(),this.signValidator.reset(),f.off("preview-note-action-btn"),f.off("close-note-action-btn"),f.off("cancel:saveOriginalNote"),f.off("cancel:deleteAutosavedNote"),f.off("visit:ready")}});return v});