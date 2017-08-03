//middleware
var express = require('express');

var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var app = express();
const gmaps = require('./google-maps.js');
const yelp = require('./yelp.js');

//Routes
var users = require('./users.js');
var routes = require('./routes.js');

//Models
var Meeting = require('../database-mongo/models/meeting.js');
var Match = require('../database-mongo/models/match.js');

// Socket set-up
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('user looking for friend', function(meeting) {
    console.log('meeting', meeting);
    var sortedPair = [meeting.friendId, meeting.userId].sort();
    socket.join(sortedPair.join(''));

    //maybe TODO: convert names to ids
    socket.broadcast.emit('match status', 'pending'); // should revise message

    Meeting.findOne({ userId: meeting.friendId, friendId: meeting.userId })
      .exec(function(err, doc) {
        if (err) return console.error('Err', err);
        if (doc) {
          console.log(doc.userLocation);

          // Match found! Insert match into the db.
          socket.broadcast.emit('match status', 'found');
          var newMatch = new Match({
            userId1: meeting.userId,
            userId2: meeting.friendId,
            matchFulfilled: true
          });

          // get the two locations
          var friendLocation = doc.userLocation;

          Meeting.findOne({ userId: meeting.userId })
            .exec(function(err, doc) {
              var userLocation = doc.userLocation;
              console.log('userLocation', userLocation);
              console.log('friendLocation', friendLocation);

              gmaps.generateMidpoint(userLocation.coordinates, friendLocation.coordinates)
                .then((midpoint) => {
                  console.log('midpoint', midpoint);

                  yelp.yelpRequest(midpoint)
                    .then((res) => {
                      console.log('meetingLocations', res);

                      // re-render
                      io.sockets.emit('meeting locations', res);
                    });

                });



            });

        } else {
          console.log(`User ${meeting.friendId} and Friend ${meeting.userId} match not found in db.`)
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