const mongoose = require('mongoose');

//this schema is used to set up a meeting
var MeetingSchema = mongoose.Schema({
  meetingId: ObjectId,
  userId: Number,
  currLocation: String,
  friendId: Number,
  createdAt: Date
});

var Meeting = mongoose.model('Meeting', MeetingSchema);