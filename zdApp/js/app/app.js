var App = (function($) {
	var app = {};
	
	/**
	 * 打开第三方分享页面
	 * @param {Object} data 需要分享的JSON信息 
	 */
	app.openShare = function(data) {
		url = '../examples/mshare.html';
		$.openWindow(url, 'share', {
			show: {
				duration: 100,
				aniShow: 'none'
			},
			styles: {
				height: '40%',
				bottom: 0,
				top: '60%',
				background: "rgba(0,0,0,0.6)"
			},
			extras: {
				jsonData: data
			}
		});
	}
	
	return app;
}(mui));