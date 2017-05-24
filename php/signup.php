<?php
header("content-type:text/html;charset=utf-8");
$tel = $_POST["tel"];
$password = $_POST["password"];
function getRandomString($len, $chars=null)
{
    if (is_null($chars)){
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }  
    mt_srand(10000000*(double)microtime());
    for ($i = 0, $str = '', $lc = strlen($chars)-1; $i < $len; $i++){
        $str .= $chars[mt_rand(0, $lc)];  
    }
    return $str;
}

$conn = new mysqli("localhost","root","root");
$conn ->select_db("jumei");
$sql = "select * from users where tel = '$tel'";
$result = $conn ->query($sql);
if($result ->num_rows == 0){
	echo "1";
	if($password!=''){
		$username = getRandomString(6);
		$sql = "insert into users (username,password,tel)values('$username',
		'$password','$tel')";
		$conn ->query($sql);
	}
	
}else{
	echo "0";
}