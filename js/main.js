window.onload = function() {};

  itemId = 0;
  index = 0;

function FeedCtrl($scope, GetFeed) {

  console.log('Get episodes in ctrl');

  GetFeed.getEpisodes().then(function(itemsObj) {
    console.log("xryy", itemsObj);
    $scope.itemNames = itemsObj;
  });

  console.log('display items from ctrl');
  console.log('scope.items', $scope.title);


  //$scope.itemId = GetFeed.aboutEpisode(index);
    //console.log("xryy", itemId);
    //$scope.itemId = itemId;

  $scope.itemId = function(index) {
    $scope.itemId = index;
    GetFeed.aboutEpisode($scope.itemId);
  //  console.log($scope.itemId);
  //  console.log($scope.itemNames[$scope.itemId].title);
  };

}

function EpisodeCrtl($scope, GetFeed) {

  //GetFeed.aboutEpisode();
    //console.log("xryy", itemId);
    //$scope.itemId = itemId;
}

function GetFeed($http) {

  itemId = function(index) {
    itemId = index;
    console.log('itemId_Index', itemId);
    return itemId;
  };

  function items() {
    console.log('Firing pullFeed');
    var itemsObj = [];
    return $http.get('/assets/feed.xml').then(function(response) {
      var x2js = new X2JS();
      var itemDef = x2js.xml_str2json(response.data);
      var itemsObj = itemDef.rss.channel.item;
      console.log('getFeedItems', itemsObj);
      return itemsObj;
    });
  }

  return {
    getEpisodes: function() {
      return items();
    },
    aboutEpisode: function() {
      return itemId();
    }
  };
}

var app = angular.module('ctApp', ['ngMaterial', 'ngAnimate', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'FeedCtrl'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'EpisodeCrtl'
      });
  })
// config from Shaun at StackOverFlow - http://stackoverflow.com/a/22798336
.config(['$compileProvider',
  function($compileProvider) {
    var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
    var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);
  }
])
  .factory('GetFeed', GetFeed)
  .controller('FeedCtrl', FeedCtrl)
  .controller('EpisodeCrtl', EpisodeCrtl);