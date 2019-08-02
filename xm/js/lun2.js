//从上到下轮播图插件

class blan{
    constructor(obj,boxDom){
		//1、属性（数据）
		this.boxDom = boxDom;
		this.imgDoms = [];//存储所有的图片标签
        this.myTimer=null;
        this.time=null;
        this.currindex=1;
        this.liheight=null;
	
		this.lii=[];//c存放li的容器
		this.ul=null;
		this.li=null;
		// this.imgDom=null;
		let defaultObj = {
			width:500,
			height:375,
			imgs:["img/01.jpg","img/02.jpg","img/03.jpg","img/04.jpg"],
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
		// this.boxDom.style.position = "relative";
		this.boxDom.style.overflow='hidden';
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
            height: 195px;
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
			 this.liheight=List[0].offsetHeight;
             ulList.style.height=len*this.liheight+'px';//ul总宽度
            //  console.log(ulList.style.width);
             ulList.style.top=-this.liheight+'px';//为了把第一个图片显示  把刚刚克隆的第一个推进去
            //4、自动
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
				ulList.style.top=-this.liheight+'px';
			}if(index===-1){
				this.currindex=index=long-3;
				ulList.style.top=-(long-2)*this.liheight+'px'
			}
			var height=-index*this.liheight;
            this.trans(ulList,height)
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
            var cle=target>obj.offsetTop ? 50 : -50;
            //让它动起来
            var newL=obj.offsetTop+cle
            obj.style.top=newL+'px';
            //处理偏差值
            if(Math.abs(target-obj.offsetTop)<Math.abs(cle)){//这样就可以让它精确定位到target
               
                obj.style.top=target+'px';
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