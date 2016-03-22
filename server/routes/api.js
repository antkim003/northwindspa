var router = require('express').Router();
var Entry  = require('../db/models/entries.js');
var Promise = require('bluebird');


router.route('/posts')
  .get(function(req,res,next) {
    Entry.find({})
      .then(function(entries) {
        entries.sort(function(a,b) {
          return a.priority - b.priority
        });
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
    console.log(req.query.id);
    Entry.findOne({_id: req.query.id})
      .then(function(entry) {
        return entry.remove({});
      })
      .then(function(entry) {
        res.json(entry);
      })
      .catch(function(err){
        console.error('there was an error with delete call', err);
      })
  })
  .put(function(req,res,next) {
    Promise.join(Entry.update({_id: req.body[0]._id}, {
      priority: req.body[0].priority
    }), Entry.update({_id: req.body[1]._id}, {
      priority: req.body[1].priority
    }))
      .then(function(entries) {
        // entries[0].priority = req.body[0].priority;
        // entries[1].priority = req.body[1].priority;
        console.log('here is req body', req.body);
        console.log('here are entries: ', entries);
        console.log('here 0 : ',entries[0].priority, req.body[0].priority);
        console.log('here 1 : ',entries[1].priority, req.body[1].priority);
        return Entry.find({})
      })
      .then(function(entries) {
        entries.sort(function(a,b) {
          return a.priority - b.priority
        });
        res.json(entries);
      })
      .catch(function(err) {
        console.log('there was an error: ', err);
      })
  });

module.exports = router;