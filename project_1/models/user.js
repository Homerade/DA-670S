var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = {
	username: 'test-user',
	password: 'test-password',
	id: 1
};

passport.use(new LocalStrategy(
	function(username, password, done) {
		findUser(username, function (err, user) { //should be from the db, no?
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (password !== user.password) {
				return done(null, false);
			}
			return done(null, user);
		});	
	};
));