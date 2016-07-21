var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./API/DB/db');
require('./API/Auth/passport');

var routeApi = require('./API/route/index');
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function //in Express.

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Client')));

//Initialise Passport before using the route middleware

app.use(passport.initialize());

//Use the API routes when path starts with /api

app.use('/api', routeApi);

//Otherwise render the index.html page for the Angular SPA
//This means we don't have to map all of the SPA routes in Express

app.use(function(req,res){
  res.sendFile(path.join(__dirname, 'Client', 'index.html'));
});

//catch 404 and forward to error handler

app.use(function(req, res, next){
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

//error handlers
//catch unauthorized errors

app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({"message : " :  err.name + " : " + err.message});
  }
});

//development error handler

if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {message: err.message, error: err});
  });
}

//production error handler

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {message: err.message, error:{}});
});



app.listen(3000, function(){
  console.log("Listening...");
});

module.exports = app;
