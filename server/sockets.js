//Models
var Meeting = require('../database-mongo/models/meeting.js');
var Match = require('../database-mongo/models/match.js');

//APIs
const gmaps = require('./google-maps.js');
const yelp = require('./yelp.js');

var socketInstance = function(io){
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('user looking for friend', function (meeting) {

      // Room set-up (rooms are naively set as sorted and joined names e.g. 'alicebob')
      var sortedPair = [meeting.friendId, meeting.userId].sort();
      var room = sortedPair.join('');
      console.log('\n * ** room', room);
      socket.join(room);

      Meeting.findOne({userId: meeting.friendId, friendId: meeting.userId})
        .exec(function (err, doc) {
          if (err) return console.error('Err', err);
          if (doc) {
            // Match found! Insert match into the db.
            // socket.broadcast.emit('match status', 'found');
            console.log('found a match');
            console.log('socket.rooms', socket.rooms);
            socket.to(room).emit('match status', 'your match was found.'); // should revise message
            var newMatch = new Match({
              userId1: meeting.userId,
              userId2: meeting.friendId,
              matchFulfilled: true
            });

            // Get location 1
            var friendLocation = doc.userLocation;

            // Get location 2
            // - Need to pull the other friend's geocoded location from db
            Meeting.findOne({userId: meeting.userId})
              .exec(function (err, doc) {
                var userLocation = doc.userLocation;

                gmaps.generateMidpoint(userLocation.coordinates, friendLocation.coordinates)
                  .then((midpoint) => {
                    console.log('Midpoint generated:', midpoint);

                    yelp.yelpRequest(midpoint)
                      .then((res) => {
                        // re-render
                        io.sockets.emit('meeting locations', res);
                      });
                  });
              });

          } else {
            console.log(`User ${meeting.friendId} and Friend ${meeting.userId} match not found in db.`);
            // TODO somehow print "Looking for your friend"
            socket.to(room).emit('match status', 'Looking for your friend.');
          }
        });
    });

    socket.on('disconnect', function () {
      // TODO update socket_id db
      console.log('a user disconnected');
    });
  });
};

module.exports = socketInstance;