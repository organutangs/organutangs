const mongoose = require('mongoose');

var schema = mongoose.Schema;

//this schema is used to set up a meeting
var MeetingSchema = schema({
  meetingId: schema.Types.ObjectId,
  userId: Number,
  userLocation: String,
  friendLocation: String,
  friendId: Number,
  createdAt: Date
});

var Meeting = module.exports = mongoose.model('Meeting', MeetingSchema);