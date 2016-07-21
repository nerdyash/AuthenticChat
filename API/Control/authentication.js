var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

//user registration module
module.exports.register = function(req, res){
  var user = new User();

  user.email = req.body.email;
  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function(err){
    var token = user.generateJwt();
    res.status(200);
    res.json({
      "token":token
    });
  });
};

//user login module
module.exports.login = function(req, res){
  
  passport.authenticate('local', function(err, user, info){
    var token;
//if passport throws an error
    if(err){
      res.status(404).json(err);
      return;
    }
//if user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    }
//if user is not found
    else {
      res.status(401).json(info);
    }

  })(req,res);
};
