//middleware
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');

//database
var result = require('../database-mongo');

//middleware
var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//need a get request for results,  and a post request for new meeting, post for signup, get for login, get for each page
//need to create a request handler

//getting the results of the match
app.get('/results', function (req, res) {
  result.Match(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//getting the user info
app.get('/users', function (req, res) {
  result.Match(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//creating a new meeting/checking if meeting exists?
app.post('/meetings', function (req, res) {
  result.Match(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//create a new user
app.post('/users', function (req, res) {
  result.Match(function(err, data) {
    if(err) {
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

