var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'My_Secret',
  userProperty: 'payload'
});

var ctrlProfile = require('../Control/profile');
var ctrlAuth = require('../Control/authentication');

//get the profile info
router.get('/profile',auth,ctrlProfile.profileRead);

//authenticate user
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
