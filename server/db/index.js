var mongoose = require('mongoose');
var Promise = require('bluebird');

var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN, function(err){
      if(err)
        return reject('make sure mongo is running and connection string is set');
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(){
      _conn = null;
      resolve();
    });
  });
}

//why not pull in models here as well?
module.exports = {
  connect: connect,
  disconnect: disconnect
};
