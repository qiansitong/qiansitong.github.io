(function($){
	$.fn.Slider = function(){

		var timer = null;
		return this.each(function(){
			var abtn = $(this).find("div a");//获取按钮
			var imgli = $(this).find("ul li");//获取图片

			var right = $(this).find("#btnNext");//获取右点击
			var left = $(this).find("#btnPrev");//获取左点击
			var len = abtn.length;
			var bFlag=true,aFlag=true;//两个信号变量

			if(abtn.length==0){
				bFlag=false;//按钮不存在
			}else{
				bFlag=true;
			}

			if(right.length==0&&left.length==0){
				aFlag=false;//箭头不存在
			}else{
				aFlag=true;
			}
			var iNow=0;//当前索引

			// 如果都存在
			if(bFlag && aFlag){
				// var length = $(this).find("#buttons li").length;
				abtn.click(function(){
					var index = $(this).index();

					iNow=index;

					imgli.eq(iNow).stop().animate({
						opacity:1
					},800);

					imgli.eq(iNow).siblings().stop().animate({
						opacity:0
					},800);

					$(this).addClass('on').siblings().removeClass('on');

				})

				autoSlider(iNow,imgli,abtn);

				right.click(function(){
					iNow++;
					if(iNow>=len){
						iNow=0;
					}
					imgli.eq(iNow).stop().animate({
						opacity:1
					},800);

					imgli.eq(iNow).siblings().stop().animate({
						opacity:0
					},800);
					abtn.eq(iNow).addClass('on').siblings().removeClass('on');
				})

				left.click(function(){
					iNow--;
					if(iNow<0){
						iNow=len-1;
					}
					imgli.eq(iNow).stop().animate({
						opacity:1
					},800);

					imgli.eq(iNow).siblings().stop().animate({
						opacity:0
					},800);
					abtn.eq(iNow).addClass('on').siblings().removeClass('on');
				})

			}else if(bFlag == true && aFlag == false){
				abtn.click(function(){
					var index = $(this).index();

					iNow=index;

					imgli.eq(iNow).stop().animate({
						opacity:1
					},800);

					imgli.eq(iNow).siblings().stop().animate({
						opacity:0
					},800);

					$(this).addClass('on').siblings().removeClass('on');

				})
				
				autoSlider(iNow,imgli,abtn);
			}else{
				autoSlider(iNow,imgli);
			}
            //停止切换事件
			$(this).hover(function(){
				clearInterval(timer);
			},function(){
				autoSlider(iNow,imgli,abtn);
			})
		});
		
		function autoSlider(index,obj,btn){
			var len = obj.length;
			var argv = arguments.length;
			clearInterval(timer);
			timer = setInterval(function(){
				index++;
				if(index>=len){
					index = 0;
				}
				obj.eq(index).stop().animate({
					opacity:1
				},800);

				obj.eq(index).siblings().stop().animate({
					opacity:0
				},800);
				if(argv==3){
					btn.eq(index).addClass('on').siblings().removeClass('on');
				}else{
					return;
				}
			},2000)
		}
	}
})(jQuery);
