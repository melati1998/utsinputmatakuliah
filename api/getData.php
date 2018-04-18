<?php
	include_once "connect.php";
	
	$sql = "SELECT * FROM matakuliahpti";
	$query = mysqli_query($conn, $sql);

	$array  = array();
	while ($row = mysqli_fetch_array($query)){
		$array[] = $row; 
	}
	echo json_encode($array);
	mysqli_close($conn);
?>