
function $(str){//#box .cls  p
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}
function trans(obj,target,speed){
				clearInterval(obj.time);
				obj.time=setInterval(function(){
					//处理方向问题
					var cle=target>obj.offsetLeft ? speed : -speed;
					//让它动起来
					var newL=obj.offsetLeft+cle
					obj.style.left=newL+'px';
					//处理偏差值
					
					
					if(Math.abs(target-obj.offsetLeft)<Math.abs(cle)){//这样就可以让它精确定位到target
						clearInterval(obj.time);
						obj.style.left=target+'px';
							 //console.log(target);
					}
					
				},60)
			}
		
		function init(obj,buttPrve,buttNext,doudou,addClass){
			// clearInterval(timer);
			init2();
			currindex=1;
		   
			//取第一张图片
			var listl=document.getElementById(obj);
			var List=document.getElementById(obj).children;
			
			var imgF=List[0];
			var copyF=imgF.cloneNode(true);
			var imgL=List[3];
			var copyL=imgL.cloneNode(true);
			listl.appendChild(copyF);
			listl.appendChild(copyL,imgF);
			lis=document.getElementById(obj).children;
			liwidth=lis[0].offsetWidth;
			listl.style.width=lis.length*liwidth+'px';
			listl.style.left=-liwidth+'px';
			document.getElementsByClassName(buttPrve)[0].onclick=function(){
				slidePrve(obj,doudou,addClass)
			};
			document.getElementsByClassName(buttNext)[0].onclick=function(){
				slideNext(obj,doudou,addClass)
			}

			document.getElementById(obj).onmouseover=function(){
			   stop();
		   }
		   document.getElementById(obj).onmouseleave=function(){
			   auto(obj,doudou,addClass);
		   }
		   auto(obj,doudou,addClass);

			var bull=document.getElementsByClassName(doudou);
			for(var i=0;i<bull.length;i++){
			   bull[i].num=i;
			   bull[i].onclick=function(){
				   currindex=this.num+1;
				   slideTo(currindex,obj,doudou,addClass);
			   }
		   }
	   };
	   function slideNext(obj,doudou,addClass){
		   currindex++;

		   slideTo(currindex,obj,doudou,addClass);
			//console.log(liwidth);
	   };
	   function slidePrve(obj,doudou,addClass){
		   currindex--;
		   slideTo(currindex,obj,doudou,addClass);
	   };
	   function slideTo(index,obj,doudou,addClass){

		   var list2=document.getElementById(obj);
		   if(index===lis.length){
			   currindex=index=2;
			   list2.style.left=-liwidth+'px';
		   }if(index===-1){

			   currindex=index=lis.length-3;
			   list2.style.left=-(lis.length-2)*liwidth+'px'
		   }
		   var fouce;
		   var bullL=document.getElementsByClassName(doudou);
		   if(index===0){
			   fouce=bullL.length-1;
		   }else if(index===lis.length-1){
			   fouce=0;
		   }else{
			   fouce=index-1;
		   }
		   document.getElementsByClassName(addClass)[0].className=doudou;
		   bullL[fouce].className=doudou+' '+addClass;


		   var left=-index*liwidth;
		   trans(list2,left,50)
	   };
   



	   function auto(obj,doudou,addClass){
		  timer=setInterval(function(){

			   slideNext(obj,doudou,addClass);
		   }, 4000);
	   };
	   
	   function stop(){
		   clearInterval(timer)
	   };
	   function init2(){
		var currindex;
		var lis;
		var liwidth;
		var timer;
	}