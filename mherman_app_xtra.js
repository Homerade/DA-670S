//setting up the '/' (home) page
app.get('/', function(request,response){
	//determine if user is logged in and adjust nav accordingly
	if (!user) {
		var data = {
			principleNav: "What is Blocs?",
			nav1: "<a href='/login'>Sign In</a>",
			divider: '|',
			nav2: "<a href='/register'>Register</a>"
		};
	}
	var data = {
		principleNav: "What's New",
		signInNav: "<a href='/account'>My Account</a>",
		divider: '|',
		registerNav: "<a href='/logout'>Logout</a>"
	};

	response.render('home', data);

});