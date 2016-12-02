$(function(){

	function resize(){
		/*获取屏幕的宽度*/
		var windowWidth = $(window).width();

		var isSmallScreen = windowWidth < 768;

		/*遍历*/
		$('#main_ad > .carousel-inner > .item').each(function(i,item){
			/*把dom对象转换为jq对象*/
			var $item = $(item);
			/*判断*/
			var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
			/*设置背景
		  	大屏幕采用背景图片方式
			*/
			$item.css('backgroundImage','url("'+ imgSrc +'")');

			/*如果是小屏幕采用img方式*/
			if(isSmallScreen){
				$item.html('<img src="'+ imgSrc +'"/>');
			}else{
				$item.empty();
			}
		});
	}
	/*绑定事件*/
	 $(window).on('resize', resize).trigger('resize');

	 /*初始化tooltip插件*/
	 $('[data-toggle="tooltip"]').tooltip();

	 /*标签页标题的优化*/
	var $container = $(".nav-tabs");
	/*console.log($container);*/
	var width = 30;//扣除边框跟padding-left
	/*遍历*/
	/*console.log($container.children());*/
	$container.children().each(function(index, ele){
		width += ele.clientWidth;
	});

	//当是手机时显示横线滚动条,pc端时隐藏滚动条
	if(width > $(window).width()){
		$container.css('width', width).parent().css('overflow-x','scroll');
	}

	/*全部新闻a标签的hover*/
	var $title = $('.new_title');
	//绑定事件
	$("#newslist .nav-pills li a").on('click',function(){
		/*将js对象转换jq对象*/
		var $this = $(this);
		/*获取到标题内容*/
		var dataTitle = $this.data('title');
		/*把内容设置到相应位置*/
		$title.text(dataTitle);
	})

	/*手机轮播图*/
	/*1.判断鼠标滑动方向*/
	/*定位轮播容器位置*/
	var $carousels = $(".carousel");
	
	// console.log($carousels);
  	var startX, endX;
  	var offset = 50;
  // 注册滑动事件
  	$carousels.on('touchstart', function(e) {
    // 手指触摸开始时记录一下手指所在的坐标X
    	/*console.log(e);*/
    	/*console.log(e.originalEvent.touches[0].clientX);*/
    	startX = e.originalEvent.touches[0].clientX;
  	});

  	$carousels.on('touchmove', function(e) {
  		endX = e.originalEvent.touches[0].clientX;
  		/*console.log(endX);*/
  	});

  	$carousels.on('touchend', function(e) {
  		/*2.根据滑动方向判断是图片滑动方向*/
  		var distance = Math.abs(endX - startX);
  		if(distance > offset){
  			$(this).carousel(startX > endX ?'next':'prev');
  		}
  		
  	});

});