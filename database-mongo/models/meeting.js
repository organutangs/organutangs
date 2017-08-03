const mongoose = require('mongoose');
const config = require('../../server/config.js');
var http = require('http');
var schema = mongoose.Schema;
var axios = require('axios');

//this schema is used to set up a meeting
var MeetingSchema = schema({
  meetingId: schema.Types.ObjectId,
  userId: String,
  userLocation: { address: String, coordinates: [ Number, Number ] },
  friendId: String,
  updated: { type: Date, default: Date.now }
});

// pre save hook
MeetingSchema.pre('save', function(next) {
  var APIKEY = config.google.APIKEY;
  // Replaces spaces in path with %20
  var address = encodeURIComponent((this.userLocation.address).trim());
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKEY}`

  axios.get(geocodeUrl)
    .then((res) => {
      var lat = res.data.results[0].geometry.location.lat;
      var lng = res.data.results[0].geometry.location.lng;
      this.userLocation.coordinates = [ lat, lng ];
      next();
    })
    .catch((err) => console.error(err));
});

var Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;