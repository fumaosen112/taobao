<?php
	$id=$_GET['id'];
//	echo $id;
header("Content-type:text/html;charset=utf-8");
$conn = mysql_connect("localhost","root","root");
if($conn){
		//echo "连接成功";
		mysql_select_db("hsshopcar");	
	}else{
		echo "连接失败";
	}
	$result = mysql_query("delete from hscar where shopid=$id");//删除
	if($result && mysql_affected_rows($conn)){
		// mysqli_affected_rows() 函数返回前一次 MySQL 操作（SELECT、INSERT、UPDATE、REPLACE、DELETE）所影响的记录行数
		// 返回值： 	一个 > 0 的整数表示所影响的记录行数。0 表示没有受影响的记录。-1 表示查询返回错误。
        echo "删除成功<a href='hsshopcar.html'>返回</a>";
        // echo document.location.href="shopcar.html";
	}else{
//		echo $result;
        var_dump($result);
	}
	mysql_close($conn);
?>