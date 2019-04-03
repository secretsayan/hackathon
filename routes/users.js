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
    res.json('Invalid Credentials');  
  }else{
    useremail = req.body.email;
    userpassword = req.body.password;
  }

  //mongodb find and match user.
  HackApi.login(useremail, userpassword, function(results){
    var obj = JSON.parse(JSON.stringify(results['message']));
    if(_.isEmpty(obj)){            
      res.status(401).json('Invalid Credentials');
    }else{
      var token = jwt.sign({email: useremail, role: obj.Role});
      res.json('Login Sucessful token='+token);
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

/* View Registration Details */
router.get('/profile', checkToken, function(req, res){
  
  HackApi.userProfile(req.email, function(results){
    res.json(results['message']);
    console.log('seen'+results);
  });
  

});

/* Login as Admin */
router.post('/admin/login', function (req, res, next){
  if(req.body.email !== 'admin@hack.com'){
    res.sendStatus(401);
    req.json('Invalid Credentials');
  
  }else{
    useremail = req.body.email;
    userpassword = req.body.password;
  }

  //mongodb find and match user.
  HackApi.login(useremail, userpassword, function(results){
    var obj = JSON.parse(JSON.stringify(results['message']));
    if(_.isEmpty(obj)){            
      res.status(401).json('Invalid Credentials');
    }else{
      var token = jwt.sign({email: useremail, role: obj.role});
      res.json('Login Sucessful for admin token='+token);
    }         
  });   
}); 

//Check to make sure header is not undefined, if so, return Forbidden (403)
function checkToken (req, res, next)  {
  const header = req.headers.authorization;

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      if (bearer.length == 2){
        var scheme = bearer[0];
        var credentials = bearer[1]; 
        if (/^Bearer$/i.test(scheme)) {
          var userData = jwt.verify(credentials);
          req.email = userData.email;
          req.role = userData.role;
          next();          
        }
      } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403);
      }     
  } 
}

module.exports = router;
module.exports.checkToken = checkToken;
