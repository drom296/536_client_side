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

		updateCounty(state);
		updateCity(state, county);

	});
	// This was done to simulate a submit without clicking the Search Results button
	// this might be slow
	$('#searchForm input').keydown(function(e) {
		if(e.which == 13) {
			// the enter key was pressed
			// start a search
			search();
		}
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

function getInputString() {
	var result = "";

	// get type
	var type = $("#type").val();
	// get Name
	var name = $("#name").val();
	// get State
	var state = $("#state").val();
	// get City
	var town = $("#town").val();
	// get County
	var county = $("#county").val();
	// get zipcode
	var zip = $("#zip").val();

	var inputArray = {
		"Type" : type,
		"Name" : name,
		"state" : state,
		"Town" : town,
		"County" : county,
		"Zip Code" : zip
	};

	// loop thru array
	for(key in inputArray) {
		// add delimiter for more than one input
		if(result.length > 0 && inputArray[key].length > 0) {
			result += " > ";
		}

		// display input value if we have something
		if(inputArray[key].length > 0) {
			result += key + ": " + inputArray[key];
		}

	}

	return result;

}

function search() {
	myAjax('get', {
		path : "/Organizations?" + $("#searchForm").serialize()
	}, searchCallback);

	hideSearch();

	return false;
}

function hideSearch() {
	$('#formFields').fadeOut('fast', function() {
		// Animation complete.

		//change the text on the submit
		$('#showResultsInput').attr("value", "Show Search Criteria");

		// change the action on the submit
		$("#showResultsInput").attr("onclick", "showSearch()");

		// hide the reset button
		$("#showResultsInput").next().hide();
	});
}

function showSearch() {
	// fade in the search criteria
	$('#formFields').fadeIn('fast', function() {

		// change the text of the submit
		$('#showResultsInput').attr("value", "Show Results");

		// change the action of the submit
		$("#showResultsInput").attr("onclick", "hideSearch();search();");

		// show the reset button
		$("#showResultsInput").next().show();

		// remove any errors from before
		$('#output').find('.error').first().remove();
	});
}

function searchCallback(data) {
	// if bad data
	if($(data).find('error').length != 0) {

	} else {

		// if no data
		if($('row', data).length == 0) {

			// replace with text
			var error = document.createElement("div");
			error.setAttribute("id", "output");
			var errorSpan = document.createElement("div");
			errorSpan.setAttribute("class", "error center");

			errorSpan.appendChild(document.createTextNode("No data matches for-> " + getInputString()));
			error.appendChild(errorSpan);

			// get the city select
			$("#output").replaceWith(error);

			if($('#numResults').length > 0) {
				$('#numResults').remove();
			}

		} else {
			// we have data!
			// build table

			// start the container
			var table = '<div id="output">';
			// start the table
			table += '<table id="pageTable">';
			// create head section
			table += '<thead>';
			table += "<tr>";
			table += "<th>Type</th>";
			table += "<th>Name</th>";
			table += "<th>Email</th>";
			table += "<th>City</th>";
			table += "<th>State</th>";
			table += "<th>Zip Code</th>";
			table += "<th>County</th>";
			table += "</tr>";
			table += '</thead>';

			// create body section
			table += "<tbody>";
			$('row', data).each(function() {

				var type = fixNull($.trim($(this).find("type").text()));
				var name = fixNull($.trim($(this).find("Name").text()));
				var email = fixNull($.trim($(this).find("Email").text()));
				var city = fixNull($.trim($(this).find("city").text()));
				var state = fixNull($.trim($(this).find("State").text()));
				var zip = fixNull($.trim($(this).find("zip").text()));
				var county = fixNull($.trim($(this).find("CountyName").text()));
				var id = fixNull($.trim($(this).find("OrganizationID").text()));

				if(name.length > 0) {
					table += "<tr>";
					table += "<td>" + type + "</td>";
					// add a link for the name
					table += "<td>" + '<a href="#data" class="orgLink" onclick="getData(' + id + ')" title="Information for ' + name + '">' + name + '</a>' + "</td>";
					// add a mail to for the email

					table += "<td>" + '<a href="mailto:' + email + '?Subject=' + encodeURI("question for " + name) + '">' + email + "</a>" + "</td>";
					table += "<td>" + city + "</td>";
					table += "<td>" + state + "</td>";
					table += "<td>" + zip + "</td>";
					table += "<td>" + county + "</td>";

					// table += "<td onclick=getData(" + $(this).find("OrganizationID").text() + ")>" + $(this).find('Email').text() + "</td>";
					table += "</tr>";
				}
			});
			// end table body
			table += "</tbody>";

			// end table
			table += '</table>';
			table += '</div>';

			var numResults = '<div id="numResults"><span>Results: </span>';
			numResults += $('row', data).length + " total found</div>";

			if($('#numResults').length > 0) {
				$('#numResults').replaceWith(numResults);
				numResults = "";
			}

			// output the table and the pager
			$("#output").replaceWith(numResults + table);

			// add the table sorter class
			addTableSort($('#pageTable'));

			// add lightbox
			addLightbox();
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