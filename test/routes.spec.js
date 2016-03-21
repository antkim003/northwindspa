var request   = require('supertest-as-promised')(require('../server/app.js'));
var Promise   = require('bluebird');
var expect    = require('chai').expect;
var seed      = require('./seed.js');


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
        .expect(200);
    });
  });

  describe('GET / all the products', function () {
    it('route exists', function () {
      return request.get('/api/posts')
        .expect(200);
    });
  });

  describe('POST / post new data', function () {
    it('route exists', function () {
      return request.post('/api/posts')
        .expect(200);
    });
  });

  describe('DELETE / delete new data', function () {
    it('route exists', function () {
      return request.delete('/api/posts')
        .expect(200);
    });
  });

  describe('PUT / put new data', function () {
    it('route exists', function () {
      return request.put('/api/posts')
        .expect(200);
    });
  });
});

