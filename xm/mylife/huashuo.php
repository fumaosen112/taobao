<?php
header("Content-type:text/html;charset=utf-8");
//1、接受前端的输入（接受前端传来的数据）；
    $username = $_POST['vipName'];//接受到用户名
    $userpass = $_POST['vipPass'];
    //2、保存
	//1)、建立连接
	$conn = mysql_connect('localhost','root','root');

	if(!$conn){
		echo '连接失败';
	}
	//2)、选择数据库
	mysql_select_db('huashu',$conn);

	//3)、执行SQL语句
	$sqlstr="insert into vip values('$username','$userpass')";
	$result = mysql_query($sqlstr);


	//4)、关闭数据库
	mysql_close($conn);

	// echo $result;
	//3、响应
	if($result==1){
        // echo $username;
        // echo $sex;
		echo "恭喜您，注册成功！";
		header('Location: record.html');
	}else{
		echo $username;
        echo $result;
		echo "亲，注册失败！";
	}
?>