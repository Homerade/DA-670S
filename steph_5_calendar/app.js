var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
// var favicon = require('serve-favicon'); with installed and in package.json

// view engine setup
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MongoDB
var credentials = require('./credentials.js');
mongoose.connect(credentials.mongo);

// models
var User = require('./models/user.js');

// .uses
app.use(require('body-parser').urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cookieParser());
// establish "public directory" in express
app.use(express.static('public'));

// express session
app.use(session({
  secret: 'mySecretKey',
  saveUninitialized: true,
  resave: true
}));

// flash middleware
app.use(flash());

app.use(function (req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serializing user: ', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log('deserializing user: ', user);
    done(err, user);
  });
});

var routes = require('./routes/index');
app.use('/', routes);

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

// --------web server setup---------- //
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
