<?php
/**
 * Connects to the database.
 * Return false if connection failed.
 * If there was a param sent, I'm sending it back in an XML doc
 */
include "../../dbInfo.inc";
$dbLink = mysql_connect($db, $dbUserName, $dbPassWd);
mysql_select_db('dsb');
//insert YOUR db name here!

if ($dbLink) {
	//we want this to happen ONLY if we are going to add a user
	if (isset($_GET['who'])) {
		$query = "INSERT into 536AjaxClass values ('','" . $_GET['who'] . "')";
		mysql_query($query);
	}

	//we want this to happen every time this is called...
	$query = "SELECT name FROM 536AjaxClass";
	$result = mysql_query($query);
	if ($result) {
		while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$v_records[] = $row;
		}
	}
}

////////////////////////////////////////////////////////////////////
//build the xml document to return

$return_value = '<?xml version="1.0" standalone="yes"
?><info>';
$len = count($v_records);
//how many rows are in our db?
if ($len > 0) {
	for ($i = 0; $i < $len; $i++) {
		$return_value .= '<who>' . $v_records[$i]['name'] . '</who>';
	}
} else {
	$return_value .= '<who>No one</who>';
}

$return_value .= '</info>';

////////////////////////////////////////////////////////////////////

//next 5 lines will clear the cache
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
//this line MUST be here, it declares the content-type
header('Content-Type: text/xml');
echo $return_value;
// This will become the response value for the XMLHttpRequest object
?>

