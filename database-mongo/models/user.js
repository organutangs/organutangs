const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: true
  },
  password: {
    type: String
  }
});

UserSchema.methods = {

  createUser: function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  },

  getUserByUsername: function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
  },

  getUserById: function(id, callback) {
    User.findById(id, callback);
  },

  comparePassword: function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) {
        throw err;
      }
      callback(null, isMatch);
    });
  }

};

var User = module.exports = mongoose.model('User', UserSchema);
