(function(window){
$(document).mousedown(function(e){
		e.stopPropagation();
});

var	page={
	data:{
		sPlaying : false,
		scale_num : 0.49,
		direction : 0,
		fix_scroll:false,
		scroll_Y:0,
		fix_scroll_y:-100000,
		fix_num:0,
		first_come:0,
		music_souce : [{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p1.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p2.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p3.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p4.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p5.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p6.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p7.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p8.wav'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p9.wav'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p10.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p11.mp3'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p12.wav'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p13.wav'},{
			src:'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/p14.mp3'}]
	},
	init:function(){
		//$('.loading').css('display','none');
		$('.loading').on('touchstart',function(e){
			return false
		})
		var that = this;
		that.rotateDiv($('.site'));
		that.initScreen();

		that.preload(function(){
			setTimeout(function(){
				$('.loading').css('display','none');
				$('.font1').addClass('slow_show');

			},500);
			$('#s1').css('visibility','initial');
			that.changeMusic(that.data.music_souce[0].src);
		})
		that.intMusic();
		that.preloadMusic();

		that.inieScroll();
		that.initScrollMagic();


		$('.share_btn').click(function(){
			$('.share_crow').css({opacity:1});
		})

		$('.read_again_btn').attr('href',window.location.href);
	},
	initScreen:function(){
		var that = this;
		var win_w = $(window).width();
		if(win_w<400){
			that.data.scale_num = 0.485;
		}else if(win_w>400){
			that.data.scale_num = 0.55;
		}

		$('.scene-wrapper').css({
			width:24012,
			height:'100%',
			'-webkit-transform':'scale('+that.data.scale_num+')',
			'-webkit-transform-origin':'0px 50% 0px'
		});
	},
	initScrollMagic:function(){
		var that = this;
		var controller = new ScrollMagic.Controller();

		var tween = TweenMax.fromTo(".crow", 1,
			{opacity:1},
			{opacity:0, repeat: 0, yoyo: false, ease: Circ.ease}
			);

		var scene = new ScrollMagic.Scene({
			triggerElement: ".p1",
			duration: 200,
			offset: 225,
			triggerHook:0.3
		})
		.setTween(tween)
		.addTo(controller)
		.on("enter leave",function(e){
			if(e.type == "enter"){
				if(that.data.first_come>0){
					that.changeMusic(that.data.music_souce[0].src);
				}else{
					$('.pg3').after(HtmlTpl);
				}
				$('.font1').addClass('slow_show');
				that.data.first_come++;

			}else if(e.type == "leave"){
				$('.font1').removeClass('slow_show');
			}
		});
		var scene2 = new ScrollMagic.Scene({
			triggerElement: ".p2",
			duration: 300,
			offset: -45,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function(e){
			if(e.type == "enter"){

				$('.font2').addClass('slow_show');
			}else if(e.type == "leave"){
				$('.font2').removeClass('slow_show');
			}
		});

		var scene3 = new ScrollMagic.Scene({
			triggerElement: ".p2",
			duration: 160,
			offset: 380,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("progress",function  (e) {

			var pro = e.progress.toFixed(1);
			$('.rili').css({'-webkit-transform':'rotateZ('+pro*-6+'deg)'});
			$('.pepar1').css({'-webkit-transform':'translateX('+(-25+pro*180)+'px) translateY('+(2+pro*-70)+'px)'});
			$('.pepar2').css({'-webkit-transform':'translateX('+(-25+pro*185)+'px) translateY('+(2+pro*8)+'px)'});

		})
		.on("enter leave",function(e){
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[1].src);
				$('.font3').removeClass('delay3');
				$('.font3').addClass('slow_show');
			}else if(e.type == "leave"){
				$('.font3').addClass('delay3');
				$('.font3').removeClass('slow_show');
			}
		});

		var scene4 = new ScrollMagic.Scene({
			triggerElement: ".p3",
			duration: 400,
			offset: 360,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[2].src);
				$('.font4').addClass("slow_show");
			}else if(e.type == "leave"){
				$('.font4').removeClass("slow_show");
			}

		});

		var scene5 = new ScrollMagic.Scene({
			triggerElement: ".p4",
			duration: 380,
			offset: 80,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				$('.di_tie').addClass("shake");
			}else if(e.type == "leave"){
				$('.di_tie').removeClass("shake");
			}
		});

		var scene6 = new ScrollMagic.Scene({
			triggerElement: ".p5",
			duration: 400,
			offset: -20,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				$('.font5').addClass("slow_show");
			}else if(e.type == "leave"){
				$('.font5').removeClass("slow_show");
				that.changeMusic(that.data.music_souce[3].src)
			}
		});

		var scene7 = new ScrollMagic.Scene({
			triggerElement: ".p6",
			duration: 400,
			offset: 150,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[4].src);
				$('.font6,.han_di').addClass("slow_show");

				$('.han_di').css({'-webkit-transform':'translate3d(970px,100px,0)'})
			}else if(e.type == "leave"){
				$('.font6').removeClass("slow_show");
			}
		});

		var scene8 = new ScrollMagic.Scene({
			triggerElement: ".p7",
			duration: 340,
			offset: 160,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				$('.tao').addClass('zoomIn');
			var deley00 = setTimeout(function(){
					$('.font7').addClass("slow_show");
					clearTimeout(deley00);
					deley00 = null;
				},400);

			}else if(e.type == "leave"){
				$('.font7').removeClass("slow_show");
				$('.tao').removeClass("zoomIn");
			}
		});

		var scene9 = new ScrollMagic.Scene({
			triggerElement: ".p8",
			duration: 360,
			offset: -10,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				$('.font8').addClass("slow_show");
			}else if(e.type == "leave"){
				$('.font8').removeClass("slow_show");
			}
		});

		var scene10_1 = new ScrollMagic.Scene({
			triggerElement: ".wechat_star1",
			duration: 250,
			offset: -130,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				that.data.fix_scroll = true;
				if(that.data.fix_num == 0){
					that.data.fix_scroll_y = that.data.scroll_Y;
					that.data.fix_num ++;
				}

				$('.font9_2').addClass("slow_show delay2");
				$('.font9_1').addClass("slow_show");

			}else if(e.type == "leave"){
				that.data.fix_scroll = false;

				$('.font9_2').removeClass("slow_show");
				$('.font9_1').removeClass("slow_show");
			}
		})

		var scene10_2 = new ScrollMagic.Scene({
			triggerElement: ".wechat_star2",
			duration: 200,
			offset: -80,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[6].src);
			}
		})
		.on("progress",function(e){
			var pro = e.progress.toFixed(1);
			$('.renwu,.font9_1,.font9_2').css({
				'-webkit-transform':'translate3d(0,0,0)',
			});
			$('.message1').css({
				'-webkit-transform':'translate3d('+(77-pro*134)+'px,-40px,0)',
				opacity:1*pro
			});
			$('.message2').css({
				'-webkit-transform':'translate3d('+(97-pro*134)+'px,140px,0)',
				opacity:1*pro*pro
			});
			$('.message3').css({
				'-webkit-transform':'translate3d('+(117-pro*134)+'px,272px,0)',
				opacity:1*pro*pro*pro
			});
		});

		var scene11 = new ScrollMagic.Scene({
			triggerElement: ".p10",
			duration: 380,
			offset: -50,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

					$('.finger').css({
						'-webkit-transform':'rotateZ(-5deg) translateX(0)'
					});
					$('.juice').css({
						'-webkit-transform':'rotateZ(6deg) translateX(17px)'
					});

				var deley02 = setTimeout(function(){
					that.changeMusic(that.data.music_souce[7].src);
					clearTimeout(deley02);
					deley01 = null;
				},300);

				$('.font10').addClass("slow_show");
			}else if(e.type == "leave"){
				$('.font10').removeClass("slow_show");

				$('.finger').css({
					'-webkit-transform':'rotateZ(-5deg)'
				});
				$('.juice').css({
					'-webkit-transform':'rotateZ(-18deg) translateX(-6px)'
				});
			}
		});

		var scene12 = new ScrollMagic.Scene({
			triggerElement: ".p11",
			duration: 420,
			offset: 100,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				$('.font11').addClass("slow_show");
				$('.han_di2').css({
					'-webkit-transform':'translate3d(502px,65px,0)',
					opacity:1
				});
			}else if(e.type == "leave"){
				$('.font11').removeClass("slow_show");
			}
		});

		var scene13 = new ScrollMagic.Scene({
			triggerElement: ".p12",
			duration: 360,
			offset: 60,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[9].src);
				$('.font12').addClass("slow_show");

			}else if(e.type == "leave"){
				$('.font12').removeClass("slow_show");
			}
		});

		var scene14 = new ScrollMagic.Scene({
			triggerElement: ".p13",
			duration: 500,
			offset: 180,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){

				$('.font13').addClass("slow_show");

			}else if(e.type == "leave"){
				$('.font13').removeClass("slow_show");
			}
		});

		var scene15 = new ScrollMagic.Scene({
			triggerElement: ".p15",
			duration: 480,
			offset: 50,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[11].src);
				$('.font15').addClass("slow_show");
				$('.denglong').css({
					'-webkit-transform':'translate3d(90px, -118px, 0px) rotateZ(3deg)'
				});
			}else if(e.type == "leave"){
				$('.font15').removeClass("slow_show");
				$('.denglong').css({
					'-webkit-transform':'translate3d(90px, -108px, 0px) rotateZ(-17deg)'
				});
			}
		});

		var scene16 = new ScrollMagic.Scene({
			triggerElement: ".p16",
			duration: 120,
			offset: 320,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[12].src);

	 			$('.child').addClass('child_jump');
			}
		});

		var scene17 = new ScrollMagic.Scene({
			triggerElement: ".p17",
			duration: 100,
			offset: 380,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				that.changeMusic(that.data.music_souce[13].src);
			}
		});
		var scene18 = new ScrollMagic.Scene({
			triggerElement: ".p18",
			duration: 100,
			offset: -110,
			triggerHook:0.3
		})
		.addTo(controller)
		.on("enter leave",function  (e) {
			if(e.type == "enter"){
				$('.share').css('display','block');
			}
		});
	},
	inieScroll:function(){
		$('#wrapper').css({
			width:'100%',
			height:$(window).height()
		})
		var that = this;
		myScroll = new IScroll('#wrapper', {
			probeType: 3,
			mouseWheel: true,
			deceleration: 0.0218,
			mouseWheelSpeed:60
		});
		var s1_distance = 0;
		var diff = 0;
		myScroll.on('scroll', function(e){
			that.data.scroll_Y = this.y;

			if(that.data.scroll_Y <= that.data.fix_scroll_y){
				diff = -250;
			}else{
				diff = 0;
			}
			if(that.data.fix_scroll){

				$('#s1').css('-webkit-transform',"translateX("+that.data.fix_scroll_y+"px) scale("+that.data.scale_num+")");
				$('#s2').css('-webkit-transform',"translateX("+that.data.scroll_Y+"px) scale("+that.data.scale_num+")");
			}else{

				s1_distance = that.data.scroll_Y - diff;
				$('#s1').css('-webkit-transform',"translateX("+s1_distance+"px) scale("+that.data.scale_num+")");
				$('#s2').css('-webkit-transform',"translateX("+that.data.scroll_Y+"px) scale("+that.data.scale_num+")");

			}

		});

	},
	intMusic:function(){
		var that = this;
		that.playMusic();
	    document.addEventListener("WeixinJSBridgeReady", function () {
	        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
	            network = e.err_msg.split(":")[1];  //结果在这里
	            that.playMusic();
	        });
	    }, false);
	},
	playMusic:function(){
		var audio1 = $('#BGM1');
	    var audio2 = $('#BGM2');
	    if (audio1.attr('src') == undefined || audio2.attr('src') == undefined) {

	        audio1.attr('src', 'https://www1.pchouse.com.cn/20180208/chuxi/H5/music/bgm2.mp3');
	        audio1.attr('autoplay', true);
	        audio2.attr('src', 'https://www1.pcauto.com.cn/wap/pocket/20180131lyhk/mr.mp3');
	        audio2.attr('autoplay', true);
	    }
	    audio1[0].play();
	    audio2[0].play();
	    this.data.isPlaying = true;
	},
	changeMusic:function(src){
		var m = document.getElementById('BGM2');
				m.pause();
				m.src=src;
				m.play();
	},
	rotateDiv:function($print){
		var width = document.documentElement.clientWidth;
		var height =  document.documentElement.clientHeight;

		if( width < height ){
			$print.width(height);
			$print.height(width);
			$print.css('top',  (height-width)/2 );
			$print.css('left',  0-(height-width)/2 );
			$print.css('-webkit-transform' , 'rotate(90deg)');
			$print.css('-webkit-transform-origin' , '50% 50%');
		}

		var evt = "onorientationchange" in window ? "orientationchange" : "resize";
		window.addEventListener(evt, function() {

		var width = document.documentElement.clientWidth;
		var height =  document.documentElement.clientHeight;

		if( width > height ){
			$print.width(width);
			$print.height(height);
			$print.css('top',  0 );
			$print.css('left',  0 );
			$print.css('-webkit-transform' , 'none');
			$print.css('-webkit-transform-origin' , '50% 50%');
        }else{
            $print.width(height);
            $print.height(width);
            $print.css('top',  (height-width)/2 );
            $print.css('left',  0-(height-width)/2 );
            $print.css('-webkit-transform' , 'rotate(90deg)');
            $print.css('-webkit-transform-origin' , '50% 50%');
        }
		}, false);
	},
	preloadMusic:function(){
		var that = this;
		that.data.music_souce.forEach(function(v,index){
			var div = '<audio preload="auto">'+'<source src="'+v.src+'" type="audio/ogg" />'+'</audio>'
			$('body').append(div);

		})
	},
	preload:function(callback){
		var preload = new createjs.LoadQueue(false);
	    var manifest = [
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/font-sprite.png"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p1.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p2.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p3.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p4.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p5.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p6.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p7.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p8.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p9.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p10.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p11.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p12.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p13.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p14.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p15.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p16.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p17.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/p18.jpg"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/di_tie1.png"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/di_tie2.png"},
	    {src:"https://www1.pchouse.com.cn/20180208/chuxi/H5/images/child.png"}
	    ];
	    preload.addEventListener("progress", handleProgress);
	    preload.addEventListener("complete", handleComplete);
	    preload.loadManifest(manifest);
	    function handleComplete(event) {
	      callback && callback()

	    }
	    function handleProgress(event) {

	      document.getElementById("progress_text").innerHTML = parseInt(event.loaded * 100) + "%";
	    }
	}

}
page.init();
})(window)