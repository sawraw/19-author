'use strict';
var User = require('./users/user.model');
var router = require('express').Router();

router.post('/', function(req,res,next){
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password 
        }
    })
    .then(function(foundUser){
        if (foundUser){
            req.session.userId = foundUser.id;
            res.sendStatus(204);
        } 
        else res.sendStatus(401);
    })
    .catch(next);
})

module.exports = router;