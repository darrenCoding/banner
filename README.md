# banner
How to use

    1. Include Slider on your site.

    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/fade.js"></script> 
    
    2. Structure of HTML.
    
    <div class="demo">
      	<div class="slider-box">
      	  	<ol class="slider">
      	  		<li>
	          	  	<img src="#" alt="" width="" height="" />
      	  		</li>
          	    <li>
	          	  	<img src="#" alt="" width="" height="" />
	          	</li>
	          	<li>
	          	  	<img src="#" alt="" width="" height="" />
	          	</li>
	          	<li>
	          	  	<img src="#" alt="" width="" height="" />
	          	</li>
          	</ol>
        </div>
    </div>
    
    3.Initialize Slider
    
    $(".slider").slider({
     	direction : 'horizontal',//horizontal(水平轮播) or vertical(竖直轮播) or fader(渐变轮播)
        speed : '300',
        width : null,
        height : null,
        easing : 'linear',
        autoPlay : true,//是否自动轮播
        delayTime : '2',//轮播间隔时间
        hideDot : false,//是否隐藏点击按钮
        hideArrow : false,//是否隐藏左右箭头
        fadeInTime : 200,//如果direction是fader的话设置淡出时间
        fadeOutTime : 200//如果direction是fader的话设置淡入时间
    });

浏览器兼容: IE7+，Chrome，Firefox，Opera，safari
