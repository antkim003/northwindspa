"use strict"
//think about file name - here-- it's more than just a controller
//how about app.js?

var app = angular.module('app',[]);

app.controller('postsController', function($http, $scope) {
  $http.get('/api/posts')
    .then(function(response) {
      $scope.posts = response.data;
    });


  //you can create an ng-model like this.. 
  //<input ng-model='entry.name' />
  //<input ng-model='entry.priority' />
  //this way you can do somthing like this
  //$http.post('/api/products', $scope.entry)
  $scope.submit = function(ev) {//what are we doing with ev?
    var data = {
        name: $scope.name,
        priority: $scope.priority
      };
    $http.post('/api/posts', data)
      .then(function(response) {
        $scope.posts.push(response.data);
      })
      .catch(function(err) {
        console.log('there was an error', err);//how about displaying it
      })
      .finally(function() {
        console.log('finally done');
      });
  };

  //much simpler way to handle priority-- see my solution
  var cacheTarget;
  $scope.upArrow = function(index) {
    var currTarget = $scope.posts[index];
    var aheadTarget = $scope.posts[index-1];
    var data = [];

    cacheTarget = currTarget.priority;

    currTarget.priority = aheadTarget.priority;
    aheadTarget.priority = cacheTarget;
    cacheTarget = null;

    data.push(currTarget);
    data.push(aheadTarget);
    httpPut(data)
      .then(function(response) {
        $scope.posts = response.data;
      })
      .catch(function(err) {
        console.error('there was an error', err)
      });
  };

  $scope.downArrow = function(index) {
    var currTarget = $scope.posts[index];
    var behindTarget = $scope.posts[index+1];
    var data = [];


    cacheTarget = currTarget.priority;
    currTarget.priority = behindTarget.priority;
    behindTarget.priority = cacheTarget;
    cacheTarget = null;

    data.push(currTarget);
    data.push(behindTarget);
    httpPut(data)
      .then(function(response) {
        $scope.posts = response.data;
      })
      .catch(function(err) {
        console.error('there was an error', err)
      });
  };

  $scope.remove = function(index) {
    $http.delete('/api/posts', {params: {id: $scope.posts[index]._id}})
      .then(function(response) {
        $scope.posts.splice(index,1);
      })
      .catch(function(err) {
        console.error('there was an error: ', err);
      });
  };

  var httpPut = function(data) {
    return $http.put('/api/posts', data);
  };
});
