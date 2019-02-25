var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-home', function(req, res, next) {
  res.send('this is the home page');
});

module.exports = router;
