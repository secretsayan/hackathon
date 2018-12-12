var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');

/* GET events listing. */
router.get('/', function (req, res, next) {
  HackApi.getAllEvents(function (results) {
    console.log(results);
    res.json(results);
  });
});

/* Insert events. */
router.post('/add', function (req, res, next) {
  HackApi.insertEvent(req.body, function (results) {
    console.log(results);
    res.json('success');
  });
  
});

module.exports = router;