<?php
$conn = mysqli_connect('localhost','root','','medique');
if($conn){
	echo '';
}
else{
	echo 'Connection failed';
}