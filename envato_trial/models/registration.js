var mongoose = require('mongoose');

var regSchema = mongoose.Schema({
  individual: Boolean,
  group: Boolean,
  individualReg: {
    firstName: String,
    lastName: String
  },
  groupReg: {
    groupName: String,
    taxIdNum: Number
  },
  email: { type: String, required: true, unique: true },
  ReEnterEmail: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String, required: true }
});

var User = mongoose.model('User', regSchema);
module.exports = User;
Z