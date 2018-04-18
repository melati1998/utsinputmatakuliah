<?php
$servername = "localhost"; 
$username = "id5376136_melatipramesti";
$password = "parkchanyeol1992"; 
$dbname = "id5376136_melati";
 
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname); 
// Check connection
if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error());
}else{
	//echo "Koneksi berhasil";
} 
?> 