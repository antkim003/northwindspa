var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db  = require('./db');

module.exports = app;

//body parser middle ware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


//to routes page
app.use('/api', require('./routes/api.js'));


app.get('/', function(req,res,next) {
  // this is test
  res.json('hello');
});

//start server

var server = require('http').createServer(app);
var port = process.env.PORT || 3100;

db.connect()
  .then(function(conn) {
    server.listen(port, function() {
      console.log(`listening on port ${port}`);
    });    
  })


