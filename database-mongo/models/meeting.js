const mongoose = require('mongoose');

var schema = mongoose.Schema;

//this schema is used to set up a meeting
var MeetingSchema = schema({
  meetingId: schema.Types.ObjectId,
  userId: Number,
  userLocation: { address: String, coordinates: [ Number, Number ] },
  friendLocation: String,
  friendId: Number,
  createdAt: Date
});

// pre save hook
MeetingSchema.pre('save', function(next) {
  console.log('this.userLocation', this.userLocation);
  // var err = new Error('something went wrong');
  next();
});

var Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;