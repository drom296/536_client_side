/**
 * @author Charles
 */

// //TODO
// function (which)
// -var hold =data[which.value];
// 
// 
// create a select
// -attributes on select
// --loop begin
// ---create option
// ---option attr (value)
// ---option.append(text)
// ---put option in select
// --loop end
// -attach select to page
// 
// data.js
// var date = new Object();
// date['men'] = ['--pick one--','tall','short','mid'];
// data['women'] = ['blonde','red'];


var date = new Object();
date['start'] = ['--pick one--','men','women'];
date['men'] = ['--pick one--', 'tall', 'short', 'mid'];
date['women'] = ['--pick one--', 'blonde', 'brunette', 'red head', 'original'];

// console.log(document.getElementsByTagName("body")[0].appendChild(document.createElement("h3").appendChild(document.createTextNode("hello"))));

addSelect("start");

function addSelect(field, which){
	// grab the field they want
	var options = date[field];
	
	// check if we have data for it
	if (options){
		// create the select option for it
		var selElem = document.createElement("select");
		// set up the option
		for (option in options){
			var optElem = document.createElement("option");
			optElem.setAttribute("value", option);
			var textElem = document.createTextNode(option);
			optElem.appendChild(textElem);
		}
		
		if (which==undefined || which==null){
			which = document.getElementsByTagName("body")[0];
		}
		
		which.appendChild(selElem);
	}
}