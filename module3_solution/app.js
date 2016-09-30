(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController ', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var x = this;
}

function MenuSearchService() {
  var service = this;
  service.getMatchedMenuItems(searchTerm) = function () {
    var matchedMenuItemsList = $http({
        method: "GET",
        url: ('https://davids-restaurant.herokuapp.com/menu_items.json'))
        .then(function (result) {
            // process result and only keep items that match
            var foundItems = "";
            console.log(result);
            // return processed items
            return foundItems;
        })
        .catch(function (error) {
            console.log(error);
        })
    });
    return matchedMenuItemsList;
  };
}

})();
