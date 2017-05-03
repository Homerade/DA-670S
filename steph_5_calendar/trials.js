eventClick: function (calEvent, jsEvent, view) {
    	alert(
    		'Event: ' + calEvent.title + 
    		'Date and Time: ' + calEvent.start +
    		'Hosted by: ' + calEvent.eventGroup +
    		'Event link: ' + calEvent.url
    		);
    },

     function ( event, jsEvent, view ) {
    	// $(this).append('<div class='tooltip'><p>Event:' + calEvent.title + '</p><p>Date and Time:' + calEvent.start + '</p><p>Link:' +calEvent.url + '</p></div>');
    	$(this).append('<div><p>Event</p></div>');
    }

    $(this).append('<div class='tooltip'><p>Event:' + calEvent.title + '</p><p>Date and Time:' + calEvent.start + '</p><p>Link:' +calEvent.url + '</p></div>');


//these worked
    eventClick: function ( calEvent, jsEvent, view ) {
    	$(this).css('background-color', '#e44850');
    }

    eventClick: function ( calEvent, jsEvent, view ) {
    	$(this).append('<div class="test"><p>Event</p></div>');
    }

// didn't work:
	eventClick: function ( calEvent, jsEvent, view ) {
		if ($(this).hasClass('test')) {
			$(this).children("ul").remove();	
			//then:
	    	$(this).addClass('eventSelect').append('<span class="test"><p>Event: '+ calEvent.title +
	    		'</p><p>Date: '+ calEvent.start +
	    		'</p><p>Hosted By: '+ calEvent.eventGroup +
	    		'</p><p>Link: '+ calEvent.url +
	    		'</p></span>');
    	}
    }    


$(document).click(function() {
	$('.fc-content').removeClass('test')
});


eventClick: function () {
    	$(body).removeClass('test');
    }	