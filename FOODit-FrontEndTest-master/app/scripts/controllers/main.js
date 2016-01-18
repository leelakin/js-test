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
	  $scope.menu = data;
	  //console.log(data.meals[0].tags);
	  
		var menuobj = data;
	  for (var i=0; i<menuobj.meals.length; i++){
	  	//create alternative array within every meals loop
			menuobj.meals[i].othertags = []; 
			//loop through every tag of each meal
	  	for (var j=0, tagz=menuobj.meals[i].tags; j<tagz.length; j++){
	  		//if tag starts with a hash, push into alternative array
				
	  		console.log("tag array before splicing: " + tagz);
	  		if (tagz[j].charAt(0)==="#"){
	  			var splicedtag = (tagz.splice(j,1))[0];

	  			menuobj.meals[i].othertags.push(splicedtag);
	  			//adjust array index after splice
	  			j = j-1;
	  		}
	  	}
	  	//check arrays of this round
	  	console.log("tags array: " + menuobj.meals[i].tags);
	  	console.log("othertags array: " + menuobj.meals[i].othertags);
	  	console.log("meal loop done.");	  	
	  };
	  $scope.menu = menuobj;
	  

	});

  }
]);
