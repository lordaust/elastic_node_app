var express = require('express');
var router = express.Router();
const passport = require('passport');


// // This is the regular with social login
// const myVar = {
//     domain: 'payex-poc1.eu.auth0.com',
//     clientID: 't7vBWlBcENrs78QVjFF4hJuj9gZT2-iw',
//     clientSecret: '3wlKOWELwetHWZr8aMfychrosjgLzcJuO1-N4wh0KlLarqBnV7orQibsm6Ymtadk',
//     callbackURL: 'http://localhost:4000/callback'
// };

//this is the internal ADFS onError
const myVar = {
    domain: 'payex-poc1.eu.auth0.com',
    clientID: 'QyFA455c3ECwksfw5szqZanxX6Z0eUy0',
    clientSecret: 'jQx4wXf-3AFwSw_f2-UyP4uB8ApeoiWqmvAPoc8cWiXu-XmXpHuBOR-V34KIUci7',
    callbackURL: 'http://localhost:4000/callback'
};


// router.get('/', function(req, res, next){
//   res.render('login', { title: 'This is the login page'});
// })

router.get('/', passport.authenticate('auth0', {
  clientID: myVar.clientID,
  domain: myVar.domain,
  redirectUri: myVar.callbackURL,
  responsetype: 'code',
  audience: 'https://payex-poc1.eu.auth0.com/userinfo',
  scope: 'openid email profile eCom_role'}),
    function(req, res){
      res.redirect('/');
    }
);

module.exports = router;
