/**
 * @author Charles
 */

$(document).ready(function() {

	// add onchange to zip
	// $("#zip").change(function() {
	// updateCounty(null, $(this).val())
	// });

	// add on change to county
	$("#county").live("change", function() {
		// check to see if there is a state selected
		var state = $("#state").val();
		var county = $(this).val();

		updateCity(state, county);
	});
	// add onchange to state
	$("#state").live("change", function() {
		var state = $(this).val();
		var county = $("#count").val();

		updateCity(state, county);
		updateCounty(state);
	});
});
function updateCounty(state) {
	// make sure the parameter isnt undefined
	if(!state) {
		state = "";
	}

	// get a list of updated cities
	myAjax('get', {
		path : "/Counties?state=" + state
	}, updateCountyCallback);
}

function updateCountyCallback(data) {
	// if bad data
	if($(data).find('error').length != 0) {

	} else {
		// if no data
		if($('CountyName', data).length == 0) {
			// replace with text
			var error = document.createElement("span");
			error.setAttribute("id", "county");
			error.appendChild(document.createTextNode("No Counties available for this criteria"));

			// get the city select
			$("#county").replaceWith(error);

		} else {
			// build the select
			var select = '<select name="county" id="county">';

			// get the length of cities returned
			if($('CountyName', data).length > 1) {
				// if its more than one, then have a default all value
				select += '<option value="">All Counties';

				var state = $("#state").val();

				// check if we have a state
				if(state) {
					select += ' in ' + state
				}
				select += '</option>';
			}

			$('CountyName', data).each(function(y) {
				select += '<option value = "' + $(this).text() + '">' + $(this).text() + '</option>';
			});
			select += '</select>';

			$("#county").replaceWith(select);
		}

	}
}

function updateCity(state, county) {
	// make sure the paramaters aren't undefined
	if(!county) {
		county = "";
	}
	if(!state) {
		state = "";
	}

	// get a list of updated cities
	myAjax('get', {
		path : "/Cities?state=" + state + "&county=" + county
	}, updateCityCallback);
}

function updateCityCallback(data) {
	// if bad data
	if($(data).find('error').length != 0) {

	} else {
		// if no data
		if($(data).find('city').length == 0) {
			// replace with text
			var error = document.createElement("span");
			error.setAttribute("id", "town");
			error.appendChild(document.createTextNode("No Cities available for this criteria"));

			// get the city select
			$("#town").replaceWith(error);

		} else {
			// build the select
			var citySelect = '<select name="town" id="town">';

			// get the length of cities returned
			if($('city', data).length > 1) {
				// if its more than one, then have a default all value
				citySelect += '<option value="">All Cities';

				var county = $("#county").val();
				var state = $("#state").val();

				// check if we have a county
				if(county) {
					citySelect += ' in ' + county;
				}

				// check if we have a state
				if(state) {
					// if we dont have a county
					if(!county) {
						citySelect += ' in '
					}
					citySelect += ' ' + state
				}
				citySelect += '</option>';
			}

			$('city', data).each(function(y) {
				citySelect += '<option value = "' + $(this).text() + '">' + $(this).text() + '</option>';
			});
			citySelect += '</select>';

			$("#town").replaceWith(citySelect);
		}

	}
}

function myAjax(myType, myData, callback) {
	$.ajax({
		type : myType,
		async : true,
		cache : false,
		url : 'proxy.php',
		dataType : 'xml',
		data : myData,
		success : callback
	});
}