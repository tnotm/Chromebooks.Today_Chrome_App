window.onload = function() {
};

function FeedCtrl($scope, $http) {

  $http.get('assets/feed.xml').then(function(response) {
//	$http.get('http://cdn.chromebooks.today/rss/feed.xml').then(function(response) {
    var items = [];
	var x2js = new X2JS()
    var itemDef = x2js.xml_str2json(response.data);
    $scope.itemsObj = itemDef.rss.channel.item;

    var numOfItems = $scope.itemsObj.length;
	
    for (var i = 0; i < numOfItems; i++) {
      items.push({
        title: $scope.itemsObj[i].title,
        link: $scope.itemsObj[i].link,
		author: $scope.itemsObj[i].author,
		pubDate: new Date($scope.itemsObj[i].pubDate),
		summary: $scope.itemsObj[i].summary,
		duration: $scope.itemsObj[i].duration,
		description: $scope.itemsObj[i].description
      });
    }
    $scope.itemNames = items;
  });
}; 

var app = angular.module('ctApp', ['ngMaterial'])
// config from Shaun at StackOverFlow - http://stackoverflow.com/a/22798336
.config( [ '$compileProvider', function( $compileProvider ) {
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        + '|chrome-extension:'
        +currentImgSrcSanitizationWhitelist.toString().slice(-1);
    }
])
.controller('FeedCtrl', FeedCtrl);
