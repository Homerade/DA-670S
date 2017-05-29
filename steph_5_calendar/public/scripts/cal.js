var eventsUrl = '/api/events' + window.location.search

$('#calPage').fullCalendar({
    timezone: 'local',
    events: eventsUrl,
    header: {
    	left: 'prev, today, next',
    	center: 'title',
    	right: 'basicDay, month, year, listYear'
    },
    timeFormat: 'h(:mm)t',
    selectable: true,

    eventMouseover: function ( calEvent, jsEvent, view ) {
    	$(this).css('cursor', 'pointer');
    },

	eventClick: function ( calEvent, jsEvent, view ) {
		$('.test').remove();

		jsEvent.preventDefault();
		
	    $(this).addClass('eventSelect').append('<span class="test"><div class="closebtn"></div><p><b>Event:</b> '+ calEvent.title +
    		'</p><p><b>Date:</b> '+ calEvent.start.format('MMM Do') +
    		'</p><p><b>Time:</b> '+ calEvent.time +
    		'</p><p><b>Hosted By:</b> '+ calEvent.eventGroup +
    		(calEvent.url && '<p><b>Link: </b><a href>'+calEvent.url +'</a></p>' || '') +
    		'</p><p><b>Meeting at:</b> '+ calEvent.meetAddress + ' ' + calEvent.meetCity + ' ' + calEvent.meetState + ' ' + calEvent.meetZip +
    		'</p></span>');

	   
	    $('.closebtn').on("click", function () {
	    	$(this).parent('.test').remove();
	    });

   	},   

  });


if (window.location.search) {
    $('#calPage').fullCalendar('changeView', 'listYear');
}	
	