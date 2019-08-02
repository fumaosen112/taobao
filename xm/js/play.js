//轮播图插件

class blaner{
    constructor(obj,boxDom){
		//1、属性（数据）
		this.boxDom = boxDom;
		this.imgDoms = [];//存储所有的图片标签
		this.liDoms = [];//存储所有的li标签（豆豆）
        this.arrowBoxDom = null;//存储左右箭头的容器
        this.myTimer=null;
        this.time=null;
        this.currindex=1;
        this.liwidth=null;
		this.j=1;
		this.lii=[];//c存放li的容器
		this.ul=null;
		this.li=null;
		// this.imgDom=null;
		let defaultObj = {
			width:500,
			height:375,
			imgs:["img/01.jpg","img/02.jpg","img/03.jpg","img/04.jpg"],
			timeSpace:1000,
			douColor:"pink",
			douHighColor:"red",
			douSize:10,
			douPos:"下",
			douIsCircle:true,
			ord:0,
			// type:"fade"//切换效果的类型
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		//2、创建外观（把数据应用在外观上）\
		// console.log(this.width);
        this.render();
        this.init();
		// this.addEvent();
		// this.autoPlay();
	}
	render(){
		this.boxDom.style.position = "relative";
        // var li;
        //创建ul放图片
        this.ul=document.createElement('ul');
        this.ul.style.cssText=`
        position: absolute;
        height:100%;
      
		`;
		// this.boxDom.appendChild(ul);
        //创建li
        for(let i=0;i<this.imgs.length;i++){
             this.li=document.createElement('li');
            this.ul.appendChild(this.li);
            this.li.style.cssText=`
            width: ${this.width}px;
            height: 100%;
            float: left;
			`;
			this.lii.push(this.li);			
		}
		
		this.boxDom.appendChild(this.ul);

		for(var i = 0;i<this.lii.length;i++){
			this.ul.appendChild(this.lii[i]);
		}
		
       
		//1、创建图片
		for(var i=0;i<this.imgs.length;i++){
			 this.imgDom = document.createElement("img");
			this.imgDom.src = this.imgs[i];
			this.imgDom.style.cssText = `
				width: 100%;
				height: 100%;	
				`;	
			this.lii[i].appendChild(this.imgDom)
			// this.imgDoms.push(this.imgDom);
		}
		//2、创建豆豆
		//1)、豆豆的容器ul
		let doudouBox = document.createElement("ul");
		this.ul.className='ulList';
		doudouBox.style.cssText = `
				padding:0px;
				position: absolute;
				list-style: none;
				z-index: 3;`;
		if(this.douPos=="上"){
			// console.log((this.width-(this.douSize*(this.imgs.length*2-1)))/2);
			doudouBox.style.left = `${(this.width-(this.douSize*(this.imgs.length*2-1)))/2}px`;
			doudouBox.style.top = "20px";			
		}else if(this.douPos=="下"){
			// doudouBox.style.right = "20px";//
			doudouBox.style.left = `${(this.width-(this.douSize*(this.imgs.length*2-1)))/2}px`;
			doudouBox.style.bottom = "20px";
		}	
		this.boxDom.appendChild(doudouBox);
		//2)、豆豆 li
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText = `
				float:left;
				width:${this.douSize}px;
				height: ${this.douSize}px;
				margin-right: ${this.douSize}px;
				background-color: ${this.douColor};
			`;
			if(this.douIsCircle){
				liDom.style.borderRadius="50%";
			}
			if(i==1){
				liDom.style.backgroundColor=this.douHighColor;
			}
			doudouBox.appendChild(liDom);
			this.liDoms.push(liDom);//放在数组里，方便其它函数使用
		}

		//3、创建左右按钮
		//1)、创建左右箭头的容器
		this.arrowBoxDom = document.createElement("div");

		this.arrowBoxDom.style.cssText = `
				position: absolute;
				left:0px;
				top:${(this.height-60)/2}px;
				width: 100%;
				height: 60px;
				z-index: 4;`;
		this.boxDom.appendChild(this.arrowBoxDom);

		//2)、创建左右箭头
		let leftDivDom = document.createElement("div");
		leftDivDom.style.cssText = `
				float:left;
				height: 100%;
				width: 50px;
				background-color: black;
				opacity: 0.5;`;
		this.arrowBoxDom.appendChild(leftDivDom);


		let rightDivDom = document.createElement("div");
		rightDivDom.style.cssText = `
				float:right;
				height: 100%;
				width: 50px;
				background-color: black;
				opacity: 0.8;`;
		this.arrowBoxDom.appendChild(rightDivDom);
	}

    //添加事件
		
	 init(){		 
          
			 //取第一张图片
             var ulList=this.ul;   
             var List=ulList.children;
             var len=List.length;
			 var imgF=List[0];//第一张图片
			 var copyF=imgF.cloneNode(true);
			 var imgL=List[len-1];//最后一张图片
			 var copyL=imgL.cloneNode(true);
			 ulList.appendChild(copyF);
			 ulList.appendChild(copyL,imgF);
             var lis=ulList.children;
             var len=lis.length;
			 this.liwidth=List[0].offsetWidth;
             ulList.style.width=len*this.liwidth+'px';//ul总宽度
            //  console.log(ulList.style.width);
             ulList.style.left=-this.liwidth+'px';//为了把第一个图片显示  把刚刚克隆的第一个推进去
			//5、左右按钮
		        let leftBtn = this.arrowBoxDom.firstElementChild;
		        leftBtn.onclick = ()=>{
					// alert("pp");
					this.slidePrve();
					console.log(this.currindex);
	        	}
		        let rightBtn = this.arrowBoxDom.lastElementChild;
		        rightBtn.onclick = ()=>{
			        this.slideNext();
		    }
   
            //4、点击豆豆，跳转到对应的图片
            let obj = this;
            for(var i=0;i<this.liDoms.length;i++){
                this.liDoms[i].onclick =function(){
                  obj.slideTo(parseInt(this.getAttribute("index")));
                  for(var k=0;k<obj.liDoms.length;k++){
                    obj.liDoms[k].style.backgroundColor='pink';
                  }
                //   console.log(obj.douHighColor);
                    this.style.backgroundColor=obj.douHighColor;
                };
            }
            this.boxDom.onmouseover = ()=>{
                this.stop();
            }
    
            //3、鼠标离开轮播图会继续播放
            this.boxDom.onmouseout = ()=>{
                this.auto();
            }
    
            this.auto();

		};
	 slideNext(){
			this.currindex++;
			this.slideTo(this.currindex);
		};
	 slidePrve(){
			this.currindex--;
			this.slideTo(this.currindex);
		};
	slideTo(index){
            var ulList=this.ul;
            var long=ulList.children.length;
			if(index===long){
				this.currindex=index=2;
				ulList.style.left=-this.liwidth+'px';
			}if(index===-1){
				this.currindex=index=long-3;
				ulList.style.left=-(long-2)*this.liwidth+'px'
			}
			var left=-index*this.liwidth;
            this.trans(ulList,left)
            
            for(var k=0;k<this.liDoms.length;k++){
                this.liDoms[k].style.backgroundColor='pink';
              }
            //   console.log(obj.douHighColor);
          
           
           
            this.j++;
            if(this.j>this.liDoms.length-1){
                this.j=0;
            }
            // console.log(this.j);
            this.liDoms[this.j].style.backgroundColor=this.douHighColor;
            // console.log(index);
		};
	 auto(){
        this.time=setInterval(() => {
                this.slideNext() 
            }, 4000);
		};
	 stop(){
			clearInterval(this.time)
		};
    trans(obj,target){
        clearInterval(this.myTimer);
        this.myTimer=setInterval( ()=>{
            //处理方向问题
            var cle=target>obj.offsetLeft ? 50 : -50;
            //让它动起来
            var newL=obj.offsetLeft+cle
            obj.style.left=newL+'px';
            //处理偏差值
            if(Math.abs(target-obj.offsetLeft)<Math.abs(cle)){//这样就可以让它精确定位到target
               
                obj.style.left=target+'px';
                clearInterval(this.myTimer);
                    // console.log(target);
            }
            
        },60)
    }

}   

function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	