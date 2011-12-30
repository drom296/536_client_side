/**
 * @author Pedro Mass
 */

// create the data object
var data = new Object();
data["start"] 	= ["Men or Women?", ["men", "women"]];
// level 1
data["men"] 		= ["Facial Hair?", ["hair", "no hair"]];
data["woman"] 	= ["Blonde or Brunette?", ["blonde","brunette"]];
// level2
data["hair"] 		= ["Complexion?", ["dark","light"]];
data["no hair"] = ["Build?", ["big", "small"]];
data["blonde"]	=	["Height?", ["tall", "small"]];
data["brunette"]=	["Eyes?", ["brown","blue"]];
 

/**
 * Removes all the children, checks to see if there is data for the selection (value).
 * If there is, we dynamically create a select element and add it after the current select.
 * 
 * If there is no data, a boolean of true is passed back
 *
 * @param whichSelect	- reference to the select element we wish to add the new select 
 */
function processSelect(which){
	// variable used to alert user the consequences of this function
	var result = false;
	
	// check if the passed in value is not null
	if(!which){
		// not a valid reference 
		return result;
	}
	
	// check if the reference is a an element
	if(which.nodeType != 1){ //1 being for element nodes
		// not an element 
		return result;
	}
	
	// remove younger siblings
	killOlderSiblings(which);
	
	// check to see if there is any data
	if(which.value in data && data[which.value]){
		// add the select
		addChoice(which);
	} else{
		//create the final text node
		
	}
	
}

/**
 * Creates a div, adds the question, and creates the select option element
 * 
 * @param elem - element to add after  
 */
function addChoice(elem){
	// grab the data
	var choices = data[elem.value][1];
	var question = data[elem.value][0];
	
	// create the question
	// create p node
	var pQuestion = document.createElement("p");
	// create text node
	question = document.createTextNode(question);
	// attach to p node
	pQuestion.parentNode.appendChild(question);
	// attach p node to the document
	elem.parentNode.appendChild(pQuestion);
	
	
	
}

/**
 * Removes all elements that come after this one
 */
function killOlderSiblings(elem){
	if(!elem){
		return;
	}
	
	// while we have another sibling
	while(sib = elem.nextSibling){
		console.log("about to remove: " + sib)
		// remove it
		sib.parentNode.removeChild(sib);
	}
}
