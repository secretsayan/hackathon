var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');
const User = require('../models/user.model');
const _ = require("lodash");
const jwt = require("../config/jwt-module");
const nodemailer = require("nodemailer");

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

router.get('/mail',function(req, res, next){
  sendEMail(function(results){
    res.json(results);
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
// Check Admin
function checkAdmin (req, res, next) {
  const header = req.headers.authorization;
  if(typeof header !== 'undefined') {
    const bearer = header.split(' ');
    if (bearer.length == 2){
      var scheme = bearer[0];
      var credentials = bearer[1]; 
      if (/^Bearer$/i.test(scheme)) {
        var userData = jwt.verify(credentials);
        if (userData.role == 'admin'){
        next(); 
        return;
        }          
      }
    } 
  }
  console.log("Failed");
  res.sendStatus(403);
}

async function sendEMail (callback){
  try{
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    //proxy: ,
    auth: {
      //user: 
      //pass: 
    }
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Sayan Goswami" <sayandrupal@gmail.com>', // sender address
    to: "sayan.goswami@wipro.com", // list of receivers
    subject: "Nodemailer Test", // Subject line
    text: "Hello This is a test mail.", // plain text body
    html: "<b>Hello This is a test mail.</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  callback("Mail Sent");

}catch(e){
  console.log(e);
  callback("Sending Failed");

}
  


}

module.exports = router;
module.exports.checkToken = checkToken;
module.exports.checkAdmin = checkAdmin;
