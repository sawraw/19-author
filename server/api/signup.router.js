'use strict';
var User = require('./users/user.model');
var router = require('express').Router();

router.post('/', function(req,res,next){
  console.log(req.body)
    User.create(req.body)
    .then(function(createdUser){
        if (createdUser){
            req.session.userId = createdUser.id;
            res.json(createdUser);
        }
        else res.sendStatus(401);
    })
    .catch(next);
})

module.exports = router;
