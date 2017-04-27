var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Event = require('../models/event');

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

// add event page
router.get('/addevent', function (req, res) {
  res.render('addEvent');
});


// local API route
router.get('/calendar', function (req, res) {
	res.render('calendar');
});

router.get('/api/events', function (req, res) {
  Event.find({}, function (err, events) {
    if (err) {
      res.sendStatus(500);
    }
  	res.send(events);
  });
});

// event post
router.post('/addEvent', function (req, res) {
  var title = req.body.title;
  var start = req.body.start;
  var eventGroup = req.body.eventGroup;
  var url = req.body.url;

  var newEvent = new Event({
    title: title,
    start: start,
    eventGroup: eventGroup,
    url: url
  });

  newEvent.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.redirect('calendar');
  });
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
        message: 'You can now login'
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