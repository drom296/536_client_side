/**
 * @author tuxedo
 */


function getData(orgId){
	// do something
}

// perform JavaScript after the document is scriptable.
$(document).ready(function() {
	// setup ul.tabs to work as tabs for each div directly under div.panes
	$("ul.tabs").tabs("div.panes > div");
});
