<?php
 
	include_once "connect.php";
	
	 $json = file_get_contents('php://input');
	 
	$obj = json_decode($json,true);

	$mata_kuliah = $obj['mata_kuliah'];
	$kode_mk = $obj['kode_mk'];
	$kode_dos = $obj['kode_dos'];

		$Sql_Query = "INSERT INTO matakuliahpti (mata_kuliah,kode_mk,kode_dos) values ('$mata_kuliah','$kode_mk','$kode_dos')";
	 
	 	if(mysqli_query($conn,$Sql_Query)){
				$MSG = 'Berhasil!' ;
				$json = json_encode($MSG);
			 	echo $json ;
	 	}
	 	else{
				$MSG = 'Gagal!' ;
				$json = json_encode($MSG);
			 	echo $json ;
	 	} 	
	mysqli_close($conn);
	
?>