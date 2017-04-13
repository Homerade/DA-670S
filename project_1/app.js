var express = require('express');
var app = express();
var fs = require('fs'); // file system
var mongoose = require('mongoose');
// var favicon = require('serve-favicon'); //with installed and in package.json

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// establish "public directory" in express
app.use(express.static('public'));

// app.use(favicon(path.join('public', 'favicon.ico')));
// OR
// app.use(favicon(__dirname + '/public/favicon.ico'));

// body parser
app.use(require('body-parser').urlencoded({extended: true}));

// MongoDB
var credentials = require('./credentials.js');
mongoose.connect(credentials.mongo);

// passport config
var Registration = require('./models/registration.js');

// --------Routes--------//

// setting up the '/' (home) page
app.get('/', function (request, response) {
  var data = {
    principleNav: "What is Blocs?",
    signInNav: 'My Account',
    divider: '|',
    registerNav: 'Logout'
  };

  response.render('home', data);
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/thankyou', function (req, res) {
  res.render('thankyou');
});

app.post('/register', function (req, res) {
  new Registration({
    individual: req.body.indieRadio,
    group: req.body.groupRadio,
    individualReg: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName
    },
    groupReg: {
      groupName: req.body.groupName,
      taxIdNum: req.body.taxIdNum
    },
    email: req.body.email,
    username: req.body.username,
    password: req.body.password

  }).save(function (err) {
    if (err) { console.log(err); }
    res.redirect('/');
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500 server error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// --------web server setup----------
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
