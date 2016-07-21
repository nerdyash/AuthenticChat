var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField : 'email'
},
  function(name, password, done){
    User.findOne({email: name},function(err,user){
      if(err){
        return done(err);
      }
      //return if user is not found
      if(!user){
        return done(null, false,{message: 'user not found.'});
      }
      //return if passwordis not matched
      if(!user.validPassword(password)){
        return done(null, false, {message:'Password not matched.'});
      }
      //if credentialss are correct, return user object
      return done(null, user);
    });
  }
));
