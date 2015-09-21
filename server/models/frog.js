var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Frog = new Schema({
  name: String,
  favFlyMeal: String
});

module.exports = mongoose.model('frogs', Frog);