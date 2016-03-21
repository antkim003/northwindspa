var router = require('express').Router();


router.route('/posts')
  .get(function(req,res,next) {
    res.json('this is the get call for posts');
  })
  .post(function(req,res,next) {
    res.json('this is the post call for posts');
  })
  .delete(function(req,res,next) {
    res.json('this is the delete call for posts');
  })
  .put(function(req,res,next) {
    res.json('this is the put call for posts');
  });

module.exports = router;