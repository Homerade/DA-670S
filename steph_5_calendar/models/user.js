var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  groupName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
