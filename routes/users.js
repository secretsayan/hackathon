var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');
const User = require('../models/user.model');
const _ = require("lodash");

/* Login */
router.post('/login', function (req, res, next) {
  if(req.body.email === null){

    req.json('Invalid Credentials');
  
  }else{
    useremail = req.body.email;
    userpassword = req.body.password;
  }

  //mongodb find and match user.
  User.findOne({email:useremail,password:userpassword},function(err,doc){

    if(_.isEmpty(doc)){      
      res.json('Invalid Credentials');
    }else{
      res.json('Login Sucessful');
     
    }
    

  });


  
});

/* Signup */
router.post('/signup', function (req, res, next) {
  HackApi.createUser(req.body, function (results) {
    console.log(results);
    res.json(results['message']);
  });

});

module.exports = router;
