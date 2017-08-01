const mongoose = require('mongoose');

//This schema is used to record a meeting and provide users with the results of the new meeting query
var MatchSchema = mongoose.Schema({
  meetingId: String,
  matchFulfilled: Boolean,
  results: String,
  createdAt: Date
});


var Result = mongoose.model('Result', MatchSchema);