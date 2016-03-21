var Entry  = require('../server/db/models/entries.js');
var expect = require('chai').expect;
var seed   = require('./seed.js');



describe('Entry model', function () {
  var _entries;
  beforeEach(function (done) {
    seed()
      .then(function() {
        return Entry.find({});
      })
      .then(function(entry) {
        _entries = entry;
        done();
      });
  });
  it('db connection is working', function () {
    console.log(_entries);
    expect(_entries).to.exist;
    expect(_entries).to.have.length(1);
  });
});

