"use strict";


$(function(){
	  var ok=true;
	  $("#login").click(function(){
       var username=$('input[name="username"]').val();
	   var password=$('input[name="password"]').val();
           if(username==""||password=="")
		{
			$(".warning").text("请输入用户名和密码");
			ok=false;
		}
		else{
			ok=true;
		}
		if(ok==true){
			window.location.href = "index.html?username="+username;
		// $.get("url",{username:username,password:password},function(datd){
		// 	if(data.status==0)
		// 	{
				
		// 	}
	 //     	if(status == 1)
		// 	{
		// 		  $(".warning").text("用户名或密码错误!");
		// 	}
		// },'json')
		}
	})
	 $("#free-res").click(function(){
	 	window.location.href = "res.html?";
	 })

 
 
})

