var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs'); //file system
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
// var favicon = require('serve-favicon'); //with installed and in package.json

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// establish "public directory" in express
app.use(express.static('public'));

// app.use(favicon(path.join('public', 'favicon.ico')));
// OR
// app.use(favicon(__dirname + '/public/favicon.ico'));

//body parser
app.use(require('body-parser').urlencoded({extended:true}));

//MongoDB
var credentials = require('./credentials.js');
mongoose.connect(credentials.mongo);

// other .use'
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

// passport config
var Registration = require('./models/registration.js');
passport.use(new LocalStrategy(Registration.authenticate()));
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());


//--------Routes--------//

//setting up the '/' (home) page
app.get('/', function(request,response){
	//determine if user is logged in and adjust nav accordingly
	// if (!user) {
	// 	var data = {
	// 		principleNav: "What is Blocs?",
	// 		nav1: "<a href='/login'>Sign In</a>",
	// 		divider: '|',
	// 		nav2: "<a href='/register'>Register</a>"
	// 	};
	// }
	var data = {
		principleNav: "What's New",
		signInNav: "<a href='/account'>My Account</a>",
		divider: '|',
		registerNav: "<a href='/logout'>Logout</a>"
	};

	response.render('home', data);

});

app.get('/register', function(req,res){
	res.render('register', { }); //<= don't know what this is, took it from source code
});

app.get('/thankyou', function(req,res){
	res.render('thankyou');
});

// user auth via login:

// app.post('/login', function (req, res) {
// 	var username: req.body.username;
// 	var	password: req.body.password;

// 	User.findOne({username: username, password: password}, function(err, user) {
// 		if (err) {
// 			console.log(err);
// 		}
// 	})
// });

app.post('/post', function(req, res){
	new Registration({
		individual: req.body.indieRadio,
		group: req.body.groupRadio,
		individualReg: {
		FirstName: req.body.firstName,
		LastName: req.body.lastName,
		},
		groupReg: {
			groupName: req.body.groupName,
			taxIdNum: req.body.taxIdNum,
		},
		email: req.body.email,
		reEnterEmail: req.body.reEnterEmail,
		username: req.body.username,
		password: req.body.password
				
	}).save(function(err){
		if (err) { // console.log(err); }
			return res.render('register', { error : err.message });
		}
		
		// passport.authenticate('local')(req, res, () {
  //           req.session.save((err) {
  //               if (err) {
  //                   return next(err);
  //               }	
				res.redirect('/');
			});
		});
	});
// });

app.get('/login', function(req, res) {
	res.render('login', { user : req.user, error : req.flash('error')});
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
	req.session.save((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

app.get('/logout', function(req, res, next) {
	req.logout();
	req.session.save((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// 500 server error handler
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


//--------web server setup----------
app.listen(3000, function() {
	console.log('Listening on port 3000');
});


