var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db  = require('./db');
var path = require('path');

module.exports = app;

//body parser middle ware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//static pages

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/node_modules', express.static(path.join(__dirname,'../node_modules')));
app.use('/browser', express.static(path.join(__dirname,'../browser')));

//to api page

app.use('/api', require('./routes/api.js'));

//homepage

var indexPath = path.join(__dirname, '../browser/index.html');
app.get('/*', function(req,res,next) {
  // this is test
  res.sendFile(indexPath);
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


