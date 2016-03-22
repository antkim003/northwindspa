"use strict"

var app = angular.module('app',[]);

app.controller('postsController', function($http, $scope) {
  $http.get('/api/posts')
    .then(function(response) {
      $scope.posts = response.data;
    });


  $scope.submit = function(ev) {
    var data = {
        name: $scope.name,
        priority: $scope.priority
      };
    $http.post('/api/posts', data)
      .then(function(response) {
        $scope.posts.push(response.data);
      })
      .catch(function(err) {
        console.log('there was an error', err);
      })
      .finally(function() {
        console.log('finally done');
      })
  }

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
      })
  }

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
      })
  }

  $scope.remove = function(index) {
    $http.delete('/api/posts', {params: {id: $scope.posts[index]._id}})
      .then(function(response) {
        
      })
      .catch(function(err) {
        console.error('there was an error: ', err);
      })
  }

  var httpPut = function(data) {
    return $http.put('/api/posts', data)
  };
});