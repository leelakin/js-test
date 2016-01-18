'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', ['$scope', 'MenuService', function ($scope, MenuService) {
		$scope.menu = {};
    MenuService.get('/data/menu.json').success(function(data) {
	  //$scope.menu = data;
	  //console.log(data.meals[0].tags);
	  
		var menuobj = data;
	  for (var i=0; i<menuobj.meals.length; i++){
	  	//create alternative array within every meals loop
			menuobj.meals[i].othertags = []; 
			//loop through every tag of each meal
	  	for (var j=0, tagz=menuobj.meals[i].tags; j<tagz.length; j++){
	  		//if tag starts with a hash, push into alternative array
				
	  		if (tagz[j].charAt(0)==="#"){
	  			var splicedtag = (tagz.splice(j,1))[0];

	  			menuobj.meals[i].othertags.push(splicedtag);
	  			//adjust array index after splice
	  			j = j-1;
	  		}
	  	}
	  };
	  $scope.menu = menuobj;

	  $scope.totalPrice = 0;
	  $scope.mainCount = 0;
	  $scope.basket = function(meal){
	  	console.log("basket " + meal);
	  	var $basket = $(".basketbox");
	  	//check whether basket is still hidden - if yes, show it
	  	if(!$basket.hasClass("basketon")){
		  	$basket.show().addClass("basketon");
		  	$(".header").find(".first").hide();
		  };
	  	//add meal.name to dropdown and meal.price to total
		  $scope.mainCount += 1;
		  $scope.totalPrice += +meal.price;
		 	//insert new values
		 	$basket.find(".counthere").text($scope.mainCount);
		 	$basket.find(".pricehere").text(($scope.totalPrice).toFixed(2));
	  };

	});

  }
]);
