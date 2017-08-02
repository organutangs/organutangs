//middleware
var express = require('express');

var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var app = express();

//Routes
var users = require('./users.js');
var routes = require('./routes.js');

//Models
var Meeting = require('../database-mongo/models/meeting.js');

// Socket set-up
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('user looking for friend', function(userFriend) {
    console.log('user', userFriend[0]);
    console.log('friend', userFriend[1]);

    // TODO: convert names to ids

    Meeting.findOne({ userId: userFriend[1], friendId: userFriend[0] })
      .exec(function(err, doc) {
        if (err) return console.error('Err', err);
        if (doc) {
          console.log(doc.userLocation);
          // match found!
          //TODO: update userLocation and friendLocation in db
          // get id of match
          // TODO: insert "match fulfilled" in db
          // TODO: get midpoints of locations
          // midpoint = generateMidpoint(userLocation.coordinates, friendLocation.coordinates)
          // yelpRequest(midpoint)
          // re-render -- how do you re-render from server?
          // client.on('
        } else {
          console.log(`User ${userFriend[1]} and Friend ${userFriend[0]} match not found in db.`)
          // TODO somehow print "Looking for your friend"
        }
      });
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

//Middleware
app.use(passport.initialize());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

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

app.use('/users', users);
app.use('/', routes);
app.use(express.static(__dirname + '/../react-client/dist'));

http.listen(3000, function(){
  console.log('socket listening on *:3000');
});