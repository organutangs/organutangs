const mongoose = require('mongoose');

var schema = Mongoose.Schema;

//This schema is used to record a meeting and provide users with the results of the new meeting query
var MatchSchema = schema({
  matchId: schema.Types.ObjectId,
  meetingId: String,
  matchFulfilled: Boolean,
  results: String,
  createdAt: Date
});


mongoose.model('Result', MatchSchema);