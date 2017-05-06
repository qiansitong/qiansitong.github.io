//11月16日 控制公告滚动
window.onload=function(){
  new Marquee(
    "scrollBox2",  //容器ID<br>
    0,  //向上滚动(0向上 1向下 2向左 3向右)<br>
    2,  //滚动的步长<br>
    100,  //容器可视宽度<br>
    32,  //容器可视高度<br>
    50,  //定时器 数值越小，滚动的速度越快(1000=1秒,建议不小于20)<br>
    2000,  //间歇停顿时间(0为不停顿,1000=1秒)<br>
    1000,  //开始时的等待时间(0为不等待,1000=1秒)<br>
    32//间歇滚动间距(可选)<br>
  );
};
function Marquee(){
  this.ID=document.getElementById(arguments[0]);//滚动元素id
  this.Direction=arguments[1];//滚动方向
  this.Step=arguments[2];//滚动步长
  this.Width=arguments[3];//盒子的宽度
  this.Height=arguments[4];//盒子的高度
  this.Timer=arguments[5];//滚动速度
  this.WaitTime=arguments[6];//间歇停顿的时间
  this.StopTime=arguments[7];//启动滚动的时间
  if(arguments[8]){this.ScrollStep=arguments[8];}else{this.ScrollStep=this.Direction>1?this.Width:this.Height;}
  //根据滚动的方向来判断是滚动的宽度还是高度
  this.CTL=this.StartID=this.Stop=this.MouseOver=0;
  //设置滚动盒子的样式
  this.ID.style.overflowX=this.ID.style.overflowY="hidden";
  this.ID.noWrap=true;
  this.ID.style.width=this.Width;
  this.ID.style.height=this.Height;
  this.ClientScroll=this.Direction>1?this.ID.scrollWidth:this.ID.scrollHeight;//实际滚动内容的高度和宽度,此处为实际内容高度
  console.log(this.ClientScroll);
 
  this.ID.innerHTML+=this.ID.innerHTML;//复制一份实现无缝滚动
  
  //调用start方法
  this.Start(this,this.Timer,this.WaitTime,this.StopTime);//此处是对Marquee上的start方法的调用,该方法定义在Marquee的prototype上
}
Marquee.prototype.Start=function(msobj,timer,waittime,stoptime){
  msobj.StartID=function(){msobj.Scroll();}//此处是对Marquee上的Scroll方法的调用,该方法定义在Marquee的prototype上
  msobj.Continue=function(){
	  if(msobj.MouseOver==1){setTimeout(msobj.Continue,waittime);}
	  else{clearInterval(msobj.TimerID); msobj.CTL=msobj.Stop=0; msobj.TimerID=setInterval(msobj.StartID,timer);}
  }
  msobj.Pause=function(){msobj.Stop=1; clearInterval(msobj.TimerID); setTimeout(msobj.Continue,waittime);}
  msobj.Begin=function(){//
    msobj.TimerID=setInterval(msobj.StartID,timer);//每隔50s调用一次startID函数
    msobj.ID.onmouseover=function(){msobj.MouseOver=1; clearInterval(msobj.TimerID);}
    msobj.ID.onmouseout=function(){msobj.MouseOver=0; if(msobj.Stop==0){clearInterval(msobj.TimerID); msobj.TimerID=setInterval(msobj.StartID,timer);}}
  }
  setTimeout(msobj.Begin,stoptime);//开启滚动
}
Marquee.prototype.Scroll=function(){//滚动函数主要是改变元素scrollTop的值
  switch(this.Direction){
    case 0:
      this.CTL+=this.Step;//控制每一次每隔50ms增加的高度
      if(this.CTL>=this.ScrollStep && this.WaitTime>0){//如果累加的滚动距离达到间歇滚动的距离，则需要间歇停顿一段时间
    	  //第一次this.ID.scrollTop的值为30,第二次this.ID.scrollTop的值为62
    	  this.ID.scrollTop+=this.Step; //滚动条距离顶部的距离变为32,滚动条距离为62+2=64
    	  this.Pause(); //停止一段时间，重新调用scroll函数，将CTL重新置为0
    	  return;
      }else{ 
    	 if(this.ID.scrollTop>=this.ClientScroll) //如果滚动的高度超过实际需要滚动内容的高度
    		 this.ID.scrollTop-=this.ClientScroll;//则将滚动的高度重新设置为0	
    	 this.ID.scrollTop+=this.Step; //每隔50ms增加2
      }
      break;
    case 1:
      this.CTL+=this.Step;
      if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollTop-=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
      else{if(this.ID.scrollTop<=0) this.ID.scrollTop+=this.ClientScroll; this.ID.scrollTop-=this.Step;}
      break;
    case 2:
      this.CTL+=this.Step;
      if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollLeft+=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
      else{if(this.ID.scrollLeft>=this.ClientScroll) this.ID.scrollLeft-=this.ClientScroll; this.ID.scrollLeft+=this.Step;}
      break;
    case 3:
      this.CTL+=this.Step;
      if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollLeft-=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
      else{if(this.ID.scrollLeft<=0) this.ID.scrollLeft+=this.ClientScroll; this.ID.scrollLeft-=this.Step;}
      break;
  }
}