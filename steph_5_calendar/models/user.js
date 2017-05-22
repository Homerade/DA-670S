var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

function toLowercase (v) {
	return v.toLowercase();
}

var UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  groupName: { type: String },
  email: { type: String, set: toLowercase, required: true, unique: true },
  password: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
