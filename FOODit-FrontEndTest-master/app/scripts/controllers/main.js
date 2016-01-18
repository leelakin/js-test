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

	  /*
		var menuobj = data;
	  for (var i=0; i<menuobj.meals.length; i++){
	  	//create alternative array within every meals loop
			var othertags = []; 
			//loop through every tag of each meal
	  	for (var j=0, tagz=menuobj.meals[i].tags; j<tagz.length; j++){
	  		//if tag starts with a hash, push into alternative array
	  		if (tagz[i].charAt(0)==="#"){
	  			othertags.push((tagz.splice(i,1))[0])//[0] bc returns array?
	  		}
	  	}
	  	//log arrays of 1st meal to check contents
	  	console.log("tags array: " + menuobj.meals[0].tags);
	  	console.log("othertags array: " + menuobj.meals[0].tags);	  	
	  };
	  */

	});

  }
]);
