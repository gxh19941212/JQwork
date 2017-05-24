<?php
header("content-type:text/html;charset=utf-8");
$tel = $_POST["tel"];
$emall = $_POST["emall"];
$conn = new mysqli("localhost","root","root");
$conn ->select_db("jumei");
$sql=  "update users set emall='$emall' where tel= '$tel'";
$result = $conn ->query($sql);
$sql = "select * from users where tel= '$tel'";
$result = $conn ->query($sql);
echo json_encode($result ->fetch_assoc());
?>