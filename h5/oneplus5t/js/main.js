
	var flag=true,
		questionNum=0,
		t='',
		timerPre='',
		bb='',
		circle='',
		scroe=0;
	var bgMusic=$('#J-bg-music');
	var commint={
		personAni : function(){
			var _this=this;
			var personImg=$('.person img'),
				i=1;
			//人物动画
			timerPre&&clearInterval(timerPre);
			var timerPre=setInterval(function(){
				personImg.attr('src','img/person'+i+'.png');
				i=i===8?1:++i;
			},200);

		},
		bgAni : function(){
			var bg=$('.area1'),
				j=0,
				_this=this;
			//背景动画
			var timerBg=setInterval(function(){
				bg.css('background-position', '-'+j+'rem 0');
				j+=0.2;
				if(j>=37){
					clearInterval(timerBg);
					clearInterval(timerPre);
					bgMusic[0].pause();
					bgMusic.attr('src','music/bg.mp3');
					bgMusic[0].play();
					$('.bars').addClass('barscur');
					$('.area1').addClass('fadeOut');
					$('.area2').show();
					$('.area2').addClass('fadeIn');
					_this.countDown();
				}else if(j>=36){
					$('.txt3').addClass('fadeOut');
				}else if(j>=32){
					$('.txt3').show();
					$('.txt3').addClass('fadeIn');
				}else if(j>=29){
					$('.txt2').addClass('fadeOut');
				}else if(j>=20){
					$('.txt2').show();
					$('.txt2').addClass('fadeIn');
				}else if(j>=16){
					$('.txt1').addClass('fadeOut');
				}else if(j>=7){
					$('.txt1').show();
					$('.txt1').addClass('fadeIn');
				}
			},80);
		},
		countDown : function(){
			var _this=this;
			var num=$('#timer img'),i=3;
			var timeNum=setInterval(function(){
				if(i<=0){
					clearInterval(timeNum);
					$('.planAnswer').hide();
					$('.answerquestion').show();
					$('.bars').removeClass('barscur');
					commint.startProgress();
				}
				num.attr('src','img/num'+i+'.png');
				i--;
			},1000);
			$('#answerBtn').unbind('click');
			$('#answerBtn').bind('click',function () {
				clearInterval(timeNum);
				$('.bars').removeClass('barscur');
				$('.planAnswer').hide();
				$('.answerquestion').show();
				commint.startProgress();
			})
			console.log(questionNum)
		},
		answer : function(){
			var _this=this;
			var answerSelect=$('#starAnswer .current .answerlist'),
				rusult=$('#rusult'),
				scoreNum=$('#scoreNum'),
				scoreline=$('#scoreline');
			answerSelect.unbind('click');
			answerSelect.bind('click',function(event) {
				var answersel=$(this).attr('data-an');
				if(answersel){
					bgMusic[0].pause();
					bgMusic.attr('src','music/fail.mp3');
					bgMusic[0].play();
					$(this).addClass('correct');
					rusult.addClass('succ');
					scroe+=100;
					scoreNum.html(scroe);
					scoreline.css({
						left: -1.68*(300-scroe)/100+'rem'
					});
				}else{
					bgMusic[0].pause();
					bgMusic.attr('src','music/succ.mp3');
					bgMusic[0].play();
					$(this).addClass('fail');
					rusult.addClass('rusultfail');
				}
				circle='';
				_this.stopProgress();
				t=$(this);
				onetimer&&clearTimeout(onetimer);
				var onetimer=setTimeout(function(){
					t.removeClass('fail correct');
					if(questionNum>=2){
						_this.getRusult();
						_this.question(questionNum,0);
					}else {
						console.log(questionNum)
						_this.question(questionNum,++questionNum);
						_this.startProgress();
					}
				},500);
			});
		},
		getRusult : function () {
			var prize=$('#prize');
			var _this=this;
			bgMusic[0].pause();
			bgMusic.attr('src','music/last.mp3');
			bgMusic[0].play();
			if(scroe==300){
				prize.addClass('prize1');
			}else if(scroe==200){
				prize.addClass('prize2');
			}else{
				prize.addClass('prize3');
			}
			$('.answerquestion').hide();
			$('.mengban').show();
			$('.answerresult').show();
			$('#again').unbind('click');
			$('#again').bind('click',function () {
				bgMusic[0].pause();
				bgMusic.attr('src','music/bg.mp3');
				bgMusic[0].play();
				clearInterval(bb);
				$('.answerresult').hide();
				$('.area2').hide();
				$('#prize').removeClass('prize1 prize2 prize3');
				$('.area1').removeClass('fadeOut fadeIn');
				$('.txt1').removeClass('fadeOut fadeIn');
				$('.txt2').removeClass('fadeOut fadeIn');
				$('.txt3').removeClass('fadeOut fadeIn');
				$('.area1').removeClass('fadeOut fadeIn');
				$('.planAnswer').show();
				$('.txt1').hide();
				$('.txt2').hide();
				$('.txt3').hide();
				$('.mengban').hide();
				$('#starAnswer .answeritem').eq(0).addClass('current');
				$('#scoreline').css({
					left: '-5.04rem'
				});
				$('#J-music-ctrl').hide();
				flag=true;
				questionNum=0;
				scroe=0;
				$('#scoreNum').html(scroe);
				$('.area1').css('background-position', '0 0');
				$('#starplay').show();
				_this.init();
			})
			$('#shareBtn').unbind('click');
			$('#shareBtn').bind('click',function () {
				$('.sharpic').show();
				$('.mengban').css('z-index', '999');
			})
		},
		startProgress:function (){
			var _this=this;
			var cir = $('#countdowncur');
			var number=$('#countdownnum');
			bgMusic[0].pause();
			bgMusic.attr('src','music/answer.mp3');
			bgMusic[0].play();
			_this.answer();
			var w = cir.width();
			circle='';
			console.log(questionNum);
			circle = cir.circleProgress({
				value: 0,
				size: w,
				startAngle : -Math.PI/2,
				thickness : 4,
				reverse : true,
				animation : {
					duration: 10000,
					easing: "linear"
				},
				emptyFill : '#ffffff',
				animationStartValue : 1.0,
				lineCap : "round",
				fill: {
					color: '#67ee3e'
				}
			})
			.on('circle-animation-progress', function(event, progress,step) {
				var restTime = step * 10;
				number.html(Math.ceil(restTime));
			})
			.on('circle-animation-end',function(event){

			});
			var oo=10;
			bb&clearInterval(bb);
			bb=setInterval(function(){
				if(oo<=0){
					clearInterval(bb);
					flag=questionNum<=1?true:false;
					if(flag){
						_this.question(questionNum,++questionNum);
						_this.startProgress();
					}else{
						_this.getRusult();
					}
				}
				oo--;
			},1000)
		},
		stopProgress:function(){
			$('#countdownnum').circleProgress({
				value: 0,
				animation : false
			})
		},
		question : function(oldNum,newNum){
			var questionHide=$('#starAnswer .answeritem'),
				rusult=$('#rusult');
				rusult.removeClass('succ rusultfail');
				questionHide.eq(oldNum).removeClass('current');
				questionHide.eq(newNum).addClass('current');
		},
		init : function(){
			var _this=this;
			$('#starplay').unbind('click');
			$('#starplay').bind('click',function(){
				bgMusic[0].pause();
				bgMusic.attr('src','music/bg.mp3');
				bgMusic[0].play();
				$('#starplay').hide();
				$('#J-music-ctrl').show();
				_this.bgAni();
			})
			// this.personAni();
			//
		}
	}
	// commint.startProgress();


/*$('#J-circle').circleProgress({
	value: 0,
	animation : false
})*/
