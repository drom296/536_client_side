function addTableSort() {
	$("table").tablesorter({
		widthFixed : false,
		widgets : ['zebra']
	}).tablesorterPager({
		container : $("#pager")
	});

	// try to fix columns that are too small to include the background image
	$("th.header").each(function() {
		// minimum length as em
		var minLen = 5;

		// get this content
		var text = $(this).text();

		// get the width (returns it as px)
		var x = $(this).width();

		// convert to em
		x = parseFloat($(x).toEm());

		// check if their length is less then our minLen
		if(x < minLen) {
			// set to min length
			$(this).width(parseFloat($(minLen).toPx()));
		}
		
		// give name some room
		if(text.toUpperCase()=="NAME"){
			// as em
			var nameLength = 20;
			
			// expand
			$(this).width(parseFloat($(nameLength).toPx()));
		}
		
		// give City some room
		if(text.toUpperCase()=="CITY"){
			// as em
			var nameLength = 10;
			
			// expand
			$(this).width(parseFloat($(nameLength).toPx()));
		}
		
	});
}

function addLightbox() {
	$("a.orgLink").fancybox({
		'transitionIn' : 'elastic',
		'transitionOut' : 'fade',
		'overlayColor' : '#000',
		'titlePosition' : 'outside',
		'speedIn' : 200,
		'speedOut' : 150,
		'overlayOpacity' : 0.9
	});

}