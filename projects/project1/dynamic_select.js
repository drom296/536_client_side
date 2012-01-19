/**
 * @author Pedro Mass
 */

var filePath = "data/dating/";
var resultPath = "results/";
var imgPath = "imgs/";
var page = "choices";
var questionPos = 1;
var optionsPos = 2;
var quotePos = 0;

var quoteClass = "quote";
var picClass = "rPic";

var quotes = [];

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
		which = document.getElementById(page);
		which.value = START;
	}

	// remove younger siblings
	killOlderSiblings(which.parentNode);

	// check to see if there is any data
	// do this by checking to see if there is a document matching the value
	var fileName = filePath + removeSpaces(which.value) + ".xml";

	if(fileExists(fileName)) {
		// setup the data
		requestData(fileName);

		// add the choice
		addChoice(which);
	} else {
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
	container.setAttribute('class', 'bioDiv noFloat');

	// collapse the array to get our file name
	var bioName = removeSpaces(values.join(""));

	// get data from results bio XML
	getBioXML(filePath + resultPath + bioName + ".xml");

	// store in temp array
	var results = data['bio'];

	// addPic
	addPic(container, imgPath + results['pic'], "bioPic");

	// add Qualities heading
	addHeading(container, 'Qualities', 'h3', 'bioHeading');
	
	// add qualities

	// append the container to the document.
	which.parentNode.appendChild(container);
}

function addList(elem, options, listType, iClass){
	
}

function addHeading(elem, text, heading, iClass) {
	var pQuote = document.createElement(heading);
	pQuote.setAttribute('class', iClass);

	// create text node
	text = document.createTextNode(text);
	pQuote.appendChild(text);

	elem.appendChild(pQuote);
}

function getBio(bioPath) {
	console.log(bioPath);
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

function addReactionDiv(elem, quote) {
	// create reaction container
	var container = document.createElement("div");
	container.setAttribute('class', 'reactionDiv');

	// add picture
	addPic(container, imgPath + removeSpaces(elem.value) + '.jpg', picClass);

	// add quote
	addQuote(container, quote);

	// add container to the document
	elem.parentNode.parentNode.appendChild(container);

}

function addPic(elem, picSrc, iClass) {
	// add quote within elem
	// create img tag
	var pQuote = document.createElement('img');
	pQuote.setAttribute('class', iClass);
	pQuote.setAttribute('src', picSrc);
	// add p to the elem
	elem.appendChild(pQuote);
}

function addQuote(elem, quote) {
	// add quote within select's div
	// create p tag
	var pQuote = document.createElement('p');
	pQuote.setAttribute('class', quoteClass);
	// create text node
	quote = document.createTextNode(quote);
	// add text node to p tag
	pQuote.appendChild(quote);
	// add p to the document
	elem.appendChild(pQuote);

	// add quote to quotes array
	quotes.push(quote);
}

/**
 * Creates a div, adds the question, and creates the select option element
 *
 * @param elem - the select that was changed
 */
function addChoice(elem) {
	//strip spaces from elem.value
	var val = removeSpaces(elem.value);

	// grab the data
	var question = data[val][questionPos];
	var options = data[val][optionsPos];
	var quote = data[val][quotePos];

	// create the div container
	var container = document.createElement("div");
	container.setAttribute('class', 'choice noFloat');

	// create the question
	// create p node
	var pQuestion = document.createElement("p");
	pQuestion.setAttribute('class', 'question');
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

	if(val != START) {
		// this is not the start, so we have to go up 2 levels from the select
		// to the div container.
		doc = doc.parentNode.parentNode;

		// add reaction to their selection
		addReactionDiv(elem, quote);
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

/**
 * Removes spaces from the string, and turns it all to lowercase
 */
function removeSpaces(string) {
	// remove outer spaces
	string = string.replace(/^\s+|\s+$/g, "");
	// remove inner space
	string = string.replace(/\s/g, "");
	// turn to lower case
	string = string.toLowerCase();
	// return result
	return string;
}