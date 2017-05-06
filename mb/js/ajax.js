"use strict";
$(function(){	
	init();
});
   var imgs =[
    { "id":"1",
     "src":"img/img-01.png"
    },
    { "id":"2",
     "src":"img/detail.jpg"
    },
    { "id":"3",
      "src":"img/img-01.png"
    },
    { "id":"4",
   "src":"img/detail.jpg"
    },
    ];
//首页轮播图的动态获取
    $(imgs).each(function(index,good){
     $("#imgs").append($('<li></li>').append($('<img src="" alt="" />').attr("src",good.src))
               .click(function(){
                window.location.href="detail.jsp?id="+good.id; 
                })
                )
              
    });

	var pagesize =4;//一页显示的条数
	var page=1;//新品的初始页
	var status;//控制四种不同获取商品信息初始化方式的切换的状态字
	var typepage=1;//分类搜索的起始页
	var searchpage=1;//搜索框搜索的起始页
	var likepage=1;//猜你喜欢的起始页
	var classifyText;//搜索框的文本
	var loading=false;//控制是否发送请求的数据

	//动态获取加载首页轮播的图片
//    $.get("/api/MbShopGoods",{size:4},function(data){
//      $(data).each(function(index,good){
//      $("#imgs").append($('<li></li>').append($('<img src="" alt="" />').attr("src",good.src))
//        .click(function(){
//                     window.location.href="detail.html?id="+good.id; })
//                     )
//    });
//   },'json')
     function addpendDom(good){
          $("#main-cons").append($('<figure></figure>').append($('<img src="" alt="" />').attr('src',window.location.protocol+"//"+window.location.host+"/mb/"+good.brand))
                         .append($('<figcaption></figcaption>')
                         .append($('<p></p>').append($('<span></span>').text("￥"+good.price))//价格
                         .append($('<span></span>').text(good.type)))//新旧程度
                         .append($('<p></p>').text(good.goodsName)))
                         .click(function(){
                          window.location.href="detail.jsp?id="+good.goodsId;          
                         })
                        )
        }

  
        
              
     function init(){
          console.log("1111");
          status = 1;
          //if(loading == false)
          //{
          $.post("http://localhost:8080/mb/GoodsServlet?method=findByPage",{goodsId:page,size:4},function(data){
            //loading == true;
           // }
            $(data).each(function(index,good){
            addpendDom(good);
            });

          },'json')

          page++;
     }
       
    //猜你喜欢物品初始化
     function resetData(){
           status = 2;
          //if(loading == false)
          //{
           $.post("http://localhost:8080/mb/GoodsServlet?method=findVague",{username:$("#username").val(),likepage:likepage},function(data){
          // loading = true;
          //}
              $(data).each(function(index,good){
                addpendDom(good);   
              });
            },'json')

            likepage++;
      }

            //搜索框点击商品初始化
     function searchData(){
          status = 3;
          //if(loading == false)
          //{
          $.post("http://localhost:8080/mb/GoodsServlet?method=findByName",{name:$("#input").val(),searchpage:searchpage},function(data){
          // loading = true;
          //}   
            $(data).each(function(index,good){          
              addpendDom(good);      
            });

          },'json')

          searchpage++;
    }    
            //按照分类搜索商品初始化
    function searchTypeData(classifyText){                  
            status = 4; 
                //if(loading == flase)
                //{
            $.post("http://localhost:8080/mb/GoodsServlet?method=findByType",{classifText:classifyText,typepage:typepage},function(data){
                //loading = true;
                //}      
              $(data).each(function(index,good){
                 addpendDom(good);                
              });

            },'json') 
                
            typepage++;  
      }


//回到顶部按钮事件
    $("#back-top").click(function(){ //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
     $("#scroller").css("top","-100px");
    });

	// 分类的显示和隐藏
    $("#slidebar").click(function(){
     $("#classify").toggle();
    });
     
    //下拉分类菜单点击事件
    $('#classify li').each(function(index,obj){                     
	    $(this).click(function(){		    	
		classifyText=$(this).text();
           $("#classify").toggle();
		       $('#main').find('section:last').css("display","none")
		       $('#main').find('section:first').css("display","block")
           $("#title").find("li:first").addClass("active").siblings().removeClass("active");
		       $("#main-cons").find("figure").remove();
		       searchTypeData(classifyText);
            myScroll.refresh();
		       });
		   });

       // search框点击事件
    $("#search").click(function(){
        $("#main").find("section:first").css("display","block");
        $("#main").find("section:last").css("display","none");
        $("#main-cons").find("figure").remove();
        $("#title").find("li:first").addClass("active").siblings().removeClass("active");
            searchData();
            myScroll.refresh();
         })

         //猜你喜欢和新品菜单切换

    $("#title").find("li:first").click(function(){
            $(".main-cons:first").css("display","block");
            $(".main-cons:last").css("display","none");
            $(this).addClass("active").siblings().removeClass("active");
            $("#main-cons").find("figure").remove();
                page=1;
                init(); 
                myScroll.refresh(); 
          })
    $("#title").find("li:last").click(function(){
          $(this).addClass("active").siblings().removeClass("active");
            $('.main-cons:last').css("display","block");
            $(".main-cons:first").css("display","none");
               myScroll.refresh();
          })            
          

    //猜你喜欢表单提交
    $("#like-up").click(function(){
          $('#main').find('section:last').css("display","none")
          $('#main').find('section:first').css("display","block")
          $("#main-cons").find("figure").remove();
           resetData();
           myScroll.refresh();
        });  
        
 

 
 //滚动条插件
 var myScroll,pullDownEl,pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0;
   
 function pullUpAction () {
 
  setTimeout(function () { 
     var el = document.getElementById('main-cons');
	   console.log(status);
    switch(status){
    
	    case '1':init();loading=false;
      break;
      case '2':resetData();loading=false;
      break;
      case '3':searchData();loading=false;
      break;
      case '4':searchTypeData(classifyText);loading=false;
      break;
    }    
   
  }, 1000); 
}

  function loaded() {
  pullUpEl = document.getElementById('pullUp'); 
  pullUpOffset = pullUpEl.offsetHeight;
  
  myScroll = new iScroll('wrapper', {
    scrollbarClass: 'myScrollbar',
    useTransition: false,
    topOffset: pullUpOffset,
    onRefresh: function () {
      if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
      }
    },
    onScrollMove: function () {
       if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始...';
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
        this.maxScrollY = pullUpOffset;
      }
    },
    onScrollEnd: function () {
       if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = 'loading...';        
        pullUpAction();
        myScroll.refresh();   // Execute custom function (ajax call?)
      }
    }
  });
  
  setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);

  