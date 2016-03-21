var Promise = require('bluebird');
var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  name: {type: String, required: true},
  priority: {type: Number, required: true}
});


module.exports = mongoose.model('Entry', entrySchema);