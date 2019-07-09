var express = require('express');
var router = express.Router();
const HackApi = require('../service/HackApi');
const checkAdmin = require('./users').checkAdmin;

/* GET Registration listing. */
router.get('/all', function (req, res, next) {
    HackApi.getAllReg(function (results){
        res.status(results['status']).json(results['message']);
    });
});
  
  /* Insert registrations. */
  router.post('/add', function (req, res, next) {    
    HackApi.insertReg(req.body, function (results) {
      res.status(results['status']).json(results['message']);
    });  
  });
  
  /* Get Registrations By . */
  router.get('/view/:id', function (req,res,next){
    console.log(req.params.id);
    HackApi.getRegByEventId(req.params.id, function(results){
      res.status(results['status']).json(results['message']); 
    });    
  }); 

  module.exports = router;