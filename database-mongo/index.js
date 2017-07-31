var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});
//this schema is used to set up a meeting
var meetSchema = mongoose.Schema({
  userId: Number,
  currLocation: String,
  friendId: Number,
  createdAt: Date
});
//This schema is used to record a meeting and provide users with the results of the new meeting query
var resultSchema = mongoose.Schema({
  meetingId: Number,
  matchFulfilled: Boolean,
  results: String
})

var Meet = mongoose.model('Meet', meetSchema);
var Result = mongoose.model('Result', resultSchema);
//
var selectAll = function(callback) {
  meet.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;