var bw = (document.documentElement || document.body).clientWidth,
  bh = (document.documentElement || document.body).clientHeight;
document.body.style.width = bw + "px";
document.body.style.height = bh + "px";

var hbArr=['images/hb1.jpg',"images/hb2.jpg",'images/hb3.jpg','images/hb4.jpg','images/hb5.jpg'],
  hbIndex = Math.floor((Math.random()*hbArr.length));
var hb=hbArr[hbIndex];
$("#fmcover").css("background","url("+hb+") no-repeat center bottom;");
$("#comhb").css("background","url("+hb+") no-repeat center bottom;");
var idx = 0;
var playAgain=false;

function run(){
    var timeText = 'timer';
    var s = document.getElementById(timeText);
    if(s.innerHTML == -0.1){
        clearInterval(idx);
        $(".WinInformation").show();
        if (!playAgain) {
          $(".win1").hide();
          $(".win3").hide();
          $(".win4").hide();
          $(".win2").show();
        }else{
          $(".win1").hide();
          $(".win3").hide();
          $(".win2").hide();
          $(".win4").show();
        };

      return false;
    }
    s.innerHTML =(s.innerHTML * 1 - 0.1).toFixed(1);
}

function pageinit() {
  var mySlide=new touchSlider({

    slideCallback: function(index){
      //翻页动画延时
      // $('.item .hasAnimate').css("-webkit-animation","");
      setTimeout(function() {
        $('.play').addClass("animate-enter");
      },100);

      var pageStyle=this._current.dataset.style;
      if(pageStyle=="dStage"){
        setTimeout(function() {
          var $i = $("#dStage i")
          $i.each(function(i, el) {
            el.style['WebkitTransform'] = 'rotateY(' + (-40*i) + 'deg) translateZ(-879px)';
            var s = 5;
            var t = 40 * s / 480;
            el.style['WebkitTransition'] = 'all .1s linear ' + (s / 10 + t * i) + 's';
          });
          $("#dStage").show();
          setTimeout(function() {
            $i.each(function(i, el) {
              if(i != 8) {
                el.style['WebkitOpacity'] = '0';
              }
            });

          }, 5);

          setTimeout(function() {
            $(".musicBtn").show();
            /*音乐*/
            musicPlayStatus=true;
            getById = function(a) {
                return document.getElementById(a)
            };
            initMusic = function() {
                getById("audio").src ="http://www1.pclady.com.cn/wap/pclady/20160722/yxgame/bgMusic.mp3";
            }
            playMusic = function(a) {
                var c = getById("audio");
                a ? c.paused && (c.play(), musicPlayStatus = true) : c.paused || (c.pause(), musicPlayStatus = false);
            }
            $(function() {
                initMusic();
                playMusic(true);
                $("#music-btn").click(function(){
                    if(musicPlayStatus){
                        playMusic(false);
                        $(this).removeClass('mPlay');
                    }else{
                        playMusic(true);
                        $(this).addClass('mPlay');
                    }
                });
            });
            $(".touchnext").css('display','block');
          }, 3000);
        }, 0);
      }

      var itemWrapH=(document.documentElement.clientHeight || document.body.clientHeight) - 96 *2;

      if(pageStyle=="lock"){
        this._lockToSlide =true;

          $(".setLayer").show();

          var h= itemWrapH / 3;

          $(".puzzle .pzitem").height(h);
          var len = $(".puzzle .pzitem").length;

        $(".playBtn").click(function(){
          $(".cover").css('display','none');
          $(".comCover").show();
          setTimeout(function(){
            $(".comCover").hide();
            $(".puzzle").css('display','block');
            $(".itemWrap").height(itemWrapH);
            play();
          }, 1000)


        })
        $(".playagain").click(function(){
          $(".WinInformation").hide();
          puzzle.restart();
          $(".itemWrap").height(itemWrapH);
          playAgain=true;
          play();

        })

        $(".setBtn").click(function(){
          $(".setLayer").show();
        })
        $(".setLayer").click(function(){
          $(this).hide();
        })
        $(".setBtn1").click(function(){
          $(".setLayer2").show();
        })
        $(".setLayer2").click(function(){
          $(this).hide();
        })


        $(".wzptBtn").click(function(){
          // $(".fullhb").show();
          $(".fullhb").toggleClass("fullhbShow");
        })
        $(".fullhb").click(function(){
          // $(this).hide();
          $(this).removeClass("fullhbShow");
        })


      }
      function play(){
        clearInterval(idx);
        $("#timer").html("90.0");
        if (playAgain) {
          var t=[0,1,2,3,4]
          hbIndex = Math.floor((Math.random()*t.length));
        };
      /*完整拼图数组*/
        var comArr=['images/pImg1_1.jpg',"images/pImg2_1.jpg",'images/pImg3_1.jpg','images/pImg4_1.jpg','images/pImg5_1.jpg'];
        var comImg=comArr[hbIndex];
        $("#fullhbImg img").attr("src",comImg)

        /*打散图片数组*/
        var pImgsArr=['images/pImg1.jpg',"images/pImg2.jpg",'images/pImg3.jpg','images/pImg4.jpg','images/pImg5.jpg'];
        var pImg=pImgsArr[hbIndex];

        /* 随机打散数组 */
        var sortArr=[[7,2,5,8,4,9,3,1,6],[6,2,9,7,1,4,8,3,5],[9,3,7,2,5,1,4,8,6]];
        var sortIndex=Math.floor((Math.random()*sortArr.length));
        var sort=sortArr[sortIndex];

        idx = window.setInterval(run, 100);   //开始倒计时
          window.puzzle = new Puzzle({
            item : ".pzitem",
                itemWidth : 212,
                itemHeight : h,
                rows : 3,
                column : 3,
                isRandom : false,
                sortArr : sort,
                bgImg : pImg,
                success : function(){
                  clearInterval(idx);
                  var useTime = (90 - $("#timer").html()*1).toFixed(1);
                  $(".winTime").html(useTime);


                  var myDate = new Date();
                  var overTime="2016/8/11";
                  var end=new Date(overTime.replace("-", "/").replace("-", "/"));

                  if (myDate>=end) {
                    setTimeout(function(){
                      $(".winOver").show();
                    }, 1000)
                  }else{
                    setTimeout(function(){
                      $(".WinInformation").show();
                      if (!playAgain) {
                        $(".win2").hide();
                        $(".win3").hide();
                        $(".win1").show();
                        $(".win4").hide();
                      }else{
                        $(".win2").hide();
                        $(".win1").hide();
                        $(".win3").show();
                        $(".win4").hide();
                      };

                    }, 2000)
                  };


                }
            });


            for(var i = 0; i < len; i++){
              if (i < 3) {
                $(".puzzle .pzitem").eq(i).css("top","0px");
              }
              if (i < 6 && i > 2) {
                $(".puzzle .pzitem").eq(i).css("top",(h+2)+"px");
              }
              if (i > 5) {
                $(".puzzle .pzitem").eq(i).css("top",(2*h+4)+"px");
              }

            }
      }
    },
    touchCallback: function(index,scrollNum){

        }
  });
  window.mySlide=mySlide;
}

$(".audio .musicPlay").click(function(){
  $(".audio .musicStop").addClass("stopAnimate");
})
$(".audio .musicStop").click(function(){
  $(this).removeClass("stopAnimate");
})



 /*加载*/
var load = document.getElementById('loading');
// var imgPath = './res/';
var loadingPage = (function () {
    var imgSources = [
    "images/animate/01.jpg",
    "images/animate/02.jpg",
    "images/animate/03.jpg",
    "images/animate/04.jpg",
    "images/animate/05.jpg",
    "images/animate/fm.jpg",
    "images/musicBtn1.png",
    "images/musicBtn2.png",
    "images/hb1.jpg",
    "images/hb2.jpg",
    "images/hb3.jpg",
    "images/hb4.jpg",
    "images/hb5.jpg",
    "images/pImg1.jpg",
    "images/pImg2.jpg",
    "images/pImg3.jpg",
    "images/pImg4.jpg",
    "images/pImg5.jpg",
    "images/pImg1_1.jpg",
    "images/pImg2_1.jpg",
    "images/pImg3_1.jpg",
    "images/pImg4_1.jpg",
    "images/pImg5_1.jpg"
    ];
    for (var i = 0; i < imgSources.length; i++) {
        // imgSources[i] = (imgPath + imgSources[i]);
        imgSources[i] = imgSources[i];
    };
    var loadImage = function (path, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback(path);
        };
        img.src = path;
    };
    var imgLoader = function (imgs, callback) {
        var len = imgs.length, i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function (path) {
                callback(path, ++i, len);
            })
        }
    };
    var percent = 0;
    imgLoader(imgSources, function (path, curNum, total) {
        percent = curNum / total;

        $("#loading_rate").html((parseInt(percent*100))+"%");
        if (percent == 1) {
            setTimeout(function () {
                $('#loading').css('display', 'none;');
                  pageinit();
            }, 500);
        }
    });
})();


var ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  wxApi.init(function () {
  // 0 自定义分享内容
  var shareData = {
    title:"苏宁×悦选|奥运特辑 拼图赢5599元索尼液晶电视",
    desc: "奥运就要来啦！身未动，心已远，快来玩运动时尚拼图，边起范儿边拿礼，爱拼才会赢！",
    link: window.location.href,
    imgUrl:"http://www1.pclady.com.cn/wap/pclady/20160722/yxgame/share.jpg"
  };
  wx.onMenuShareAppMessage(shareData);// 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline(shareData);// 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareQQ(shareData);// 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareWeibo(shareData);// 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  });
}

