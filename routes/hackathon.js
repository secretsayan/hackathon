var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hackathon Home');
});

/*  GET Hackathon Listing. */
router.get('/events',function(req, res, next){
    res.send('List All Hackathon');

});

module.exports = router;