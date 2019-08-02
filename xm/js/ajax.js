function obj2str(obj){
	var res=[];
	for(var key in obj){
//		encodeURIComponent() //把中文转定为指定字符串
//     url不可以出现中文  如果出现中文可以调用encodeURIComponent()方法
//   url 可以出现  字母、数字 下划线  ASCII值
//李南江视频 146后半段
		res.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]));
	}
	return res.join("&");
}
function ajax(type,url,obj,timeout,success,errorP) {
	//将对象转为字符串
	var str=obj2str(obj);
	//1创建一个异步对象
	var xhr ;
	if(window.XMLHttpRequest){
						xhr=new XMLHttpRequest();
					}
					else{
						//低版本浏览器  ie5 6
						xhr=new ActiveXObject("Microsoft.XMLHTTP");
					}
	//2设置请求方式和请求地址
	//传入的时候不管是大写还是小写 都可以
     if(type.toLowerCase()==="get"){
		    xhr.open(type, url+"?"+str, true);
	//3发送请求
		   
			xhr.send();
     }else{
     	xhr.open(type, url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
     }
	//4监听状态变化
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			//判断是否请求成功  http状态码
			if(xhr.status >= 200 && xhr.status < 300 ||
				xhr.status == 304) {
				//5处理返回结果
				//console.log("接收到服务器返回的结果");
//				console.log(xhr.responseText);
                //成功  执行成功的函数
                success(xhr);
 
				
			} else {
				//失败  执行失败函数
				errorP(xhr);
//				console.log("没有接收到");
			}
		}

	}
	
//	如果在规定的时间没有得到响应  就终止请求
	//判断外界是否传入超时时间
//	if(timeout){
//		var timer=setInterval(function(){
//			xhr.abort();//中断请求
//			alert("5");
//			clearInterval(timer);
//		},timeout);
//	}
}