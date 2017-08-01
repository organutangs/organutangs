//middleware
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');

//database
var items = require('../database-mongo');

//michael new
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');


//middleware
var app = express();
app.use(passport.initialize());
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
//am i missing router


//this configures the LocalStrategy for username/password authentication
//done is a callback(null, user)
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); } //database not available err
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(express.static(__dirname + '/../react-client/dist'));

//michael new
//


//handles a login attempt from the front end
//returns 401 unauthorized if fails
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

//subsequent requests while logged in are the unique cookie that
//identifies the session. serialize user instances to and from the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

