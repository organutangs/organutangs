var express = require('express');
var meetings = require('../database-mongo/models/user');

const router = express.Router();

// Creating a new meeting/checking if meeting exists?
router.post('/meetings', function (req, res) {
  console.log('meetings post');
  var meeting = new Meeting({  });

  res.statusCode(201);
  res.send();
});

// Getting the results of the match
// router.get('/matches', function (req, res) {
// });

module.exports = router;