define(["backbone","marionette","hbs!app/applets/addOrder/templates/orderTypeTemplate"],function(e,t,r){"use strict";var i;return i=e.Marionette.ItemView.extend({template:r,initialize:function(e){this.options=e},events:{"click a":"chooseAMedType"},chooseAMedType:function(e){e.preventDefault();var t=$(e.currentTarget).attr("id"),r=$(e.currentTarget).text()+" Order";this.model.set("orderType",t),this.model.set("orderTypeText",r)}})});