<?php
header("Content-Type: text/html; charset=utf-8");
$conn = new mysqli("localhost","root","root");
$conn ->select_db("jumei");
$sql = "select * from daysee";
$result = $conn ->query($sql);
$arr = array();
while ( $rs = $result ->fetch_assoc()) {
    array_push($arr,$rs);
}
echo json_encode($arr);
?>