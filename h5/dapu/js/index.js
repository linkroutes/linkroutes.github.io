// todo 掀被子+倒计时
$(function(){
  var CONFIG = {
    // root:'https://www.e-social.cn/h5/dapu/',
    root:'',
    sharePic:'https://mkactivity.lizhifm.com/chinarapper/assets/img/cover.jpg'
  };
  var shareData = {
    title: "没想到TA被子里竟然...",
    desc: "吓skr人！我竟然在TA的被子里翻到了这个！",
    link: location.href,
    imgUrl: CONFIG.sharePic
  };

  function activeVoice(id) {
    var audio = id;
    audio.play();
    audio.pause();
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
      audio.pause();
    }, false);
  }
  activeVoice(Jkeyboard);

  var UA = window.navigator.userAgent.toLowerCase(),
    isIos = UA.indexOf('iphone')>-1,
    isAndroid = UA.indexOf('android')>-1,
    isWexin = UA.indexOf('micromessenger')>-1;

  var DEV = location.href.indexOf('_dev_')>-1;
  var DATA = [
    {
      id:5,
      name:"fangxiangpan",
      imgBig:'big-fangxiangpan.png',
      img:'fangxiangpan.png',
      desc:'{{name}}必然是老司机本机了<br/>在被子里都能开车'
    },
    {
      id:8,
      name:"kouhong",
      imgBig:'big-kouhong.png',
      img:'kouhong.png',
      desc:'别看{{name}}平时话不多<br/>背地里却在被子里藏口红'
    },
    {
      id:7,
      name:"jingzi",
      imgBig:'big-jingzi.png',
      img:'jingzi.png',
      desc:'睡前不看看自己俊美的脸庞<br/>{{name}}表示难以入睡'
    },
    {
      id:6,
      name:"huluobo",
      imgBig:'big-huluobo.png',
      img:'huluobo.png',
      desc:'胡萝卜消食,菊花清热,一起煮更滋补<br/>{{name}}一定是一个养生朋克'
    },
    {
      id:2,
      name:"zhendongbang",
      imgBig:'big-zhendongbang.png',
      img:'zhendongbang.png',
      desc:'难道{{name}}天天在被窝里，<br/>和电动玩具形成共振？'
    },
    {
      id:1,
      name:"mao",
      imgBig:'big-mao.png',
      img:'mao.png',
      desc:'想来{{name}}<br/>必定是个踩奶好手'
    },
    {
      id:3,
      name:"daijinquan",
      imgBig:'big-daijinquan.png',
      img:'daijinquan.png',
      desc:'先不要冲动 说不定{{name}}<br/>兼职在地上人间当保安？'
    },
    {
      id:4,
      name:"yaokongqi",
      imgBig:'big-yaokongqi.png',
      img:'yaokongqi.png',
      desc:'为了不让你换台<br/>{{name}}把遥控器藏在第13层被子里！'
    },
  ];
  // 去除默认行为
  $('#Jcon').on("touchmove",function(e){
    e.preventDefault();
  });
  // 预加载模块
  var tool = {
    preloadSrc:function(cb){
      var preload = new createjs.LoadQueue(false);
      var manifest = [
        CONFIG.root+"images/p0.png",
        CONFIG.root+"images/loading.gif",
        CONFIG.root+"images/bg.jpg",
        CONFIG.root+"images/layer5.png",
        CONFIG.root+"images/p1-btn.png",
        CONFIG.root+"images/room-tips.png",
        CONFIG.root+"images/layer1.png",
        CONFIG.root+"images/layer6.png",
        CONFIG.root+"images/p1-ipt-1.png",
        CONFIG.root+"images/room-hand-2.png",
        CONFIG.root+"images/layer2.png",
        CONFIG.root+"images/layer7.png",
        CONFIG.root+"images/fix/room.jpg",
        CONFIG.root+"images/fix/p4-bg.jpg",
        CONFIG.root+"images/room-hand.png",
        CONFIG.root+"images/layer3.png",
        CONFIG.root+"images/p4-tips-2.png",
        CONFIG.root+"images/room-say-2.png",
        CONFIG.root+"images/layer4.png",
        CONFIG.root+"images/p4-tips.png",
        CONFIG.root+"images/room-say.png",
        CONFIG.root+"images/p5/p5-bg.jpg",
        CONFIG.root+"images/p5/p5-btn.png",
        CONFIG.root+"images/tits/amazing.png",
        CONFIG.root+"images/tits/excellent.png",
        CONFIG.root+"images/tits/great.png",
        CONFIG.root+"images/tits/unbelievable.png",
        CONFIG.root+"images/p5/arr.png",
        CONFIG.root+"images/form-bg.png",
        CONFIG.root+"images/p5/p5-bg.png",
        CONFIG.root+"images/p5/p5-img-tit.png"
      ];
      preload.addEventListener("progress", handleProgress);
      preload.addEventListener("complete", handleComplete);
      preload.loadManifest(manifest);
      function handleProgress(event) {
        $('#JloaddingTxt').html(parseInt(event.loaded * 100) + "%");
      }
      function handleComplete(event) {
        setTimeout(function () {
          cb && cb();
        },1000)
      }
    }
  };

  var mod = {
    init:function(){
      var _this = this;
      tool.preloadSrc(function(){
        var _html = $('#Jtpl').html();
        $('#Jcon').html(_html);
        $('#Jloading').hide();
        setTimeout(function(){

          _this.btnClick();
        },1000)
      })

    },
    setRandomData:function(name2){
      var _index = Math.floor(Math.random()*8),
        // _data = DATA[_index],
        _data = DATA[6],
        _this = this;
      // p4 data
      $('#Jitem').addClass(_data.name);
      $('#JitemPic').attr('src',CONFIG.root+'images/'+_data.img);
      // p5 data
      $('#JbigItem').attr('src',CONFIG.root+'images/p5/'+_data.imgBig);
      var data = _data.desc.replace(/{{name}}/g,name2);
      $('#JbigName').text(name2);
      $('#Jp5Desc').html(data);

      shareData.title = "没想到"+_data.name+"被子里竟然...";
      shareData.desc = "吓skr人！我竟然在"+_data.name+"的被子里翻到了这个！";
    },
    checkInput:function(){
      this.name1 = $('#Jipt1').val().trim();
      this.name2 = $('#Jipt2').val().trim();
      var p = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      var _bool = p.test(this.name1) &&  p.test(this.name2)
      if (_bool) {
        if (this.name2.length<=10) {
          return true;
        }else{
          this.showPop('昵称不要超过十个字符');
          return false;
        }
      }else{
        this.showPop('请填正确写完昵称');
        return false;
      }
    },
    btnClick:function(){
      var _this = this;
      if (DEV) {
        _this.setScroll();
      }
      $('#Jp1Btn').on('click',function(){
        if (DEV) {
          $('#Jp1').hide()
          $('#Jp2').hide()
          _this.removeCover();
          _this.setRoomClick();
          _this.setRandomData('测试数据这里有十个字');
          $('#Jkeyboard').attr('src',CONFIG.root+'audio/great_C96kbps.mp3');
          _this.draw(null);
          return;
        }
        var _b = _this.checkInput()
        if (_b) {
          _this.goToPage2();
          _this.setRandomData(_this.name2);

        }
      })
    },
    goToPage2:function(){
      var _this =this;
      $('#Jp1').fadeOut(function(){
        Jkeyboard.play();
      });
      setTimeout(function(){
        _this.setTyping(function(){
          // 清除键盘声
          Jkeyboard.pause();
          $('#Jkeyboard').removeAttr('loop');
          $('#Jkeyboard').attr('src',CONFIG.root+'audio/great_C96kbps.mp3');

          // 显示最后一句话
          $('#Jp2').addClass('on').on('click',function(){
            Jwalk.play();
            Jwalk.onended = function(){
              Jwalk.play();
            };
            _this.goToPage3();
          })
        });
      },500)

      _this.setScroll();  // 提前设置ISCROLL;
    },
    setTyping:function(cb){
      var _a = this.name1,
        _b = this.name2;
      var _txt = '我是'+_a+'。\n明天我就要和'+_b+'结婚了，\n这人到底值不值得我共度一生呢？\n听说卧室才能反映一个人的本体，\n趁着'+_b+'在洗澡，\n不如去TA的卧室看看\n……\n就算被发现了，\n也能说，\n是卧室先动的手！';
      Printer.init(_txt, {
        speed:150,
        selector: 'Jp2Txt',
        "curSpeed" : 300,       //光标的速度（ms）
        "curStr" : '|',     //光标字符
        "curStyle" : 'font-weight: normal;',  //光标的样式（CSS样式）
        hasCur:true
      }).print(cb);
    },
    goToPage3:function(){
      var _this = this;
      $('#Jp2').fadeOut();
      _this.removeCover();
      _this.setRoomClick();
      if (!DEV) {
        _this.draw(null);
      }
    },
    setScroll:function(){
      var  wrapper = document.getElementById('Jp3Scroll');
      this.myScroll = new IScroll(wrapper, {
        mouseWheel: true,
        scrollX: true,
        scrollY: false,
        click: true,
        momentum: false, //滑动惯性
        scrollbars: false,
        bounce:false,
        startX:-1390
      });

      return;
    },
    removeCover:function(){
      var judge = $('#Jcover').attr('title')
      if (judge != 'hide') {
        this.myScroll.on('scrollStart',function(){
          $('#Jcover').hide().attr('title','hide');
        })
      }
    },
    setRoomClick:function(){
      var _this = this;
      $('#JroomClick').on('click',function(){
        _this.goToPage4();
      })
    },
    goToPage4:function(){
      $('#Jp3').fadeOut();
      this.count();
    },
    showPop:function(str,cb){
      var _this = this;
      $('#Jpop').html(str);
      $('#Jpop').fadeIn(function(){
        var t = setTimeout(function(){
          $('#Jpop').hide();
          cb && cb();
          clearTimeout(t);
          t = null;
        },1000)
      })
    },
    count:function(){
      var startY = 0,
        _count = 0,
        flag = false,
        _this = this;

      var $layers = $('#Jtarget .layer'),
      _len = $layers.length;
      this._len = _len;
      this.started = false;

      $layers.each(function(index){
        $(this).css('zIndex',_len-index).attr('id','Jlayer'+(index+1));

      })

      $('#Jtarget').on('touchstart', function(event) {
        startY = event.originalEvent.changedTouches[0].clientY;
        if (_count>0) {

          // 第二次滑动 开始计时
          if (!_this.started) {
            _this.started = true;
            setTimeout(function(){
              $('#Jp4Tips2').fadeOut();
            },500);
            _this.setTimeRecord(function(){
              if (_this._count < 15) {
                _this.banned = true;
                _this.rePlay();
              }
            });
          }

        }
      });
      $('#Jtarget').on('touchend', function(event) {
        // 缓冲
        if ($('#Jlayer'+ _this._count).is(":animated")) {
          return;
        }
        if (_this.banned) {
          _this.rePlay();
          return;
        }
        if (_count<_len) {
          var offsetY = event.originalEvent.changedTouches[0].clientY - startY;
          if (offsetY>100) {
            _count = _count+1;
            _this._count = _count;

            // 第二张被子开始游戏
            _this.playAni(_count);

            if (_count==1) {
              $('#Jp4Hand').hide();
              $('.p4-tips').hide();
              $('#Jp4Tips2').show().addClass('on');
            }

              // 效果音
              if (_count==2) {
                $('#Jgreat').show().addClass('on');
                Jkeyboard.play();
                setTimeout(function(){
                  $('#Jgreat').fadeOut(function(){
                    $('#Jkeyboard').attr('src',CONFIG.root+'audio/excellent_C96kbps.mp3');
                  });
                },1000)
              };
              if(_count==6){
                $('#Jexcellent').show().addClass('on');
                Jkeyboard.play();
                setTimeout(function(){
                  $('#Jexcellent').fadeOut(function(){
                    $('#Jkeyboard').attr('src',CONFIG.root+'audio/amazing_C96kbps.mp3');
                  });
                },1000)
              }
              if(_count==10){
                $('#Jamazing').show().addClass('on');
                Jkeyboard.play();
                setTimeout(function(){
                  $('#Jamazing').fadeOut(function(){
                    $('#Jkeyboard').attr('src',CONFIG.root+'audio/unbelievable_C96kbps.mp3');
                  });
                },1000)
              }
              if(_count==14){
                $('#Junbelievable').show().addClass('on');
                Jkeyboard.play();
                setTimeout(function(){
                  $('#Junbelievable').fadeOut(function(){});
                },1000)
              }

          }else{
            _this.showPop('向下掀被子幅度不够')
          }
        }
      })
    },
    rePlay:function(){
      $('#JrePlay').show();
      var _this = this;
      this.banned = false;
      $('#Jkeyboard').attr('src',CONFIG.root+'audio/great_C96kbps.mp3');
      $('.layer.mark').show().removeClass('go');
      $('#JreplayBtn').one('click',function(){
        $('#JrePlay').hide();
        _this.count()
        $('#Jtime').html('10:00');
      })

    },
    playAni:function(_count){
      var _this = this;
      $('#Jlayer'+ _count).addClass('go');
      setTimeout(function(){
        $('#Jlayer'+ _count).hide();
        if (_count == _this._len) {
          if(!_this._timeout){
            clearInterval(_this.timer);
            _this.finishGame();
          }
        }
      },600)
      return;
      $('#Jlayer'+ _count).removeClass('mark').animate({
        top:"+=980",
        opacity:0,
      },500,function(){
        if (_count == _this._len) {
          if(!_this._timeout){
            clearInterval(_this.timer);
            _this.finishGame();
          }
        }
      })
    },
    finishGame:function(){
      $('#Jtarget').hide().off();
      $('#Jp4Hand2').show();
      this.setItemClick();
      setTimeout(function(){
        $('#Jtime').fadeOut();
      },1000)
    },
    setTimeRecord:function(cb){
      var oclock=document.getElementById("Jtime");
      var start1 = '00:00:10:00';
      var finish = "00:00:00:00";
      this.timer = null;
      this._timeout = false;
      var start2 = '',_this = this;
      run();
      function run() {//定义时间函数，让秒表每100ms变化一次
        _this.timer = setInterval(onTimer, 100);//100ms的定时器
      }
      function onTimer(){
        if (start1 == finish){
          _this._timeout = true;
          cb&&cb()
          clearInterval(_this.timer);
          start1="00:00:00:10";//(清除时间函数后还是会执行一次 所以多给一个10ms再动态赋值)
        }
        var hms = new String(start1).split(":"),
          ms = new Number(hms[3]),
          s = new Number(hms[2]),
          m = new Number(hms[1]),
          h = new Number(hms[0]);

        ms -= 10;

        if (ms < 0){
          ms = 90;
          s -= 1;
          if (s < 0){
            s = 59;
            m -= 1;
          }
          if (m < 0){
            m = 59;
            h -= 1;
          }
        }
        var ms = ms < 10 ? ("0" + ms) : ms,
          ss = s < 10 ? ("0" + s) : s,
          sm = m < 10 ? ("0" + m) : m,
          sh = h < 10 ? ("0" + h) : h;
        start1 = sh + ":" + sm + ":" + ss + ":" + ms;
        start2 =  ss + ":" + ms;
        oclock.innerHTML = start2;
      }
    },
    setItemClick:function(){
      var _this = this;
      $('#Jitem').on('click',function(){
        $('#Jp4').fadeOut();
      })
    },
    draw:function(selector){
      var selector = selector||'#Jcan';
      drawCanvas(selector);
      function DPR() {
        if (window.devicePixelRatio && window.devicePixelRatio > 1) {
          return window.devicePixelRatio;
        }
        return 1;
      }
      /**
       *  将传入值转为整数
       */
      function parseValue(value) {
        return parseInt(value, 10);
      }
      function drawCanvas(selector) {
        // 获取想要转换的 DOM 节点
        const dom = document.querySelector(selector);
        const box = window.getComputedStyle(dom);
        // DOM 节点计算后宽高
        const width = parseValue(box.width);
        const height = parseValue(box.height);
        // 获取像素比
        const scaleBy = DPR();
        // 创建自定义 canvas 元素
        const canvas = document.createElement('canvas');

        // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
        canvas.width = width * scaleBy;
        canvas.height = height * scaleBy;
        // 设定 canvas css宽高为 DOM 节点宽高
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        // 获取画笔
        const context = canvas.getContext('2d');

        // 将所有绘制内容放大像素比倍
        context.scale(scaleBy, scaleBy);

        // 将自定义 canvas 作为配置项传入，开始绘制
        return html2canvas(dom, {
          canvas: canvas,
          removeContainer: false,
          backgroundColor: null
        }).then(function(fgCanvas){
          var dom = document.querySelector('body');
          var box = window.getComputedStyle(dom);

          var bgImg = new Image();
          var reImg = new Image();

          var width = parseValue(box.width);
          var height = parseValue(box.height);
          // 获取像素比
          var scaleBy = DPR();
          // 创建自定义 canvas 元素
          var bgCanvas = document.createElement('canvas');

          // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
          var bgCanvasWidth = bgCanvas.width = width * scaleBy;
          var bgCanvasHeight = bgCanvas.height = height * scaleBy;
          // 设定 canvas css宽高为 DOM 节点宽高
          bgCanvas.style.width = width + 'px';
          bgCanvas.style.height = height + 'px';

          var hGap = (bgCanvas.width - fgCanvas.width) / 2;
          var vGap = (bgCanvas.height - fgCanvas.height) / 2;

          // TODO: 硬编码
          bgImg.src = 'images/p5/p5-bg.jpg';
          bgImg.onload = function() {
            var bgImgWidth = bgImg.width;
            var bgImgHeight = bgImg.height;
            var bgCanvasRatio = bgCanvasWidth / bgCanvasHeight;
            var bgImgRatio = bgImgWidth / bgImgHeight;

            var sX, sY, sW, sH;

            if (bgCanvasRatio > bgImgRatio) {
              // width: 100%
              sX = 0;
              sY = Math.abs((bgImgHeight - (bgImgWidth / bgCanvasRatio)) / 2);
            } else {
              // height: 100%
              sX = Math.abs((bgImgWidth - (bgImgHeight * bgCanvasRatio)) / 2);
              sY = 0;
            }

            var ctx = bgCanvas.getContext('2d');
            ctx.drawImage(bgImg, sX, sY, bgImgWidth - sX * 2, bgImgHeight - sY * 2, 0, 0, bgCanvasWidth, bgCanvasHeight);
            ctx.drawImage(fgCanvas, hGap, vGap, fgCanvas.width, fgCanvas.height);

            reImg.src = bgCanvas.toDataURL('image/png');
            reImg.style.opacity = 0;
            reImg.style.top = 0;
            reImg.style.left = 0;
            reImg.style.width = '100%';
            reImg.style.height = '100%';
            reImg.style.position = 'absolute';
            $('#Jp5Btn').append(reImg);
          }
        });
      }
    }
  }

  if (!isIos && !isAndroid) {
    mod.showPop('请在手机中打开H5')
    return;
  }else{
    mod.init();
    if (isWexin) {
      // wxApi.init(function() {
      //   wx.onMenuShareAppMessage(shareData);
      //   wx.onMenuShareTimeline(shareData);
      // })
    }
  }
});
