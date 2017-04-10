var mongoose = require('mongoose');

var regSchema = mongoose.Schema ({
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
	reEnterEmail: { type: String, required: true },
	username: { type: String, unique: true },
	password: {type: String, required: true }
});

var Registration = mongoose.model('Registration', regSchema);
module.exports = Registration;