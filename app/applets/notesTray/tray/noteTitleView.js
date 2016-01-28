define(["backbone","marionette","underscore","api/Messaging","hbs!app/applets/notesTray/tray/noteTitleTemplate","app/applets/notesTray/tray/notesCollectionHandler"],function(e,t,n,a,i,o){"use strict";var s=e.Marionette.ItemView.extend({template:i,tagName:"li",events:{keyup:"selectNote",mousedown:"selectNoteChangeFocus",mouseup:"selectNote"},initialize:function(){this.$el.attr("data-uid",this.model.get("uid"));var e=this.model.get("displayGroup")+"-note-list-item-"+this.model.get("uid");$(this.el).attr("id",e)},templateHelpers:function(e){var t=this.model;return{editable:function(){return"UNSIGNED"===t.get("status")&&"ehmp"===t.get("app")},formattedReferenceDate:function(){var e=moment(t.get("referenceDateTime"),"YYYYMMDDHHmmssSSS").isValid();return e?moment(t.get("referenceDateTime"),"YYYYMMDDHHmmssSSS").format("MM/DD/YYYY - HH:mm"):""}}},selectNoteChangeFocus:function(e){e.preventDefault()},selectNote:function(e){e.preventDefault()}});return s});