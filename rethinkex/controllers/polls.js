/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var pollModel = require('../models/polls');

router.route('/').get(function(req,res){
    //pollsları var
    var pollObject = new pollModel();
    //modelleri çağırmaca

pollObject.getAllPolls(function(err,pollResponse){
    if(err) {
        return res.json({"responseCode" : 1, "responseDesc": pollResponse});
    }
    res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
    });
})
.post(function(req,res){
    //yeni poll ekleme
    var pollObject = new pollModel();

    pollObject.addNewPolls(req.body,function(err,pollResponse){
        if(err) {
            return res.json({"responseCode" : 1, "responseDesc": pollResponse});
        }
        res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
        });

})
.put(function(req,res){
    //update polls
    var pollObject = new pollModel();

    pollObject.votePollOption(req.body,function(err,pollResponse){
        if(err) {
            return res.json({"responseCode" : 1, "responseDesc": pollResponse});
        }
        res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
        });
});

module.exports=router;