var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// homepage setup
router.get('/', function (req, res) {
	res.render('home', { error: req.flash('error') });
});

// register page setup
router.get('/register', function (req, res) {
	res.render('register');
});

// login page setup
router.get('/login', function (req, res) {
	res.render('login', { error: req.flash('error') });
});

// logout function setup
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// register post
router.post('/register', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

  
   	var newUser = new User ({
    	username: username,
    	password: password
    });

	newUser.save(function (err) {
		if (err) {
			res.status(500).send({ message: err.message});
			return 
		}
		req.flash('message', 'You have successfully registered!');

		res.redirect('/');
	});	
});

// login post & auth
router.post('/login', passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Info not valid'
}), function (req, res) {
		req.flash('error', 'Invalid info');
		res.redirect('/');		
	});

// passport config
passport.use(new LocalStrategy('local',
	function (username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) {
				return done(err)
			}
			if (!user || user.password !== password) {
				return done(null, false);
			}
			done(null, user);
		});
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});


module.exports = router;




