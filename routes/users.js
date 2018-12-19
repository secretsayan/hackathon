var express = require('express');
var router = express.Router();

/* Login */
router.post('/login', function(req, res, next) {
  res.json('Login Sucessful');
});

/* Signup */
router.post('/signup', function(req,res,next){
  res.json("Signup Successful")
});

module.exports = router;
