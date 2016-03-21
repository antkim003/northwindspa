var request   = require('supertest-as-promised')(require('../server/app.js'));
var Promise   = require('bluebird');
var expect    = require('chai').expect;
var seed      = require('./seed.js');
var Entry     = require('../server/db/models/entries.js');


describe('Routes', function () {
  before(function (done) {
    seed()
      .then(function() {
        done();
      });
  });
  describe('/', function () {
    it('returns home page', function () {
      return request.get('/')
        .expect(200)
        .then(function(res) {
          console.log('get call ', res.text);
        });
    });
  });

  describe('GET / all the products', function () {
    it('route is fired', function () {
      return request.get('/api/posts')
        .expect(200)
        .then(function(res) {
          expect(res.text).to.contain("Anthony");
        });
    });
  });

  describe('POST / post new data', function () {
    it('route returns the created post', function () {
      return request.post('/api/posts')
        .expect(200)
        .send({ name: "Jim", priority: 5 })
        .then(function(res) {
          expect(res.text).to.contain("Jim");
        });
    });
  });

  describe('DELETE / delete new data', function () {
    var _entry;
    beforeEach(function (done) {
      Entry.create({
        name: "test",
        priority: 1
      })
      .then(function(entry){
        _entry = entry;
        done();
      });
    });
    it('route exists', function () {
      return request.delete('/api/posts')
        .expect(200)
        .send({ id: _entry._id})
        .then(function(res) {
          console.log('deleted file blah', res.text);
          expect(res.text).to.contain("test");
        });
    });
  });

  describe('PUT / put new data', function () {
    it('route exists', function () {
      return request.put('/api/posts')
        .expect(200);
    });
  });
});

