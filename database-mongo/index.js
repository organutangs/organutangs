var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var meetSchema = mongoose.Schema({
  userId: Number,
  currLocation: String,
  friendId: Number,
  createdAt: Date
});

var resultsSchema = mongoose.Schema({
  meetingId: Number,
  matchFulfilled: Boolean,
  results: String
})

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;