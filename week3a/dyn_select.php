<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>html5_template</title>
	</head>
	<body>


		<script type="text/javascript">
		//<![CDATA[	
			var date = new Object();
			date['start'] = ['--pick one--','men','women'];
			date['men'] = ['--pick one--', 'tall', 'short', 'mid'];
			date['women'] = ['--pick one--', 'blonde', 'brunette', 'red head', 'original'];
			
			date['tall'] = ['--pick one--', 'bbw', 'average', 'petite'];
			
			// console.log(document.getElementsByTagName("body")[0].appendChild(document.createElement("h3").appendChild(document.createTextNode("hello"))));
			
			addSelect("start");
			
			function addSelect(field, which){
				// grab the field they want
				var options = date[field];
				
				// check if we have data for it
				if (options){
					// create the select option for it
					var selElem = document.createElement("select");
					// add attributes
					selElem.setAttribute("name", field);
					// set the events
					selElem.addEventListener("onchange",addSelect(selElem.value, selElem),true);
					
					// set up the option
					for (option in options){
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
					
					if (which==undefined || which==null){
						which = document.getElementsByTagName("body")[0];
					}
					
					which.appendChild(selElem);
					
					var selected = document.getElementById(field)
					
					selected.onchange = addSelect(selected.value, selected);
				}
			}
			
		//]]>	
		</script>
	</body>
</html>
