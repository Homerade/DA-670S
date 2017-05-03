$('#calPage').fullCalendar({
    events: '/api/events',
    header: {
    	left: 'prev, today, next',
    	center: 'title',
    	right: 'basicDay, month, year, listYear'
    },

    eventMouseover: function ( calEvent, jsEvent, view ) {
    	$(this).css('cursor', 'pointer');
    },

	eventClick: function ( calEvent, jsEvent, view ) {
		if ($(this).hasClass('test')) {
			$(this).empty();	
			//then:
	    	$(this).addClass('eventSelect').append('<span class="test"><p>Event: '+ calEvent.title +
	    		'</p><p>Date: '+ calEvent.start +
	    		'</p><p>Hosted By: '+ calEvent.eventGroup +
	    		'</p><p>Link: '+ calEvent.url +
	    		'</p></span>');
    	}
    }

});