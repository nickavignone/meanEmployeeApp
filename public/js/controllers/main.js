angular.module('employeeController', [])
  // inject the EMPLOYEE service factory into our controller
  .controller('mainController', function ($scope, $http, Employees, Crafts) {
    $scope.employeeData = {};
    // GET =====================================================================
    // when landing on the page, get all employees and show them
    // use the service to get all the employees
    Employees.get()
      .success(function (data) {
        $scope.employees = data;
      });
    Crafts.get()
      .success(function (data) {
        $scope.crafts = data;
        $scope.employeeData.craft = $scope.crafts[0];
      });


    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createCraft = function () {

      // validate the craftData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.craftData.name != undefined) {

        // call the create function from our service (returns a promise object)
        Crafts.create($scope.craftData)

        // if successful creation, call our get function to get all the new crafts
        .success(function (data) {
          $scope.craftData = {}; // clear the form so our user is ready to enter another
          $scope.crafts = data; // assign our new list of crafts
          $scope.employeeData.craft = $scope.crafts[0];
        });
      }
    };


    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createEmployee = function () {

      // validate the employeeData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.employeeData.name != undefined) {

        // call the create function from our service (returns a promise object)
        Employees.create($scope.employeeData)

        // if successful creation, call our get function to get all the new employees
        .success(function (data) {
          $scope.employeeData = {}; // clear the form so our user is ready to enter another
          $scope.employees = data; // assign our new list of employees
          $scope.employeeData.craft = $scope.crafts[0];
        });
      }
    };

    // DELETE ==================================================================
    // delete a employee after checking it
    $scope.deleteEmployee = function (id) {
      Employees.delete(id)
        // if successful creation, call our get function to get all the new employees
        .success(function (data) {
          $scope.employees = data; // assign our new list of employees
        });
    };
  });