var express = require('express');
var router = express.Router();
const checkToken = require('./users').checkToken;
const HackApi =  require('../service/HackApi');

/* GET home page. */
router.get('/list', checkToken, function(req, res, next) {
  HackApi.manageHackList(req.email, function(results){
    res.json(results);
  });
});

/*  GET Hackathon Listing. */
router.get('/events',function(req, res, next){
    res.send('List All Hackathon');

});

module.exports = router;