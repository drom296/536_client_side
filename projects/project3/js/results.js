/**
 * @author tuxedo
 */

var orgId = 1;

function fixNull(input) {
	if(!input || input == "null") {
		input = "";
	}

	return input;
}

function getData(orgId) {
	// do something

	window.orgId = orgId;

	// get/add the tabs
	myAjax('get', {
		path : "/Application/Tabs?orgId=" + orgId
	}, buildTabs);
}

function buildTabs(data) {
	// if bad data
	if($(data).find('error').length != 0) {

	} else {
		// if no data
		if($('Tab', data).length == 0) {
			// replace with text
			var error = document.createElement("span");
			error.setAttribute("id", "orgTabs");
			error.appendChild(document.createTextNode("No Tabs were found"));

			// get the city select
			$("#orgTabs").replaceWith(error);

		} else {
			// build the tabs
			var tabs = '<ul id="orgTabs" class="tabs">';

			$('Tab', data).each(function(y) {
				var tabName = $.trim($(this).text());
				tabs += '<li><a href="#' + tabName + '">' + $(this).text() + '</a></li>';
			});
			tabs += '</ul>';

			$("#orgTabs").replaceWith(tabs);

			// get data
			getTabData(window.orgId);

			// set tab width
		}
	}
}

function getTabData(orgId) {
	// get all the tabs

	// setup result container
	var panes = '<div id="orgPanes" class="panes">';

	// setup the pane structure
	$("#orgTabs li").each(function() {
		// build a div for each div
		// grab the text of li
		var type = $.trim($(this).text());
		panes += '<div id="' + type.toLowerCase() + 'Data">This is for tab: ' + type + '</div>';
	});
	panes += '</div>';

	$("#orgPanes").replaceWith(panes);

	// fill panes with real data
	$("#orgTabs li").each(function(i) {
		// fill with data

		// grab the text of li
		var type = $.trim($(this).text());

		// make a functioncall
		var command = "get" + type + "Data(" + orgId + ");";
		$.globalEval(command);
	});
	// turn on tabs
	turnOnTabs();
}

function getGeneralData(orgId) {
	var path = "/" + orgId + "/General";

	// add data
	myAjax('get', {
		path : path
	}, getGeneralDataCallback);
}

function getLocationsData(orgId) {
	var path = "/" + orgId + "/Locations";

	// add data
	myAjax('get', {
		path : path
	}, getLocationsDataCallback);
}

function getTreatmentData(orgId) {
	var path = "/" + orgId + "/Treatments";

	// add data
	myAjax('get', {
		path : path
	}, getTreatmentDataCallback);
}

function getTrainingData(orgId) {
	var path = "/" + orgId + "/Training";

	// add data
	myAjax('get', {
		path : path
	}, getTrainingDataCallback);
}

function getFacilitiesData(orgId) {
	var path = "/" + orgId + "/Facilities";

	// add data
	myAjax('get', {
		path : path
	}, getFacilitiesDataCallback);
}

function getPhysiciansData(orgId) {
	var path = "/" + orgId + "/Physicians";

	// add data
	myAjax('get', {
		path : path
	}, getPhysiciansDataCallback);
}

function getPeopleData(orgId) {
	var path = "/" + orgId + "/People";

	// add data
	myAjax('get', {
		path : path
	}, getPeopleDataCallback);
}

function getGeneralDataCallback(data) {
	console.log(data);

	// if bad data
	if($(data).find('error').length != 0) {
		console.log("There was an error")
	} else {
		// if no data
		if($('name', data).length == 0) {
			// replace with text
			var error = document.createElement("div");
			error.setAttribute("id", "generalData");
			var errorSpan = document.createElement("span");
			errorSpan.appendChild(document.createTextNode("No General Information Found"));
			error.appendChild(errorSpan);

			// get the city select
			$("#generalData").replaceWith(error);

		} else {
			// build the pane
			var pane = '<div id="generalData" class="getAutoHeight">';
			pane += "<p class='paneTitle'>General Information</p>";

			// example xml
			// <data>
			// 	<name>Some Hospital</name>
			// 	<description>Something cool here about the hospital</description>
			//	<email>sf@lkj.sdf</email>
			//	<website>http://www.rit.edu</website>
			//	<nummembers>33</nummembers>
			//	<numcalls>300</numcalls>
			// </data>

			// get data
			var name = fixNull($.trim($('name', data).text()));
			var description = fixNull($.trim($('description', data).text()));
			var email = fixNull($.trim($('email', data).text()));
			var website = fixNull($.trim($('website', data).text()));
			var numMembers = fixNull($.trim($('nummembers', data).text()));
			var numCalls = fixNull($.trim($('numcalls', data).text()));

			// we are going to build a table
			pane += '<table cellspacing="1">';
			pane += '<tbody>';
			pane += '<tr><td>Name: </td><td>' + name + '</td></tr>';
			// check if we have a valid url
			pane += '<tr><td>Website: </td>';
			if(website) {
				// add link
				pane += "<td><a href='" + website + "'>" + website + "</a>" + '</td>';
			} else {
				pane += '<td></td>';
			}
			// check if we have an email
			pane += '<tr><td>Email: </td>';
			if(email) {
				// add mailto link
				pane += "<td>" + '<a href="mailto:' + email + '?Subject=' + encodeURI("question for " + name) + '">' + email + "</a>" + "</td>";
			} else {
				pane += '<td></td>';
			}
			pane += '</tr>';
			pane += '<tr><td>Description: </td><td>' + description + '</td></tr>';
			pane += '<tr><td>Number of Members: </td><td>' + numMembers + '</td></tr>';
			pane += '<tr><td>Number of calls last year: </td><td>' + numCalls + '</td></tr>';
			pane += '</tbody>';
			pane += '</table>';
			pane += '</div>';

			$("#generalData").replaceWith(pane);
		} // if no data
	}// if error

	// turn on tabs
	turnOnTabs();
}// function

function getLocationsDataCallback(data) {

}

function getTreatmentDataCallback(data) {

}

function getTrainingDataCallback(data) {

}

function getFacilitiesDataCallback(data) {

}

function getPhysiciansDataCallback(data) {

}

function getPeopleDataCallback(data) {

}

function turnOnTabs() {
	// setup ul.tabs to work as tabs for each div directly under div.panes
	// here we did:
	// mouseover - switch tabs -> event: 'mouseover'
	// history - requires each tab to have an href
	$("ul.tabs").tabs("div.panes > div", {
		history : true
	});
}

// perform JavaScript after the document is scriptable.
$(document).ready(function() {
	turnOnTabs();
});
