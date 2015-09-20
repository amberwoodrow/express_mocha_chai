var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Frog = new Schema({
  name: String,
  favFlyMeal: String
});

mongoose.connect(process.env.DB_HOST);


module.exports = mongoose.model('frogs', Frog);