var router = require('express').Router();
var Entry  = require('../db/models/entries.js');


router.route('/posts')
  .get(function(req,res,next) {
    Entry.find({})
      .then(function(entries) {
        res.json(entries);
      })
      .catch(function(err) {
        res.json("there was an error", err);
      });
  })
  .post(function(req,res,next) {
    Entry.create({
      name: req.body.name,
      priority: req.body.priority
    })
    .then(function(entry) {
      res.json(entry);
    })
    .catch(function(err) {
      console.error('there was an error with the post call', err);
    });
  })
  .delete(function(req,res,next) {
    Entry.findOne({_id: req.body.id})
      .then(function(entry) {
        return entry.remove();
      })
      .then(function(entry) {
        res.json(entry);
      })
      .catch(function(err){
        console.error('there was an error with delete call', err);
      })
  })
  .put(function(req,res,next) {
    res.json('this is the put call for posts');
  });

module.exports = router;