var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');
const User = require('../models/user.model');
const _ = require("lodash");
const jwt = require("../config/jwt-module");

/* Login */
router.post('/login', function (req, res, next) {
  if(req.body.email === null){
    res.sendStatus(401);

    req.json('Invalid Credentials');
  
  }else{
    useremail = req.body.email;
    userpassword = req.body.password;
  }

  //mongodb find and match user.
  User.findOne({email:useremail,password:userpassword},function(err,doc){

    if(_.isEmpty(doc)){            
      res.status(401).json('Invalid Credentials');
    }else{
      var token = jwt.sign({email: useremail, password: userpassword},{issuer:'Hackathon/Server/Login',subject:useremail,audience:'http://localhost'});
      console.log("Token :" + token);
      res.json('Login Sucessful token=' + token);
     
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
