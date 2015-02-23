angular.module('employeeService', [])

  // super simple service
  // each function returns a promise object 
  .factory('Employees', function ($http) {
    return {
      get: function () {
        return $http.get('/api/employees');
      },
      create: function (employeeData) {
        console.log(employeeData)
        return $http.post('/api/employees', employeeData);
      },
      delete: function (id) {
        return $http.delete('/api/employees/' + id);
      }
    }
  });