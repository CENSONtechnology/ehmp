define(["app/applets/add_nonVA_med/utils/searchUtil"],function(e){"use strict";var r,i,o,n=!0,t=0,c={resourceTitle:"med-op-data-searchlist",criteria:{},onError:function(r,i){e.enableLoadingIndicator(!1),a.showError(i.responseText),this.enableScrolling=!0},onSuccess:function(i){n=!1,r.collection.add(i.toJSON()),e.enableLoadingIndicator(!1),setTimeout(function(){n=!0},500)}},a={fetchOptions:c,setView:function(e){r=e.medsView,i=e.errorView,o=e.medsSearchError},getView:function(){return r},showError:function(e){i&&(i.addError(e),o.show(i))},handleScroll:function(){if(n){var r=$("#med-results-inner-container").height(),o=$("#search-scroll").scrollTop(),a=$("#search-scroll").height(),s=o+a,l=10;if(o>t&&s+l>=r){var d={count:"40"};d.search=$("#meds-ul li:last-child a:last-child").text(),c.criteria.param=JSON.stringify(d),n=!1,ADK.ResourceService.fetchCollection(c),e.enableLoadingIndicator(!0),i&&i.clearErrors()}t=o}}};return a});