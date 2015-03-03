window.onload = function() {
 // document.querySelector('#greeting').innerText =
 //  'Hello, World! It is ' + new Date();
};

function FeedCtrl($scope, $http) {
  var item = {
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
  };
  
    $http.get('http://cdn.chromebooks.today/rss/feed.xml')
    .success(function(response) {
		$scope.feedData = response;
		console.log($scope.feedData);
		var x2js = new X2JS();
        $scope.json = x2js.xml_str2json($scope.feedData);
		console.log($scope.json);
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

