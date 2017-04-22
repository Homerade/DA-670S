(line 35) (from brad: global vars)
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

(line 27)
app.use(require('body-parser').urlencoded({extended: false}));
or 
true

(line 75)
passport.use('register', new LocalStrategy({
  passReqToCallback: true
},
function(req, username, password, done) {
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
        } else {
          newUser.groupName = req.param('groupName');
          newUser.taxIdNum = req.param('taxIdNum');
        }
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

(line 103)
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

(line 167)
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





router.post('/register', function (req, res) {
  var individual = req.body.indieRadio;
  var group = req.body.groupRadio,
    var individualReg: [
      firstName: req.body.firstName,
      lastName: req.body.lastName
    ],
    groupReg: {
      var groupName: req.body.groupName,
      var taxIdNum: req.body.taxIdNum
    },
    var email: req.body.email,
    var username: req.body.username,
    var password: req.body.password

    if (err){
      throw err;
    } else {