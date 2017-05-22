$('#nextBtn').on('click', function(e) {
	e.preventDefault();
	$('#addEventForm').addClass('hidden');
	$('#addEventForm2').removeClass('hidden');
});

$('#backBtn').on('click', function() {
	$('#addEventForm2').addClass('hidden');
	$('#addEventForm').removeClass('hidden');
});