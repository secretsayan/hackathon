var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');
const checkAdmin = require('./users').checkAdmin;


/* GET events listing. */
router.get('/all', function (req, res, next) {
  HackApi.getAllEvents(function (results) {
    //console.log(results);
    res.status(results['status']).json(results['message']);
  });
});

/* Get Event By ID. */
router.get('/edit/:id', checkAdmin, function(req,res,next){
  HackApi.getEventById(req.params.id, function(results){
    console.log(results);
    res.status(results['status']).json(results['message']);    
  });
});

/* Insert events. */
router.post('/add', checkAdmin, function (req, res, next) {
  
  HackApi.insertEvent(req.body, function (results) {
    console.log(results);
    res.status(results['status']).json(results['message']);
  });  
});

/* Update Events. */
router.post('/edit/:id', checkAdmin, function (req,res,next){
  console.log(JSON.stringify(req.body));
  HackApi.updateEventById(req.params.id, req.body, function (results){
    console.log(results);
    res.status(results['status']).json(results['message']);

  });
});

/* Delete Event. */
router.delete('/delete/:id', checkAdmin, function(req, res, next){
  console.log("Here");
  HackApi.deleteEventById(req.params.id, function(results){
    console.log(results);
    res.json(results['data']);
  });
});

/* Delete Event. */
router.post('/deletemultiple', checkAdmin, function(req, res, next){
  HackApi.deleteMultiple(req.body, function(results){
    console.log(results);
    res.json(results['data']);
  });
});

module.exports = router;