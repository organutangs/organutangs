//middleware
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');

//database
var items = require('../database-mongo');

//middleware
var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


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

