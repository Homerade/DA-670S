var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var expressSession = require('express-session');
var bCrypt = require('bcrypt-nodejs');
// var favicon = require('serve-favicon'); with installed and in package.json

// view engine setup
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MongoDB
var credentials = require('./credentials.js');
mongoose.connect(credentials.mongo);

// app.use(favicon(path.join('public', 'favicon.ico')));
// OR
// app.use(favicon(__dirname + '/public/favicon.ico'));

// .uses
app.use(require('body-parser').urlencoded({extended: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// establish "public directory" in express
app.use(express.static('public'));
// flash middleware
app.use(flash());

// models
var User = require('./models/user.js');

// passport config
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serializing user: '); console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log('deserializing user:', user);
    done(err, user);
  });
});

// login(passport);
// register(passport);

// initPassport(passport);

// ---------------------------Routes--------------------------- //

// --------homepage--------//

// authentication
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

app.get('/', isAuthenticated, function (req, res) {
  var data = {
    principleNav: 'What is Blocs?',
    nav1: 'Sign In',
    divider: '|',
    nav2: 'Register'
  };
  res.render('home', data, { user: req.user });
});

// --------register page & function--------//

app.get('/register', function (req, res) {
  res.render('register', { message: req.flash('message') }); // <= don't know what this is, took it from source code
});

passport.use('register', new LocalStrategy({
  passReqToCallback: true
},
function (req, username, password, done) {
  var findOrCreateUser = function () {  // I added the 'var' bc I was getting an 'undefined' lint error
    // find a user in Mongo with provided username
    User.findOne({ 'username': username }, function (err, user) {
     // In case of any error return
      if (err) {
        console.log('Registration Error: ' + err);
        return done(err);
      }
     // already exists
      if (user) {
        console.log('User already exists');
        return done(null, false, req.flash('message', 'User already exists'));
      } else {
      // if there is no user with that email, create user
        var newUser = new User();
      // set the user's credentials
        newUser.userType = req.param('individual' || 'group');
        if (User.individual) {
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');
          newUser.email = req.param('email');
          newUser.reEnterEmail = req.param('reEnterEmail');
          newUser.username = username;
          newUser.password = createHash(password);
        }
        newUser.groupName = req.param('groupName');
        newUser.taxIdNum = req.param('taxIdNum');
        newUser.email = req.param('email');
        newUser.reEnterEmail = req.param('reEnterEmail');
        newUser.username = username;
        newUser.password = createHash(password);

      // save new user
        newUser.save(function (err) {
          if (err) {
            console.log('Error in saving user: ' + err);
            throw err;
          }
          console.log('User registration successful');
          return done(null, newUser, req.flash('message', 'Registration Successful!'));
        });
      }
    });
  };
  // Delay the execution of findOrCreateUser and execute the method
  // in the next tick of the event loop
  process.nextTick(findOrCreateUser);
})
);

// Generates hash using bCrypt
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

app.post('/register', passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}));

// --------login page & function--------//

app.get('/login', function (req, res) {
  res.render('login', { message: req.flash('message') });
});

passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
  function (req, username, password, done) {
    // check mongo if a user with username exists or not
    User.findOne({ 'username': username },
      function (err, user) {
        // In case of any error, return using the done method
        if (err) { return done(err); }
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User not found with username ' + username);
          return done(null, false, req.flash('message', 'User not found'));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false, req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
  }));

var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};

app.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// --------logout--------//

app.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

// --------error handlers--------//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// --------web server setup---------- //
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
