/**
 * @author Pedro Mass
 */

var isIE = ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Opera") == -1));

var filePath = "data/dating/";
var resultPath = "results/";
var imgPath = "imgs/";
var page = "choices";
var questionPos = 1;
var optionsPos = 2;
var quotePos = 0;

var quoteClass = "quote";
var picClass = "rPic";

var quotes;

function init() {
	// perfom some initial checks
	// redirect if less than IE 7
	if(ieFail || isIEMAC()) {
		window.location = "http://www.mozilla.org/en-US/firefox/new/"
		// window.location = "redirect.html";
		return;
	}

	// init the quotes array
	quotes = new Array();

	// check if they have a saved result
	var result = getBioResult();

	if(result) {
		//show previous bio
		var container = document.createElement("div");
		container.setAttribute('id', 'beforeBio');
		container.setAttribute('class', 'beforeBioDiv');
		addHeading(container, 'Last time, you choose...', 'h2', 'bioHeading')
		showBio(container, result);

		document.getElementById('choices').appendChild(container);

		document.getElementById('beforeBio').style.borderBottomWidth = "1px;";
		document.getElementById('beforeBio').style.borderBottomStyle = "solid";
	}

	// start the select madness
	processSelect();
}

function storeBioResult(bioName) {

	if(isIE) {
		// store as cookie
		var time = new Date();
		time.setDate(time.getDate() + 30);
		SetCookie('bio', bioName, time);
	} else {
		// store as localStorage
		window.localStorage.setItem('bio', bioName);
	}
}

function getBioResult() {

	var result = null;
	if(isIE) {
		// look for cookie
		result = GetCookie('bio');
	} else {
		// look in local storage
		result = localStorage.getItem('bio');
	}
	// return the name
	return result;
}

function processForm() {
	return validateForm();
}

function validateForm() {
	// get form
	var form = document.getElementsByTagName('form')[0];

	var message = "";

	var result = true;

	// check if name is blank
	if(isEmpty(form.uName.value)) {
		result = false;
		message += "Please enter your name. ";
	}

	if(isEmpty(form.uEmail.value)) {
		result = false;
		message += "\nPlease enter your email. ";
	}

	if(isEmpty(form.uMessage.value)) {
		result = false;
		message += "\nPlease enter a message. ";
	}

	if(!result) {
		alert(message);
	}

	return result;
}

function isEmpty(string) {
	return removeSpaces(string).length == 0;
}

function isIEMAC() {
	// // store useragent
	// var uAgent = navigator.userAgent;
	//
	// // check if mac from user agent
	// var isMac = uAgent.indexOf("Mac") > -1;
	//
	// var isIE = uAgent.indexOf("MSIE") > -1;

	// got this from week2a - browserChecker.js
	var isIEMac = ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Mac") != -1) && (navigator.userAgent.indexOf("Opera") == -1));

	return isIEMac;
}

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

function addContactForm(which) {
	// create container
	var container = document.createElement("div");
	container.setAttribute('class', 'formDiv');

	// create the form
	var form = document.createElement('form');
	form.setAttribute('onsubmit', 'validateForm();');
	form.setAttribute('method', 'get');

	// add input for the name
	form.appendChild(document.createTextNode('Name'));
	var name = document.createElement('input');
	name.setAttribute('name', 'uName');
	name.setAttribute('type', 'uName');
	form.appendChild(name);
	form.appendChild(document.createElement('br'));

	// add input for the email
	form.appendChild(document.createTextNode('Email'));
	var email = document.createElement('input');
	email.setAttribute('name', 'uEmail');
	email.setAttribute('type', 'email');
	form.appendChild(email);
	form.appendChild(document.createElement('br'));

	// add input for the message
	form.appendChild(document.createTextNode('Message'));
	var message = document.createElement('textarea');
	message.setAttribute('name', 'uMessage');
	form.appendChild(message);
	form.appendChild(document.createElement('br'));

	// add submit
	var submit = document.createElement('input');
	submit.setAttribute('name', 'submit');
	submit.setAttribute('type', 'submit');
	form.appendChild(submit);

	// attach form to container
	container.appendChild(form);

	// attach container to which
	which.parentNode.appendChild(container);
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

	// collapse the array to get our file name
	var bioName = removeSpaces(values.join(""));

	// store the bio name
	storeBioResult(bioName);

	// show bio
	showBio(which.parentNode, bioName);

	// add contact form
	addContactForm(which);

}

function showBio(which, bioName) {

	// create the div container
	var container = document.createElement("div");
	container.setAttribute('class', 'noFloat');
	container.setAttribute('id', 'bioDiv');

	// get data from results bio XML
	getBioXML(filePath + resultPath + bioName + ".xml");

	// store in temp array
	var results = data['bio'];

	// addPic
	addPic(container, imgPath + results['pic'], "bioPic");

	// addName
	addHeading(container, 'Name', 'h3', 'bioHeading');
	addP(container, results['name'], 'bioName');
	
	// addWebsite
	addHeading(container, 'Website', 'h3', 'bioHeading');
	addLink(container, results['site'], results['site']);

	// add Qualities heading
	addHeading(container, 'Qualities', 'h3', 'bioHeading');
	// add qualities
	addList(container, results['qualities'], 'ul', 'bioQualities');

	// add Bio heading
	addHeading(container, 'Bio', 'h3', 'bioHeading');
	// add bio
	addP(container, results['bio'], 'bioBio');

	// add Lines heading
	addHeading(container, 'Pickup Lines', 'h3', 'bioHeading');
	// add lines
	addList(container, quotes, 'ul', 'bioLines');

	// append the container to the document.
	which.appendChild(container);

}

function addLink(elem, text, url) {
	// create p tag
	var p = document.createElement('span');
	var link = document.createElement('a');
	link.setAttribute('href',url);
	link.appendChild(document.createTextNode(text));
	p.appendChild(link);
	elem.appendChild(p);
	
}

function addP(elem, text, iClass) {
	// create p tag
	var p = document.createElement('p');
	// create text node
	text = document.createTextNode(text);
	// attach to p
	p.appendChild(text);
	// add to elem
	elem.appendChild(p);
}

function addList(elem, options, listType, iClass) {

	// create the list element
	var list = document.createElement(listType);
	list.setAttribute('class', iClass);

	// set up the list items
	for(val in options) {
		val = options[val];

		// create list item
		var li = document.createElement("li");
		// create list item text node
		var text = document.createTextNode(val);
		// add text to list item
		li.appendChild(text);

		// add li to ul
		list.appendChild(li);
	}

	// add ul to the container
	elem.appendChild(list);

}

function addHeading(elem, text, heading, iClass) {
	var pQuote = document.createElement(heading);
	pQuote.setAttribute('class', iClass);

	// create text node
	text = document.createTextNode(text);
	pQuote.appendChild(text);

	elem.appendChild(pQuote);
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

	// add quote to quotes array
	quotes.push(quote);

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

		// last minute add
		// kill last choosen bio if start
		var beforeBioDiv = document.getElementById('beforeBio');

		if(beforeBioDiv) {
			beforeBioDiv.parentNode.removeChild(beforeBioDiv);
		}
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