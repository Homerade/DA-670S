$('#calPage').fullCalendar({
    events: '/api/events',
    header: {
    	left: 'prev, today, next',
    	center: 'title',
    	right: 'basicDay, month, year, listYear	'
    },
    eventClick: function (calEvent, jsEvent, view) {
    	alert(
    		'Event: ' + calEvent.title + 
    		'Date and Time: ' + calEvent.start +
    		'Hosted by: ' + calEvent.eventGroup +
    		'Event link: ' + calEvent.url
    		);
    },
});