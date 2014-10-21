/**
 * Module dependencies.
 */
var express = require('express'), 
    http = require('http'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    passport = require('passport'),
    site = require('./site'),
    oauth2 = require('./oauth2'),
    user = require('./user'),
    client = require('./client'),
    util = require('util'),
    implicit = require('./implicit'),
    register = require('./register');  
// Express configuration
  
var app = express();
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
/*
app.use(function(req, res, next) {
  console.log('-- session --');
  console.dir(req.session);
  //console.log(util.inspect(req.session, true, 3));
  console.log('-------------');
  next()
});
*/
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Passport configuration

require('./auth');


app.get('/', site.index);
app.get('/login', site.loginForm);
app.post('/login', site.login);
app.get('/logout', site.logout);
app.get('/account', site.account);

app.get('/registration', register.registerFormUser);
app.post('/registration', register.registerUser);
app.get('/client/registration', register.registerFormClient);
app.post('/client/registration', register.registerClient);

app.get('/loginImplicit', implicit.loginForm);
app.post('/loginImplicit', implicit.login);

app.get('/dialog/authorize', oauth2.authorization);
app.post('/dialog/authorize/decision', oauth2.decision);
app.post('/oauth/token', oauth2.token);

app.get('/api/userinfo', user.info);
app.get('/api/clientinfo', client.info);

http.createServer(app).listen(3000);
