<?php
header("Content-type:text/html;charset=utf-8");
//1、接受前端的输入（接受前端传来的数据）；
    $username = $_GET['usename'];//接受到用户名
    $userpass=$_GET['usepass'];

    //2、保存
	//1)、建立连接
	$conn = mysql_connect('localhost','root','root');
     
	if(!$conn){
		echo '连接失败';
	}
	//2)、选择数据库
	mysql_select_db('huashu',$conn);
// echo  $username;
    //3)、执行SQL语句
    $sqlstr="select * from vip where vipuse='$username' and vippass='$userpass'";
	// $sqlstr="select * from vip where vipuse='$username'";
	$result = mysql_query($sqlstr);// $result:是表格（查询结果）

    // echo $sqlstr;
    // print_r $sqlstr;
    //3、响应
    $rows = mysql_num_rows($result);
    // echo $rows
	if($rows==1){
        echo 1;
        // echo $sex;
		// echo "恭喜您，成功！";
		// header('Location: login.html');
	}else{
		// echo $username;
        // echo $result;
        echo 0;
        echo $userpass;
    }
    //4)、关闭数据库
    mysql_close($conn);
?>