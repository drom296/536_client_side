/**
 * @author Pedro Mass
 */
var DEFAULT = "--Choose One--";
var START = "start";
var FILE_NO_EXIST = 404;

// create the data object
var data = new Object();
data[START] = ["Men or Women?", ["men", "women"]];
// level 1
data["men"] = ["Facial Hair?", ["hair", "no hair"]];
data["women"] = ["Blonde or Brunette?", ["blonde", "brunette"]];
// level2
data["hair"] = ["Complexion?", ["dark", "light"]];
data["no hair"] = ["Build?", ["big", "small"]];
data["blonde"] = ["Height?", ["tall", "small"]];
data["brunette"] = ["Eyes?", ["brown", "blue"]];
// level3
data["brown"] = ["personality?", ["bossy", "sweet", "dark"]]

var http = getHTTPObject();
// We create the HTTP Object
var isWorking = false;
//flag for stopping the next request until this one is done...

function fileExists(fileName) {
	var result = false;

	// check if file exists
	if(fileName) {
		var http = getHTTPObject();
		http.open('HEAD', fileName, false);
		http.send();
		result = http.status != FILE_NO_EXIST;
	}

	return result;
}

function process(fileName) {
	var result = false;
	
	// check if file exists
	if (!fileExists(fileName)){
		return result;
	}

	//if the object exists and it isn't currently busy
	if(http && !isWorking) {
		http.open("GET", 'data.xml', true);
		http.onreadystatechange = handleHttpResponse;
		isWorking = true;
		http.send(null);
		setTimeout('getData()', 1500);
	}

	return true;
}

function addData(xmlDoc) {
	// get the question
	var question = xmlDoc.getElementsByTagName('question').item(0).firstChild.data;

	// set up the choices array
	var choices;

	// setup the dom var for choices
	var dom = xmlDoc.getElementsByTagName('choice');
	// go thru all choices
	for( i = 0, len = dom.length; i < len; i++) {
		// get the value
		var option = dom.item(i).firstChild.data;
		// add to the array
		choices.push(option);
	}

	// add question and choices to data object

}

/////////////////////////////////////////////////////////////////
//first, we create a XMLHttpRequest Object...
function getHTTPObject() {
	var xmlhttp;
	// branch for native XMLHttpRequest object
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest()
	}
	// branch for IE/Windows ActiveX version
	else if(window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
	} else {
		return false;
	}

	return xmlhttp;
}

///////////////////////////////////////////////////////////////////
//If we got the information, do something with it!
function handleHttpResponse() {
	//alert(http.readyState);
	//first, is my 'object' complete (done getting info from server?)
	if(http.readyState == 4) {
		//if I got something...
		//alert(http.responseText);
		if(http.status == 200) {
			// Use the XML DOM to unpack the data
			var xmlDocument = http.responseXML;

			//*********************************************************************
			//Add code here to process the return content!
			addData(xmlDocument);

			//end adding code!
			//*********************************************************************
			isWorking = false;
		}
	}
}

//*********************************************************************
//Add functions here to trigger the calls to the object!