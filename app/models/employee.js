var mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
  name: String,
  title: String,
  craft: String
});