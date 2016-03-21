var Entry = require('../server/db/models/entries.js');
var db    = require('../server/db');
var Promise = require('bluebird');

var entry =  {
  name: "Anthony",
  priority: 1
}

module.exports = function() {
  return db.connect()
    .then(function() {
      return Entry.remove();
    })
    .then(function() {
      return Entry.create(entry);
    })
    .then(function(entry) {
      console.log(entry);
      console.log('seed done');
    })
};



