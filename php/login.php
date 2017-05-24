<?php
header("content-type:text/html;charset=utf-8");
$txt = $_POST["txt"];
$password = $_POST["password"];
$type;
$conn = new mysqli("localhost","root","root");
$conn ->select_db("jumei");
$pattern="/([a-z0-9]*[-_.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z]{2,3}([.][a-z]{2})?/i";
if(is_numeric($txt)){
	$type = "tel";
}else if(preg_match($pattern,$txt)){
	$type = "emall";
}else{
	$type = "username";
}

$sql = "select * from users where $type= '$txt'";
//$sql = "select * from users where $type= 'aaa'";
$result = $conn ->query($sql);
$datas =$result ->fetch_assoc();
if($datas["password"]==$password){
	echo json_encode($datas);
}else{
	echo false;
}

?>