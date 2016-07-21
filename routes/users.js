var express = require('express');
var router = express.router();

router.get('/', function(req, res, next){
  res.send('Respond with resource');

});
module.exports = router;
