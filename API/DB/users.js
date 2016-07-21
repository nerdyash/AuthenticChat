var crypto = require('crypto');//module for Authentication
var jwt = require('jsonwebtoken');//module for generating token
var mongoose = require('mongoose');
//this is the user schema for our database in BSON
var userSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  hash: String,
  salt: String
});
//method for setting the password
userSchema.methods.setPassword = function(password){
  //generate the random bytes from the crypto module method
  this.salt = crypto.randomBytes(16).toString('hex');
  //encrypt the password with user passwordand salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

};
//method for validate the password
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  //compare previous encrypted hash and the hash generate at the time of login
  return this.hash === hash;
};
//method for generating token
userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);//set the expiration date
  //return the token with id
  return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      exp: parseInt(expiry.getTime() / 1000),},"My_Secret");

};

mongoose.model('User', userSchema);
