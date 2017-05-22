$('#zipGo').on('click', function(e) {
	e.preventDefault();
	window.location.href = '/calendar?meetZip=' + $("input[name=locationInput]").val(); 
});

$('#issueGo').on('click', function(e) {
	e.preventDefault();
	window.location.href = '/calendar?issueCat=' + $("input[name=issueInput]").val(); 
});