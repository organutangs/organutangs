var express = require('express');
var meetings = require('../database-mongo/models/user');

const router = express.Router();

// Creating a new meeting/checking if meeting exists?
router.post('/meetings', function (req, res) {
  console.log('meetings post');
  res.send();
  // var meeting = new Meeting({  })
});

// Getting the results of the match
// router.get('/matches', function (req, res) {
// });

module.exports = router;