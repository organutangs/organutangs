var express = require('express');
var Meeting = require('../database-mongo/models/meeting.js');

const router = express.Router();

// Creating a new meeting/checking if meeting exists?
router.post('/meetings', function (req, res) {
  const { userId, userLocation, friendId } = req.body;
  var newMeeting = new Meeting({ userId, userLocation, friendId });
  newMeeting.save((err) => {
    if (err) {
      return console.error(err);
    } else {
      console.log('New meeting saved!')
    }
  });
  // res.statusCode(201);
  res.send();
});

// Getting the results of the match
// router.get('/matches', function (req, res) {
// });

module.exports = router;