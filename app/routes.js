var Employee = require('./models/employee');
var Craft = require('./models/craft');
module.exports = function (app) {
//http://docs.mongodb.org/manual/reference/operator/update/addToSet/


  // api ---------------------------------------------------------------------
  // get all employees
  app.get('/api/employees', function (req, res) {
    // use mongoose to get all employees in the database
    Employee.find(function (err, employees) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        res.send(err);
      }

      res.json(employees); // return all employees in JSON format
    });
  });

  app.get('/api/crafts', function (req, res) {
    // use mongoose to get all employees in the database
    Craft.find(function (err, crafts) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        res.send(err);
      }

      res.json(crafts); // return all employees in JSON format
    });
  });


  // create craft and send back all crafts after creation
  app.post('/api/crafts', function (req, res) {

    // create a craft, information comes from AJAX request from Angular
    Craft.create({
      name: req.body.name
    }, function (err, craft) {
      if (err) {
        res.send(err);
      }

      // get and return all the crafts after you create another
      Craft.find(function (err, crafts) {
        if (err){
          res.send(err)
        }
        res.json(crafts);
      });
    });
  });

  // create employee and send back all employees after creation
  app.post('/api/employees', function (req, res) {

    // create a employee, information comes from AJAX request from Angular
    Employee.create({
      name: req.body.name,
      title: req.body.title,
      craft: req.body.craft.name
    }, function (err, employee) {
      if (err) {
        res.send(err);
      }

      // get and return all the employees after you create another
      Employee.find(function (err, employees) {
        if (err){
          res.send(err)
        }
        res.json(employees);
      });
    });
  });

  // delete a employee
  app.delete('/api/employees/:employee_id', function (req, res) {
    Employee.remove({
      _id: req.params.employee_id
    }, function (err, employee) {
      if (err) {
        res.send(err);
      }

      // get and return all the employees after you create another
      Employee.find(function (err, employees) {
        if (err) {
          res.send(err)
        }
        res.json(employees);
      });
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};