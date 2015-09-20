var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Frog = require('../models/frog');

// GET all
router.get('/frogs', function(req, res) {
  Frog.find(function(err, data){
    if(err){
      res.json({'message' : err});
    }
    else {

       res.json({frogs : data});
    }
  });
});

// GET one
router.get('/frog/:id', function(req, res){
  Frog.findById(req.params.id, function(err, data) {
    if(err){
      res.json({'message' : err});
    }
    else {
      res.json({frog : data});
    }
  });
});

// POST all
router.post('/frogs', function(req, res) {
  newFrog = new Frog({
    name: req.body.name,
    favFlyMeal: req.body.favFlyMeal,
  });
  console.log(req.body.name);
  console.log(req.body.favFlyMeal);
  newFrog.save(function(err, data) {
    if(err) {
      res.json({'message' : err});
    }
    else {
      res.json(newFrog);
    }
  });
});

// PUT one
router.put('/frog/:id', function(req, res, next) {
  
  var update = {
    'name': req.body.name,
    'favFlyMeal': req.body.favFlyMeal
  };
  Frog.findOneAndUpdate({'_id': req.params.id}, update, function(err, data){
    if(err){
      res.json({'message' : err});
    }
    else {
      Frog.findById({'_id': req.params.id}, function(err, data){
        res.json(data);
      });
    }
  });
});

// delete single
router.delete('/frog/:id', function(req, res, next) {
  Frog.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message' : err});
    }
    else {
      res.json({'deleted' : 'true'});
    }
  });
});

// // http -f POST localhost:3000/frogs name=jackJohnson favFlyMeal=flySoup
// // http -f PUT localhost:3000/frogs name=jack zoo=False nemesis=heat
// // http -f DELETE localhost:3000/frog/id
// // http GET localhost:3000/frogs
// // http GET localhost:3000/frog/id

module.exports = router;