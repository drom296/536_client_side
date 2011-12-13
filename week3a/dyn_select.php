<?php
    phpinfo();
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>html5_template</title>
	</head>
	<body>
		<script type="text/javascript">
			function val(){
				if(document.forms[0].elements[0].value == ''){
					// tell the name input to turn on a red *
					return false;
				} else{
					return true;
				}
			}
		</script>
		
		<form action="pageToHit.php" method="GET" onsubmit="return val();">
			name:<input type="text" name="fname" />
			<input type="submit" value="cick me" />
		</form>
	</body>
</html>
