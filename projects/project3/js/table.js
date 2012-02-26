$(document).ready(function() {

	$("#pageDisplay").live("change", function() {
		console.log('adding lightbox');
		addLightbox();
		console.log('lightbox added');
	});
});
function addTableSort(which) {
	// add tablesorter class
	$(which).addClass('tablesorter');
	
	// create the pager div
	var pager = '<div class="tablesorterPager pager">';
	pager += '<form>';
	pager += '<img src="img/first.png" class="first"/>';
	pager += '<img src="img/prev.png" class="prev"/>';
	pager += '<input id="pageDisplay" readonly="readonly" type="text" class="pagedisplay"/>';
	pager += '<img src="img/next.png" class="next"/>';
	pager += '<img src="img/last.png" class="last"/>';
	pager += '<select class="pagesize">';
	pager += '<option selected="selected"  value="10">10</option>';
	pager += '<option value="20">20</option>';
	pager += '<option value="30">30</option>';
	pager += '<option  value="40">40</option>';
	pager += '</select>';
	pager += '</form>';
	pager += '</div>';

	// append to which
	$(which).parent().append(pager);

	$(which).tablesorter({
		widthFixed : false,
		widgets : ['zebra']
	}).tablesorterPager({
		container : $(which).parent().find('.tablesorterPager').first()
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
		if(text.toUpperCase() == "NAME") {
			// as em
			var nameLength = 20;

			// expand
			$(this).width(parseFloat($(nameLength).toPx()));
		}

		// give City some room
		if(text.toUpperCase() == "CITY") {
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