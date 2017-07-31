var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

//this schema creates the users

var userSchema = mongoose.Schema({
  userID: Number,
  userName: String,
  userPassword: String,
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
  results: String,
  createdAt: Date
})


var Meet = mongoose.model('Meet', meetSchema);
var Result = mongoose.model('Result', resultSchema);
var User = mongoose.model('User', userSchema);
//functions for using database

//returns the match once the both locations have come in
var Match = function(callback) {
  Result.find({}, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//creates a new User
var newUser = function(name, pwd, callback){

};

//converts a meeting into a result
var newResult = function(meeting, callback){

};
//creates a new meeting based on location
var newMeeting = function(user, friend, userLoc, callback) {

};

//check if the meeting already exists, may not be necessary as a separate function
var checkExisting = function(callback){

};

module.exports.Match = Match;