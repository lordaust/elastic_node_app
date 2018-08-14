const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const myVar = {
    domain: 'payex-poc1.eu.auth0.com',
    clientID: 't7vBWlBcENrs78QVjFF4hJuj9gZT2-iw',
    clientSecret: '3wlKOWELwetHWZr8aMfychrosjgLzcJuO1-N4wh0KlLarqBnV7orQibsm6Ymtadk',
    callbackURL: 'http://localhost:4000/callback'
}

const strategy = new Auth0Strategy({
    domain: 'payex-poc1.eu.auth0.com',
    clientID: 't7vBWlBcENrs78QVjFF4hJuj9gZT2-iw',
    clientSecret: '3wlKOWELwetHWZr8aMfychrosjgLzcJuO1-N4wh0KlLarqBnV7orQibsm6Ymtadk',
    callbackURL: 'http://localhost:4000/callback'
},
function(accessToken, refreshToken, extraParam, profile, done){
  return done(null, profile);
}
)

passport.use(strategy);

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function (user,done){
  done(null, user);
});




var home = require('./routes/index');
var visitor = require('./routes/visitor');
var callback = require('./routes/callback');
var login = require('./routes/login');
var logout = require('./routes/logout');
var user = require('./routes/user');
var failure = require('./routes/failure');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUnitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.loggedIn = false;

  if(req.session.passport && typeof req.session.passport.user != 'undefined'){
    res.locals.loggedIn = true;
  }

  next();
});

app.use('/', home);
app.use('/visitor', visitor);
app.use('/login', login);
app.use('/callback', callback);
app.use('/logout', logout);
app.use('/user', user);
app.use('/failure', failure);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
