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

	  var $basket = $(".basketbox");
	  var $bascontent = $basket.closest(".header").find(".basketcontent");
	  $scope.totalPrice = 0;
	  $scope.mainCount = 0;
	  $scope.basket = function(meal){
	  	console.log("basket " + meal);
	  	//check whether basket is still hidden - if yes, show it
	  	if(!$basket.hasClass("basketon")){
		  	$basket.show().addClass("basketon");
		  	$(".header").find(".first").hide();
		  };
	  	//add meal.price to total
		  $scope.mainCount += 1;
		  $scope.totalPrice += +meal.price;
		 	//insert new values
		 	$basket.find(".counthere").text($scope.mainCount);
		 	$basket.find(".pricehere").text(($scope.totalPrice).toFixed(2));
		 	//add meal.name to dropdown
		 	var $newmeal = $("<p class=\"mealitem\">" +meal.name+ " || £" + meal.price+ "</p>");
		 	$bascontent.append($newmeal);
	  };
	  $scope.basketToggle = function(){
	  	console.log("enter basketToggle function");
	  	if(!$bascontent.hasClass("basketlist_open")){
	  		$bascontent.addClass("basketlist_open").slideDown();
	  		console.log("now has basketlist_open tag? " + $basket.hasClass("basketlist_open"));
	  		$basket.find(".mainscount").hide();
	  		$basket.find(".btn").show();
	  	}else{
	  		$bascontent.removeClass("basketlist_open").slideUp();
	  		console.log("now has basketlist_open tag? " + $basket.hasClass("basketlist_open"));
	  		$basket.find(".mainscount").show();
	  		$basket.find(".btn").hide();
	  	}
	  }

	});

  }
]);
