var mongoose = require('mongoose');
var gracefulShutdown;
var db = 'mongodb://localhost:27017/meanAuth';
//It checks that what is the value of envirenment variable
//if its production then it deploys on HEROKU
if(process.env.NODE_ENV === 'production'){
  db = process.env.MONGOLAB_URI;
}
//connect database
var Mongo = mongoose.connect(db).connection;

// CONNECTION EVENTS
Mongo.on('open', function() {
  console.log('Mongoose connected to ' + db);
});
Mongo.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
Mongo.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

//capture app termination and restart events
//To be called when process is restarted or terminated
 gracefulShutdown = function(msg, callback){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected "+ msg);
    callback();
  });
};
//For nodemon restart
//this method only called once when files in directory change
process.once('SIGUSR2',function(){
gracefulShutdown('Nodemon restart',function(){
  process.kill(process.pid, 'SIGUSR2');
  });
});
//Terminate the Application
process.on('SIGINT',function(){
  gracefulShutdown('App termination', function(){
    process.exit(0);
  });
});
//Terminate the Heroku Application
process.on('SIGTERM',function(){
  gracefulShutdown('Heroku App termination ',function(){
    process.exit(0);
  });
});
//for user Schema
require('./users');
