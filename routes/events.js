var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');

/* GET events listing. */
router.get('/all', function (req, res, next) {
  HackApi.getAllEvents(function (results) {
    console.log(results);
    res.json(results);
  });
});

/* Get Event By ID. */
router.get('/edit/:id',function(req,res,next){
  HackApi.getEventById(req.params.id, function(results){
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

/* Update Events. */
router.post('/edit/:id', function (req,res,next){
  HackApi.updateEventById(req.params.id, req.body, function (results){
    console.log(results);
    res.json('Success');

  });
});

/* Delete Event. */
router.delete('/delete/:id', function(req, res, next){
  HackApi.deleteEventById(req.params.id, function(results){
    console.log(results);
    res.json(results);
  });
});

module.exports = router;