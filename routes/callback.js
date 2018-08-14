var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/',
  passport.authenticate('auth0',{
    failureRedirect: '/failure'
  }),
  function(req, res){
    res.redirect('/user');
  }
);

module.exports = router;
