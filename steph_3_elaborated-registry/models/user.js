var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  groupName: { type: String, unique: true },
  username:  { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

// Registration and Authenication functions
module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  User.findById(id, callback);
};

module.exports.checkPassword = function (enteredPassword, hash, callback) {
  bcrypt.compare(enteredPassword, hash, function (err, isValidPassword) {
    if (err) throw err;
    callback(null, isValidPassword);
  });
};
