'use strict';
var User = require('./users/user.model');
var router = require('express').Router();

router.post('/', function(req,res,next){
    console.log("req.body is...", req.body);
    User.findOne({
        where: req.body
    })
    .then(function(foundUser){
        console.log("foundUser is ", foundUser);
        if (foundUser){
            req.session.userId = foundUser.id;
            res.json(foundUser);
        }
        else res.sendStatus(401);
    })
    .catch(next);
})

module.exports = router;
