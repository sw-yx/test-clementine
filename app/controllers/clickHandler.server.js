'use strict';

var Clicks = require('../models/clicks.js');

function ClickHandler (db) {
//function clickHandler (db) {

    //var clicks = db.collection('clicks');
    this.getClicks = function (req, res) {

      var clickProjection = { '_id': false };
      //clicks.findOne({}, clickProjection, function (err, result) {
      Clicks.findOne({},clickProjection)
        .exec(function (err,result){
            if (err) {throw err;}
            if (result){res.json(result);}
            else {
                var newDoc = new Clicks({'clicks':0});
                newDoc.save(function(err,doc){
                    if (err) {throw err;}
                    res.json(doc);
                });
            }
        })
        /*
         if (err) {throw err;}
    
         if (result) {
            console.log('hi3.1');
             res.json(result);
         } else {
            clicks.insert({ 'clicks': 0 }, function (err) {
               if (err) {throw err;}
                console.log('hi3.2');
               clicks.findOne({}, clickProjection, function (err, doc) {
                  if (err) {throw err;}
                  res.json(doc);
               });
            }); 
         }
      });*/
    };
    this.addClick = function (req, res) {
        //clicks.findAndModify(
        Clicks.findOneAndUpdate(
                {},
                //{ '_id': 1 },
                { $inc: { 'clicks': 1 } }
            ).exec(function(err,result){
                if(err) {throw err;}
                res.json(result);
            });
    };
    
    this.resetClicks = function (req, res) {
        Clicks.findOneAndUpdate({},{'clicks':0})
            .exec(function(err,result){
                if(err){throw err;}
                res.json(result);
            })
        //clicks.update(
        /*
                {},
                { 'clicks': 0 },
                function (err, result) {
                    if (err) { throw err; }
    
                    res.json(result);
                }
            );*/
    };
}

//module.exports = clickHandler;
module.exports = ClickHandler;