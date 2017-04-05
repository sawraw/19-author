var User = require('./users/user.model');
var router = require('express').Router();


router.post('/', function(req,res,next){
    req.session.destroy(function(err) {
  // cannot access session here
        console.log("session was destroyed");
    })
    .then(function(){
        res.redirect('/api/login');
    });
})

module.exports = router;