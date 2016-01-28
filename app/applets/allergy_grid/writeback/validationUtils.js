define([],function(){var e={validateModel:function(e){var t;return e.errorModel.clear(),t=this.validateSignsSymptoms(this.getSelectedSignsSymptoms(e.get("signsSymptoms"))),t&&e.errorModel.set({signsSymptoms:t}),t=this.validateAllergyType(e.get("allergyType"),this.getSelectedSignsSymptoms(e.get("signsSymptoms"))),t&&e.errorModel.set({allergyType:t}),t=this.validateReactionDate(e.get("reaction-date")),t&&e.errorModel.set({"reaction-date":t}),t=this.validateReactionTime(e.get("reaction-date"),e.get("reaction-time")),t&&e.errorModel.set({"reaction-time":t}),_.isEmpty(e.errorModel.toJSON())?void 0:"Validation errors. Please fix."},getSelectedSignsSymptoms:function(e){return _.where(e,{booleanValue:!0})},validateSignsSymptoms:function(e){var t,i=this;return _.each(e,function(e){var r=e[e.id+"-symptom-date"],a=e[e.id+"-symptom-time"];r?i.isFutureDateTime(r,a)&&(t="Selected Symptom Date/Time must be in the past."):a&&(t="Selected Symptom Date is required with Time.")}),t},validateAllergyType:function(e,t){var i;return"o"!==e||t||(i="A Symptom must be selected when Allergy Type is Observed."),i},isFutureDateTime:function(e,t){var i=!1;if(e){var r=moment(),a=t?moment(e+" "+t,"MM/DD/YYYY hh:mm a"):moment(e,"MM/DD/YYYY");a.isAfter(r)&&(i=!0)}return i},validateReactionDate:function(e){var t;return this.isFutureDateTime(e)&&(t="Reaction Date/Time must be in the past."),t},validateReactionTime:function(e,t){var i;return e?t&&this.isFutureDateTime(e,t)&&(i="Reaction Date/Time must be in the past."):t&&(i="Reaction Date is required with Time."),i}};return e});