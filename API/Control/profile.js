var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req,res){
//If id not matched with user's data id in database
  if(!req.payload._id){
    res.status(401).json({"message":"UnauthorizedAccess : Private profile"});
  }
//if matched
  else {
    User.findById(req.payload._id).exec(function(err, user){
      res.status(200).json(user);
    });
  }
};
