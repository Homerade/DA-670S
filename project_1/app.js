var express = require('express');
var app = express();
var fs = require('fs'); //file system
var mongoose = require('mongoose');
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


//--------Routes--------//

//setting up the '/' (home) page
app.get('/', function(request,response){
	
	var data = {
		principleNav: 'What is Blocs?',
		signInNav: 'Sign In',
		divider: '|',
		registerNav: 'Register'
	};

	response.render('home', data);

});

app.get('/register', function(req,res){
	res.render('register');
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

var Registration = require('./models/registration.js');

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
		if (err) { console.log(err); }
		res.redirect('/');
	});
});



//--------web server setup----------
app.listen(3000, function() {
	console.log('Listening on port 3000');
});