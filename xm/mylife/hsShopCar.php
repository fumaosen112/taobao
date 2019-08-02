<?php
header("Content-type:text/html;charset=utf-8");
$conn = mysql_connect("localhost","root","root");
if($conn){
		//echo "连接成功";
		mysql_select_db("hsshopcar");	
	}else{
		echo "连接失败";
	}
	$result = mysql_query("select * from hscar");
	$results = array();	//定一个空数组
	while($row = mysql_fetch_assoc($result)){
		$results[] = $row;
	}
	if($results){
		echo json_encode($results);//将数组转换为JSON格式
	}
//	echo $result;
	mysql_close($conn);
?>