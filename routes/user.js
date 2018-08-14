var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  console.log("We can see the user object from the request here:");
  console.log(req.user);
  if(req.user) {
    res.render('user', {
      user: req.user
    })
  } else {
    res.redirect('/');
  }
});

module.exports = router;
