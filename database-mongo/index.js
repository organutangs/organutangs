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
var meetingSchema = mongoose.Schema({
  userId: Number,
  currLocation: String,
  friendId: Number,
  friendLocation: String,
  createdAt: Date
});
//This schema is used to record a meeting and provide users with the results of the new meeting query
var resultSchema = mongoose.Schema({
  // meetingId: Number,
  matchFulfilled: Boolean,
  results: String,
  createdAt: Date
})

//table declarations?
var Meet = mongoose.model('Meeting', meetingSchema);
var Result = mongoose.model('Result', resultSchema);
var User = mongoose.model('User', userSchema);

//----------------------------
//functions for using database
//----------------------------

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
  var user = new User({userName: name, userPassword: pwd});
};

//converts a meeting into a result
var newResult = function(meeting, callback){

};
//creates a new meeting based on location
var newMeeting = function(user, friend, userLoc, callback) {
  if(checkExisting(user, friend, userLoc) !== true){ //FIX_ME
  var meeting = new Meeting ({userId: user, currLocation: userLoc, friendId: friend});

  } else {
    //find which location is blank, fill with userLoc

  }
};

//check if the meeting already exists, may not be necessary as a separate function
var checkExisting = function(user, friend, userLoc, callback){

  //for the given user and friend
    //check if any meeting has those two ids
    // return true

  return false; //FIX_ME
};

module.exports.Match = Match;
module.exports.newResult = newResult;
module.exports.newMeeting = newMeeting;
module.exports.newUser = newUser;