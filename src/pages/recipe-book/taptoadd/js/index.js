var app = angular.module('myApp', []);

// controller
app.controller('mainCtrl', function($scope) {
  $scope.items = [];
  for (var i=0; i<100; ++i) {
    $scope.items.push({ id: i});
  }

  $scope.click = function(id) {
    $scope.items[id].selected = !$scope.items[id].selected;
  };
});