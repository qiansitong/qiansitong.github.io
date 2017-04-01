//解析参数
function GetParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	//[^&]匹配不是&的任意字符
	var r = window.location.search.substr(1).match(reg);
	console.log(window.location.search);
	if(r!=null)return unescape(r[2]); 
	return null;
}