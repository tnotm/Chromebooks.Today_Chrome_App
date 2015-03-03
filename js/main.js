window.onload = function() {
 // document.querySelector('#greeting').innerText =
 //  'Hello, World! It is ' + new Date();
};



/* function FeedConvert($http) {
          var factory = [];
        
          factory.getTodos = function(){
            return $http.get("http://cdn.chromebooks.today/rss/feed.xml");
          }
        
            return factory;
	}; 

function FeedCtrl($scope, $http, FeedConvert) { */
function FeedCtrl($scope, $http) {
/*   var item = {
    face: '/assets/60.jpeg',
    what: 'Brunch this weekend?',
    who: 'Min Li Chan',
    notes: "I'll be in your neighborhood doing errands."
  };
  $scope.items = [];
  for (var i = 0; i < 10; i++) {
    $scope.items.push({
      face: '/assets/60.jpeg',
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }; */
  
/*     $http.get('http://cdn.chromebooks.today/rss/feed.xml')
    .success(function(response) {
		$scope.feedData = response;
		console.log($scope.feedData);
		var x2js = new X2JS();
        $scope.json = x2js.xml_str2json($scope.feedData);
		console.log($scope.json);
	}); 
	
	$scope.todos = [];
          loadTodos();
          
           function loadTodos(){
            FeedConvert.getTodos().success(function(data){
			    console.log(data);
				var x2js = new X2JS()
                rss  = x2js.xml_str2json(data);
                console.log(rss);
                $scope.todos =rss;
				console.log($scope.todos);
				
				$scope.jsontodos = angular.toJson($scope.todos);
				console.log($scope.jsontodos);
				console.log($scope.parsed);
				
				
            });
	
}; */

  $scope.title = "How to use XML inside AngularJS";
  $http.get('assets/feed.xml').then(function(response) {
    var items = [];
    /*setting up the response*/
	var x2js = new X2JS()
    var itemDef = x2js.xml_str2json(response.data);
    console.log(itemDef);
    $scope.itemsObj = itemDef.rss.channel.item;
	console.log($scope.itemsObj);
	console.log($scope.itemsObj.title);
 
    /*looping through the chapters*/
    var numOfItems = $scope.itemsObj.length;
	console.log('numOfItems =' + numOfItems);
    for (var i = 0; i < numOfItems; i++) {
      items.push({
        title: $scope.itemsObj[i].title,
        link: $scope.itemsObj[i].link,
		author: $scope.itemsObj[i].author,
		pubDate: new Date($scope.itemsObj[i].pubDate),
		summary: $scope.itemsObj[i].summary
      });
    }
 
    $scope.itemNames = items;
	console.log(items);
	console.log(items[0].title);
		console.log(items[0].summary.__cdata);
  });

}; 

var app = angular.module('ctApp', ['ngMaterial'])
// config from Shaun at StackOverFlow - http://stackoverflow.com/a/22798336
.config( [ '$compileProvider', function( $compileProvider ) {
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        + '|chrome-extension:'
        +currentImgSrcSanitizationWhitelist.toString().slice(-1);

        console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
])
.controller('FeedCtrl', FeedCtrl);
//.factory('FeedConvert', FeedConvert);
