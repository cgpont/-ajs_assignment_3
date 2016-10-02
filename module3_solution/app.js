(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiUrl', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItemsList.html',
    scope: {
      matchedItems: '<',
      onRemove: '&',
      displayError: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'itemsList',
    bindToController: true,
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.searchTerm = '';
  controller.matchedItems = [];
  controller.displayError = false;
  controller.narrowItDown = function(){
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then(function(response){
        if (response.length == 0){
          controller.displayError = true;
        } else {
          controller.matchedItems = response;
          controller.displayError = false;
        }
      })
      .catch(function(error){
        console.log('There was an error: ' + error);
        controller.displayError = true;
      })
  };
  controller.removeItem = function(index){
      controller.matchedItems.splice(index, 1)
  };
}

MenuSearchService.$inject = ['$http', 'ApiUrl', '$filter'];
function MenuSearchService($http, ApiUrl){
  var service = this;
  service.getMatchedMenuItems = function(searchTerm){
    return $http({
        method: "GET",
        url: (ApiUrl)
      })
      .then(function(result){
          // process result and only keep items that match
          var allMenuItemsObtained = result.data.menu_items;
          var matchedMenuItemsList = [];
          for (var i=0; i<allMenuItemsObtained.length; i++){
              if(allMenuItemsObtained[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
                  matchedMenuItemsList.push(allMenuItemsObtained[i]);
              }
          }
          // return processed items
          return matchedMenuItemsList;
      })
      .catch(function(error) {
          console.log('There was an error: ' + error);
      });
    };
}

})();
