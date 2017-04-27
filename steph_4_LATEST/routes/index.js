var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// homepage setup
router.get('/', function (req, res) {
  res.render('home', { 
  	error: req.flash('error'),
  	loggedIn: !!req.user
  });
});

// register page setup
router.get('/register', function (req, res) {
  res.render('register', { message: req.flash('message') });
});

// login page setup
router.get('/login', function (req, res) {
  res.render('login', { error: req.flash('error') });
});

// logout function setup
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


// local API route
router.get('/calendar', function (req, res) {
	res.render('calendar');
});

router.get('/api/events', function (req, res) {
	res.status(200).send([
		{
			title: "event 1",
			start: "2017-04-25",
			allDay: true
		},
		{	
			title: "event 2",
			start: "2017-04-27T9:00:34",
			end: "2017-04-27T15:00:34"
		},
		{	
			title: "event 3",
			start: "2017-04-29T9:00:34",
			url: "https://www.google.com/"
		}
		]);
});

// register post
router.post('/register', function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var groupName = req.body.groupName;
  var email = req.body.email;
  var password = req.body.password;

  var newUser = new User({
  	firstName: firstName,
  	lastName: lastName,
  	groupName: groupName,
  	email: email,
  	password: password
  });

  newUser.save(function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    // req.flash('message', 'You have successfully registered!');
    req.session.flash = {
        type: 'success',
        intro: 'You have successfully registered!',
        message: ' You can now login'
    }
    res.redirect('/login');
  });
});

// login post & auth
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Invalid login information' //sets the error message
}), function (req, res) {
	res.redirect('/');
});

// passport config
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},

function (req, email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
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

// Authentication needed for access to certain pages
// router.get('/home', isAuthenticated, function(req, res){
//   res.render('home', { user: req.user });
// });
 
// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
// }