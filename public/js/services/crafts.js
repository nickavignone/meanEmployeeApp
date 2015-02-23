angular.module('craftService', [])

  // super simple service
  // each function returns a promise object 
  .factory('Crafts', function ($http) {
    return {
      get: function () {
        return $http.get('/api/crafts');
      },
      create: function (craftData) {
        return $http.post('/api/crafts', craftData);
      },
      delete: function (id) {
        return $http.delete('/api/crafts/' + id);
      }
    }
  });