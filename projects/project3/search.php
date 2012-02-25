<?php

define("BASE_URL", "http://simon.ist.rit.edu:8080/Services/resources/ESD/");

//include any libraries/classes needed
function __autoload($className) {
	require_once 'classes/' . $className . '.class.php';
}

function buildHospitalSelect($path, $dataElem, $name_id, $type) {
	// build select for Organization TYPE

	// grab the dom
	$dom = new DOMDocument();
	$dom -> load(BASE_URL . $path);

	// grab all the data nodes
	$rows = $dom -> getElementsByTagName("$dataElem");

	// setup array to store the information
	$values = array();
	$texts = array();

	//loop thru rows
	foreach ($rows as $row) {
		// get the id
		$data = $row -> nodeValue;

		// if we have data
		if (isset($data) && !empty($data) && !in_array($data, $values)) {
			// push to respective arrays
			$values[] = $data;
			$texts[] = $data;
		}
	}

	// add default value
	array_unshift($texts, "All $type");
	array_unshift($values, "");

	// build select
	// would like to put the IDs in the value, but our search needs the text
	return Form::buildSelect($values, $texts, $name_id, $name_id);
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>search</title>
		<meta name="description" content="" />
		<meta name="author" content="Charles" />
		<link rel="shortcut icon" href="img/pedro.ico" />
		<!-- CSS -->
		<link rel="stylesheet" href="css/form.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/tablesorter.css" />
		<link rel="stylesheet" type="text/css" href="css/jquery.tablesorter.pager.css" />
		<link rel="stylesheet" href="css/form.css" />
		<link rel="stylesheet" href="css/table.css" />
		<!-- 		<link type="text/css" href="css/vanilla_reset.css" /> -->
		<!-- 		<link type="text/css" href="css/infieldLabel.css" /> -->
		<!-- JavaScript -->
		<!-- ************ PLUGINS **********************-->
		<script type="text/javascript" src="plugins/jquery-1.7.1.min.js"></script>
		
		<!-- Table sorter plugin: http://tablesorter.com/docs/index.html -->
		<script src="plugins/jquery.tablesorter.js" type="text/javascript"></script>
		<script src="plugins/jquery.tablesorter.pager.js" type="text/javascript"></script>
		
		<!-- PX to EM convertor plugin: http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/-->
		<script src="plugins/pxem.jQuery.js" type="text/javascript"></script>
		
		<!-- Lightbox: fancyBox http://fancybox.net/howto -->
		
		<!-- ************ My Scripts **********************-->
				<script type="text/javascript" src="js/form.js"></script>
		<script type="text/javascript" src="js/table.js"></script>
	</head>
	<body>
		<!-- search form -->
		<form name="searchForm" id="searchForm" onsubmit="return search()" >
			<fieldset>
				<legend>
					Search Criteria
				</legend>
				<p>
					<label for="type">Organization Type</label>
					<?php
					// build select for Organization TYPE

					// path: ...ESD/OrgTypes
					$path = "OrgTypes";
					$dataElem = "type";
					$name = "type";
					$default = "Organization Types";

					// build the select and echo
					echo buildHospitalSelect($path, $dataElem, $name, $default);
					?>
				</p>
				<!-- build input for organization name -->
				<p>
					<label for="name">Organization Name</label>
					<input type="text" id="name" name="name" />
				</p>
				<!-- Build input for state and City -->
				<p>
					<!-- Label -->
					<label for="state">State</label>
					<!-- State Combo -->
					<?php
					// build combo for state

					// path: ...ESD/States
					$path = "States";
					$dataElem = "State";
					$name = "state";
					$default = "States";

					// build the select and echo
					echo buildHospitalSelect($path, $dataElem, $name, $default);
					?>

				</p>
				<p>
					<label for="county">County</label>
					<?php
					// combo for county

					// path: ...ESD/Counties
					$path = "Counties";
					$dataElem = "CountyName";
					$name = "county";
					$default = "Counties";

					// build the select and echo
					echo buildHospitalSelect($path, $dataElem, $name, $default);
					?>
				</p>
				<p>
					<label for="town">City</label>
					<?php
					// build combo for cities
					// path: ...ESD/Cities
					$path = "Cities";
					$dataElem = "city";
					$name = "town";
					$default = "Cities";

					// build the select and echo
					echo buildHospitalSelect($path, $dataElem, $name, $default);
					?>
				</p>
				
				
				<!-- input for zip code -->
				<p>
					<label for="zip">Zip Code</label>
					<input id="zip" pattern="\d{5}|\d{5}[\-]{1}\d{4}" type="text" name="zip" />
				</p>
				<!-- buttons -->
				<div id="buttons">
					<input type="submit" value="Show Results" />
					<input type="reset" value="Reset Form" />
				</div>
			</fieldset>
		</form>
		<div id="results">
			<div id="output"></div>			
		</div>
	</body>
</html>
