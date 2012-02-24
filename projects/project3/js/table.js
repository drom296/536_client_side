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

		// get the width (returns it as px)
		var x = $(this).width();

		// convert to em
		x = parseFloat($(x).toEm());

		// check if their length is less then our minLen
		if(x < minLen) {
			// set to min length
			$(this).width(parseFloat($(minLen).toPx()));
		}
	});
}