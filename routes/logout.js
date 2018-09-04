var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    req.logOut();

    // destroy user data
    req.user=null;
    delete req.user;

    // destroy session data
    req.session = null;

    res.redirect('https://payex-poc1.eu.auth0.com/v2/logout?federated&returnto=http://localhost:4000&client_id=QyFA455c3ECwksfw5szqZanxX6Z0eUy0'); //Inside a callback… bulletproof!
    // ?returnTo=http://localhost:4000&client_id=QyFA455c3ECwksfw5szqZanxX6Z0eUy0&
  });
});

module.exports = router;
