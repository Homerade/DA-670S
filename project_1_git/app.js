var express = require('express');
var app = express();
// var favicon = require('serve-favicon');

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// establish "public directory" in express
app.use(express.static('public'));

// app.use(favicon(path.join('public', 'favicon.ico')));


//--------Routes--------//

//setting up the '/' (home) page
app.get('/', function(request,response){
	
	var data = {
		name: 'BLOCS',
		principleNav: 'What is Blocs?',
		signInNav: 'Sign In',
		registerNav: 'Register'
	};

	response.render('home', data);

});

app.get('/page2', function(req,res){
	res.send('This could be your page 2')
});

//--------web server setup----------
app.listen(3000, function() {
	console.log('Listening on port 3000');
});