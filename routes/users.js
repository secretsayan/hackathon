var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');

/* Login */
router.post('/login', function (req, res, next) {

  res.json('Login Sucessful');
});

/* Signup */
router.post('/signup', function (req, res, next) {
  HackApi.createUser(req.body, function (results) {
    console.log(results);
    res.json(results['message']);
  });

});

module.exports = router;
