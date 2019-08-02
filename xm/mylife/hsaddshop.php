<?php
//	$id=$_GET['id'];
	$shopId=$_GET['shopid'];
	$shopName=$_GET['shopname'];
	$shopimg=$_GET['shopimg'];
    $shopPiece=$_GET['shoppic'];
    $shopnum=$_GET['shopnum'];
//	echo $id;
header("Content-type:text/html;charset=utf-8");
$conn = mysql_connect("localhost","root","root");
if($conn){
		//echo "连接成功";
		mysql_select_db("hsshopcar");	
	}else{
		echo "连接失败";
	}
	// $result = mysql_query("delete from shop where shopId=$id");//删除
//	 $sql = "insert into shop (shopId, shopnName, )
//  VALUES ('John', 'Doe', 'john@example.com')";   
//   $result=mysql_query("insert into shop (shopId, sex, age) values("孙丽华", "女", 21)")
mysql_query("insert into hscar values('$shopId','$shopimg','$shopName','$shopPiece','$shopnum')",$conn);  
mysql_close($conn);  
?>