/**
 * @author Pedro Mass
 */

var filePath = "data/dating/";

/**
 * Removes all the children, checks to see if there is data for the selection (value).
 * If there is, we dynamically create a select element and add it after the current select.
 *
 * If there is no data, a boolean of true is passed back
 *
 * @param whichSelect	- reference to the select element we wish to add the new select
 */
function processSelect(which) {
	// variable used to alert user the consequences of this function
	var result = false;

	// check if the passed in value is not null
	// check if the reference is a an element
	if(!which || which.nodeType != 1) {
		// not a valid reference
		// must be the start, make the first choice
		which = document.getElementsByTagName("body")[0];
		which.value = START;
	}

	// remove younger siblings
	killOlderSiblings(which.parentNode);

	// check to see if there is any data
	// if(which.value in data && data[which.value]) {
		// // add the select
		// addChoice(which);
	// } else {
		// //create the final text node
		// showResults(which);
	// }
	
	// check to see if there is any data
	// do this by checking to see if there is a document matching the value
	var fileName = filePath+which.value+".xml";
	console.log("File "+fileName+" exists? "+fileExists(fileName));
	
	if(fileExists(fileName)){
		// setup the data
		requestData(fileName);
		
		// add the choice
		addChoice(which);
	} else{
		// create the final text node
		showResults(which.parentNode);
	}
}

/**
 * Gets all the choices, displays them.
 */
function showResults(which) {
	// get the values from the selects
	var values = getSelVals();

	// check if we received results
	if(!values) {
		return;
	}

	// create the div container
	var container = document.createElement("div");
	
	// display the results
	var message = document.createElement("p");
	var messText = document.createTextNode("You Choose: ");
	message.appendChild(messText);
	// append to container
	container.parentNode.appendChild(message);

	// create the list
	var uElem = document.createElement("ul");

	// set up the list items
	for(val in values) {
		val = values[val];

		// create list item
		var li = document.createElement("li");
		// create list item text node
		var text = document.createTextNode(val);
		// add text to list item
		li.appendChild(text);

		// add li to ul
		uElem.appendChild(li);
	}

	// add ul to the container
	container.parentNode.appendChild(uElem);
	
	// append the container to the document.
	which.parentNode.appendChild(container);
}

function getSelVals() {
	// get all the select values
	var selects = document.getElementsByTagName("select");
	var values = new Array();

	// get the values for those selects
	for( i = 0, len = selects.length; i < len; i++) {
		if(selects[i].value === DEFAULT) {
			return null;
		}
		values.push(selects[i].value);
	}

	return values;
}

/**
 * Creates a div, adds the question, and creates the select option element
 *
 * @param elem - element to add after
 */
function addChoice(elem) {
	// grab the data
	var question = data[elem.value][0];
	var options = data[elem.value][1];
	

	// create the div container
	var container = document.createElement("div");

	// create the question
	// create p node
	var pQuestion = document.createElement("p");
	// create text node
	question = document.createTextNode(question);
	// attach to p node
	pQuestion.appendChild(question);
	// attach p node to the div container
	container.appendChild(pQuestion);

	// create the select option element
	var selElem = document.createElement("select");

	// set up the options
	for(option in options) {
		option = options[option];

		// create the option
		var optElem = document.createElement("option");
		// set attributes
		optElem.setAttribute("value", option);

		// build text
		var textElem = document.createTextNode(option);
		// append text to opt
		optElem.appendChild(textElem);

		//append opt to select
		selElem.appendChild(optElem);
	}

	// add the event handler to the select option element
	// does not work in IE
	if(ieSeven) {
		selElem.setAttribute('onchange', function() {processSelect(this);
		});
	} else {
		selElem.setAttribute('onchange', 'processSelect(this);');
		;
	}

	// add select to the div container
	container.appendChild(selElem);

	// attach div container to the document
	// first determine if this is the start
	var doc = elem;

	if(elem.value != START) {
		// this is not the start, so we have to go up 2 levels from the select
		// to the div container.
		doc = doc.parentNode.parentNode;
	} 

	// attach the div to the document
	doc.appendChild(container)
}

/**
 * Removes all elements that come after this one
 */
function killOlderSiblings(elem) {
	if(!elem) {
		return;
	}

	// while we have another sibling
	while( sib = elem.nextSibling) {
		// remove it
		sib.parentNode.removeChild(sib);
	}
}
