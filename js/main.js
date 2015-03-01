window.onload = function() {
 // document.querySelector('#greeting').innerText =
 //  'Hello, World! It is ' + new Date();



};

var app = angular.module('toolbarDemo2', ['ngMaterial']);
app.controller('AppCtrl', function($scope) {
  var item = {
    face: '/img/list/60.jpeg',
    what: 'Brunch this weekend?',
    who: 'Min Li Chan',
    notes: "I'll be in your neighborhood doing errands."
  };
  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: '/img/list/60.jpeg',
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }
});

angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);

angular.module('myApp',['myApp.service']);

var AppController = function($scope,DataSource) {

    var SOURCE_FILE = "feed.xml";

    $scope.IMAGE_LOCATION = "http://cdn.chromebooks.today/rss/";

    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.guitars.guitar;
    };

    setData = function(data) {
        $scope.dataSet = data;
    };

    DataSource.get(SOURCE_FILE,setData,xmlTransform);

};