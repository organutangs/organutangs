var express = require('express');
var Meeting = require('../database-mongo/models/meeting.js');
const router = express.Router();

router.post('/meetings', function (req, res) {
  const { userId, userLocation, friendId } = req.body;
  var newMeeting = new Meeting({ userId, userLocation, friendId });
  newMeeting.save((err) => {
    if (err) {
      console.error("unicorn", err);
      res.status(401).send('User already exists!');
    } else {
      console.log('New meeting saved!');
      res.send();
    }
  });
});

// Getting the results of the match
// router.get('/matches', function (req, res) {
// });

module.exports = router;