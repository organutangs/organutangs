//middleware
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var result = require('../database-mongo');
//michael new
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var users = require('../server/users.js');


//middleware
var app = express();
app.use(passport.initialize());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use('/users', users);

// Express Validator (displays errors when logging in)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'), root = namespace.shift(), formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash (temporary error msgs whe logging in)
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(__dirname + '/../react-client/dist'));

<<<<<<< HEAD
//end of Michaels code
=======
//need a get request for results,  and a post request for new meeting, post for signup, get for login, get for each page
//need to create a request handler

//michael new
//


//handles a login attempt from the front end
//returns 401 unauthorized if fails
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


>>>>>>> 89d9d5c4dfefef73ca3e57071fd2614a9fcc3f56

//getting the results of the match
app.get('/results', function (req, res) {
  result.Match(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//getting the user info
app.get('/users', function (req, res) {
  result.Match(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//creating a new meeting/checking if meeting exists?
app.post('/meetings', function (req, res) {
  result.Match(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//create a new user
app.post('/users', function (req, res) {
  result.Match(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//get info from googlemaps


//get info from yelp


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
