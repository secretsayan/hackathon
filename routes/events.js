var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Insert events. */
router.post('/add', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;