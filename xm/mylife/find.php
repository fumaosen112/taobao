<?php
header("Content-type:text/html;charset=utf-8");
//1、接受前端的输入（接受前端传来的数据）；
    $username = $_GET['vipName'];//接受到用户名
    //2、保存
	//1)、建立连接
	$conn = mysql_connect('localhost','root','root');

	if(!$conn){
		echo '连接失败';
	}
	//2)、选择数据库
	mysql_select_db('huashu',$conn);

    //3)、执行SQL语句
    // $sqlstr="select * from vip where username='$username' and userpass='$userpass'";
	$sqlstr="select * from vip where vipuse='$username'";
	$result = mysql_query($sqlstr);// $result:是表格（查询结果）

    
    //3、响应
    $rows = mysql_num_rows($result);
    // echo  $rows;
	if($rows==1){
        // echo $username;
        // echo $sex;
		echo 1;
		// header('Location: login.html');
	}else{
		echo 0;
    }
    //4)、关闭数据库
    mysql_close($conn);
?>