var ready = function ready(i) {
  window.LizhiJSBridge ? i() : document.addEventListener("LizhiJSBridgeReady", function () {
    i();
  }, !1);
};
window.getLzUserName = function (i) {
  ready(function () {
    LizhiJSBridge.call("getSessionUser", {}, function (e) {
      i(e.name);
    });
  });
};

function setBd() {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3acda57cfcddeaf7637d962e3c0497ea";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

// 计算比例
var DEV = false;
var RADIO = parseFloat((750 / 1206).toFixed(4)); //0.6218905472636815
var docEle = document.documentElement;
var _radio = parseFloat((docEle.clientWidth / docEle.clientHeight).toFixed(4));

if (_radio < RADIO) {
  // 说明手机更长
  if (_radio > 0.6160 && _radio < 0.6165) {
    // plus机型
    $('#Jroot').addClass('level1');
  }
  if (_radio < 0.52) {
    //iphoneX
    $('#Jroot').addClass('level2');
  }
}

// 只出三句鸡汤
if (_radio > RADIO) {
  var SHORT = true; // 荔枝App是0.6432
}

$(function () {
  FastClick.attach(document.body);
  var CONFIG = {
    count: "https://www.fangchengyan.com/front/updateNum",
    dev:window.location.href.indexOf('?dev')>-1,
    pic:window.location.href.indexOf('pic')>-1,
    item: 'lizhi_openid',
    root: './',
    lib: LIB_MP3,
    link: 'https://qd.lizhi.fm/get_app?promo_type=shiguangyouju',
    userName: "荔枝用户",
    sharePic: "https://mkactivity.lizhifm.com/mrstrange/src/images/share.jpg",
    targetUrl: 'https://mkactivity.lizhifm.com/mrstrange/',
    authUrl: 'https://mkactivity.lizhifm.com/mrstrange/auth.html',
    img2base64: 'https://theutopia.cn/img2base64/index.php?url=',
    url2qrcode: 'https://theutopia.cn/qrcode/index.php?u=',
    UA: window.navigator.userAgent.toLowerCase(),
    isWeixin: function isWeixin() {
      return this.UA.indexOf('micromessenger') > -1;
    },
    isLizhi: function isLizhi() {
      var s = /Lizhi/i,
          isLizhi = !!s.test(navigator.userAgent);
      return isLizhi;
    }
  };

  if (DEV) {
    CONFIG.targetUrl = "http://wx.fangchengyan.com/lizhi/index.html";
    CONFIG.authUrl = "http://wx.fangchengyan.com/lizhi/auth.html";
  }


  // 激活Bgm
  function activeVoice(id) {
    var audio = id;
    try {
      audio.play().catch(console.log);
      audio.pause();
    } catch (e) {
      console.log(e);
    }
    if (CONFIG.isWeixin()) {
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
        audio.pause();
      }, false);
    }
  }

  // 辅助函数
  var tool = {
    preloadSrc: function preloadSrc(cb, delay) {
      var preload = new createjs.LoadQueue(false);
      var manifest = [
        CONFIG.root + "src/images/p0/p0-sprite.png",
        CONFIG.root + "src/images/p0/loading.jpg",
        CONFIG.root + "src/images/p0/light.png",
        CONFIG.root + "src/images/p0/dots.png",
        CONFIG.root + "src/images/p1/p1-sprite.png",
        CONFIG.root + "src/images/p2/bg.jpg",
        CONFIG.root + "src/images/p2/p2-con.png",
        CONFIG.root + "src/images/p2/p2-sprite.png",
        CONFIG.root + "src/images/p2/gramophone2.png",
        CONFIG.root + "src/images/p2/dots.png",
        CONFIG.root + "src/images/p3/p3-sprite.png",
        CONFIG.root + "src/images/p3/recorder.png",
        CONFIG.root + "src/images/p3/cd.png",
        CONFIG.root + "src/images/p3/grass.png",
        CONFIG.root + "src/images/p3/dots.png",
        CONFIG.root + "src/images/p3/alert-con.png",
        CONFIG.root + "src/images/p3/analyze-con.png",
        CONFIG.root + "src/images/p4/p4-sprite.png",
        CONFIG.root + "src/images/p4/tag-bg.png",
        CONFIG.root + "src/images/p4/bg/bg4.png",
        CONFIG.root + "src/images/p4/guy/love/6.png"
      ];
      preload.addEventListener("progress", handleProgress);
      preload.addEventListener("complete", handleComplete);
      preload.loadManifest(manifest);
      function handleProgress(event) {
        $('#JloadingTxt').html(parseInt(event.loaded * 100) + "%");
      }
      function handleComplete(event) {
        setTimeout(function () {
          cb && cb();
        }, delay || 1000);
      }
    },
    parseURL: function parseURL(url) {
      var a = document.createElement('a');
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: function () {
          var ret = {},
              seg = a.search.replace(/^\?/, '').split('&'),
              len = seg.length,
              i = 0,
              s;
          for (; i < len; i++) {
            if (!seg[i]) {
              continue;
            }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
          }
          return ret;
        }(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
      };
    }
  };


  function checkAuth(_success, fail) {
    var __urlObj = tool.parseURL(window.location.href);
    var __openid = __urlObj.params.openid || localStorage.getItem(CONFIG.item);
    if (!__openid) {
      window.location.href = CONFIG.authUrl;
    } else {
      // 缓存openid
      localStorage.setItem(CONFIG.item, __openid);

      $.ajax({
        url: '//oauthbiz.lizhi.fm/weixin/loadUser?tag=brand&openid=' + __openid,
        type: 'get',
        data: {},
        success: function success(data) {
          if (data.status) {
            //1 失败, 0成功
            fail && fail();
          } else {
            _success && _success(data.data.nickname);
          }
        }
      });
    }
  }

  // 逻辑
  var mod = {
    bgm: function bgm() {
      $('#Jaudio').attr('loop', true);
      if (CONFIG.isWeixin()) {
        document.addEventListener("WeixinJSBridgeReady", function () {
          Jaudio.play();
        }, false);
        Jaudio.play();
      } else {
        try {
          Jaudio.play().catch(console.log);
        } catch (e) {
          console.log(e);
        }
        $('#Jbody').one('touchstart', function () {
          Jaudio.play().catch(console.log);
        });
      }
    },
    setQrcode: function setQrcode() {
      if (CONFIG.dev) {
        $.ajax({
          url: CONFIG.img2base64+CONFIG.url2qrcode+window.location.href,
          type: 'get',
          data: {},
          success: function success(data) {
            if (data.code == 200) {
              $('#Jqrcode').attr('src', data.data);
            }else{
              console.log(data)
            }
          }
        });
        return;
      }

      if (!DEV) {
        $('#Jqrcode').attr('src', 'src/images/qrcode.png');
      } else {
        $.ajax({
          url: CONFIG.img2base64+CONFIG.url2qrcode+CONFIG.targetUrl,
          type: 'get',
          data:{},
          success: function success(data) {
            if (data.code == 200) {
              $('#Jqrcode').attr('src', data.data);
            }else{
              console.log(data)
            }
          }
        });
      }
    },
    init: function init(userName) {
      // this.showPop(_radio)
      CONFIG.userName = userName;
      var _this = this;
      this.bgm();
      _this.randomPlay();
      this.loading(function () {
        _this.timer(function () {
          _this.go2P1();
          _this.calc();
          _this.lastBind();
        }, 1000);
      });
    },
    calc: function calc() {
      var conH = docEle.clientHeight - 270; //头尾高度截去
      $('#JpageFlex').height(conH);
    },
    _feelingObj: {},
    _gender: null,
    timer: function timer(fn, time) {
      var t = setTimeout(function () {
        fn && fn();
        clearTimeout(t);
        t = null;
      }, time);
    },
    loadingAni: function loadingAni(cb) {
      this._isLoading = true;
      var delay = 1500;
      var _this = this;
      _this.timer(function () {
        $('#Jtxt1').addClass('fadeInUp');
        _this.timer(function () {
          $('#Jtxt1').removeClass('fadeInUp');
          $('#Jtxt2').addClass('fadeInUp');
          _this.timer(function () {
            $('#Jtxt2').removeClass('fadeInUp');
            $('#Jtxt3').addClass('fadeInUp');
            cb && cb();
            // _this.timer(function(){
            //   $('#Jtxt3').removeClass('fadeInUp');
            // },delay)
          }, delay);
        }, delay);
      }, 500);
    },
    loading: function loading(cb) {
      var _this = this;
      var t;
      var img = new Image();
      img.src = CONFIG.root + 'src/images/p0/loading.jpg';
      img.onload = function () {
        _this.loadingAni(function () {
          $('#JloadingTxt').show();
          tool.preloadSrc(function () {
            var html = $('#Jtpl').html();
            $('#Jdoc').append(html);
            cb && cb();
          });
        });
        // t = setInterval(function(){
        //   _this.loadingAni();
        // },4500)
      };
    },
    go2P1: function go2P1() {
      $('#Jp1').show();
      $('#Jp0').fadeOut();
      this.autoClick();
    },
    autoClick: function autoClick() {
      // 写入名字
      $('#JuserName').val(CONFIG.userName);
      $('#JuserName2').text(CONFIG.userName);

      $('#JuserName').on('blur', function () {
        CONFIG.userName = $(this).val();
        $('#JuserName2').text(CONFIG.userName);
      });
      this.gender();
      this.setQrcode();
    },
    gender: function gender() {
      var $gender = $('.gender');
      var _this = this;
      $gender.on('click', function () {
        var $this = $(this);
        $this.addClass('on').siblings().removeClass('on');
        _this._gender = $this.data('gender');
        $gender.off('click');
        Jmp3.load();
        _this.timer(function () {
          // 抖动
          $this.addClass('upDown');
          _this.timer(function () {
            _this.go2P2();
          }, 1300);
        }, 300);
      });
    },
    gender2: function gender2() {
      var $gender = $('.gender');
      var _this = this;
      $gender.on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        _this._gender = $(this).data('gender');
      });
    },

    checkUserName: function checkUserName() {
      var reg = /^[\u4e00-\u9fa5a-zA-Z\d]+$/;
      var v = $('#JuserName').val().trim();
      this._userName = v;
      return reg.test(v);
    },
    go2P2: function go2P2() {
      // 删除BGM
      Jaudio.pause();
      var $audio = $('#Jaudio');
      $audio.removeAttr('src');
      $audio.removeAttr('loop');
      $audio.remove();

      // 播放mp3
      $('#Jp2').show();
      $('#Jp1').fadeOut();
      this.playMp3();
      this.chooseFeeling();
      this.btnClick();
      this.setTxt();
    },
    _random: function _random(len) {
      return Math.floor(Math.random() * len);
    },

    randomPlay: function randomPlay() {
      // mp3库
      var lib = CONFIG.lib;
      // 随机索引, 用于选取MP3和匹配海报数据
      var index = this._random(lib.length);

      var curType = lib[index];
      // 再从这种类型中随机选取一个mp3
      var _data = curType.data;
      var type = curType.type_desc;
      var _index = this._random(_data.length);

      // 由index生产的这三个值
      var mp3 = _data[_index].mp3;
      var name = _data[_index].name;
      var id = _data[_index].id;

      this.genMp3(mp3, name, type, id);
      this.index = index;
      // 生成海报和鸡汤
      // this.genData(index);
      // this.recordId(id);
    },
    recordId: function recordId(id) {
      if (DEV) {
        return;
      } else {
        $.ajax({
          url: CONFIG.count + '?id=' + id,
          type: 'POST',
          data: {
            // id:id
          },
          success: function success(data) {
            // data
          }
        });
      }
    },
    genMp3: function genMp3(mp3, name, type, id) {
      var $mp3 = $('#Jmp3');
      $mp3.attr('preload', true);
      $mp3.attr('src', mp3);
      $mp3.get('0').load();
      $mp3.attr('data-name', name);
      $mp3.attr('data-type', type);
      $mp3.attr('data-id', id);
    },
    playMp3: function playMp3() {
      Jmp3.play();
    },
    genData: function genData(index) {
      // 海报和鸡汤
      var data = LIB_DATA[index];
      var type = data.type;
      // 设置类型
      $('#Jtype').html(type);

      // 设置标签
      var tags = this.getArrEle(data.tags);
      var _tags = '';
      for (var i = 0; i < tags.length; i++) {
        _tags += '<div class="tag">' + tags[i] + '</div>';
      }
      $('#Jtags').html(_tags);

      // 设置鸡汤
      var quotes = data.quotes[this._random(data.quotes.length)];
      var _quotes = '';
      var _len = SHORT ? quotes.length - 1 : quotes.length;
      // console.log('出' + _len + '句鸡汤');
      for (var i = 0; i < _len; i++) {
        _quotes += '<div class="para">' + quotes[i] + '</div>';
      }
      $('#Jquotes').html(_quotes);

      this.genUserPic();
    },
    genUserPic: function genUserPic() {
      // 随机背景(guy-bg-1)
      var index = this._random(6) + 1;
      $('#JguyBg').addClass('guy-bg-' + index);

      // 随机头像(p4-guy-6 xi-6)
      var arr = ["xi", "nu", "ai", "le", "love", "desire"];
      var index2 = this._random(arr.length);
      var index3;
      if (this._gender == '1') {
        index3 = 6;
      } else {
        index3 = this._random(5) + 1;
      }
      $('#JguyPic').addClass("p4-guy-" + index3).addClass(arr[index2] + '-' + index3);
    },
    getArrEle: function getArrEle(originalArr) {
      function getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp,
            index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      }
      return getRandomArrayElements(originalArr, 4);
    },
    removeMp3: function removeMp3() {
      Jmp3.pause();
      $('#Jmp3').removeAttr('src');
      // $('#Jmp3').remove();
    },
    chooseFeeling: function chooseFeeling() {
      var _this = this;
      $('#JfeelingList').on('click', 'li', function () {
        var $ele = $(this);
        if (!!$ele.data('click')) {
          $ele.removeClass('on');
          $ele.data('click', false);
          delete _this._feelingObj[$ele.data('id')];
        } else {
          $ele.addClass('on');
          $ele.data('click', true);
          _this._feelingObj[$ele.data('id')] = true;
        }
      });
    },
    btnClick: function btnClick() {
      var _this = this;
      $('#Jbtn1').click(function () {
        var length = Object.keys(_this._feelingObj).length;
        if (!length) {
          _this.showPop('请选择感受');
          return;
        } else {
          $(this).addClass('on');
          _this.removeMp3();
          _this.timer(function () {
            _this.go2P3();
          }, 500);
        }
      });
    },
    go2P3: function go2P3() {
      $('#Jp3').show();
      $('#Jp2').fadeOut();
      if (!this._replay) {
        this.preRecord();
      }
    },
    setTxt: function setTxt() {
      var txt1 = PLAYTXT_DATA[this._random(PLAYTXT_DATA.length)];
      $('#JplayTxt').html(txt1);

      var txt2 = DEMO_DATA[this._random(DEMO_DATA.length)];
      $('#Jdemo').html(txt2);
    },
    preRecord: function preRecord() {
      var _this = this;
      this.i = 0;
      this.finished = false;

      $('#Jbtn2').on('touchstart', function (e) {
        e.preventDefault();
        $('#Jtips0').html('<div class="record-deco">0s</div>');
        if (!_this.finished) {
          $(this).addClass('on');
          $('.recorder-item.cd').removeClass('paused');
          _this._timer = setInterval(function () {
            _this.i++;
            // console.log(_this.i);
            $('#Jtips0').html('<div class="record-deco">' + _this.i + 's' + '</div>');
            if (_this.i > 4) {
              _this.finished = true;
              clearInterval(_this._timer);
              _this._timer = null;
              // _this.finishRecord();
              _this.timer(function () {
                $('#Jtips0').html('松开手指，分析音频');
              }, 1000);
            }
          }, 1000);
        }
      });

      $('#Jbtn2').on('touchend', function () {
        $(this).removeClass('on');
        $('.recorder-item.cd').addClass('paused');
        if (!_this.finished) {
          _this.i = 0;
          clearInterval(_this._timer);
          _this._timer = null;
          _this.alert();
          $('#Jtips0').html('请说出你此时此刻的想法吧');
        } else {
          _this.finishRecord();
        }
      });

      this.bindClick();
    },
    bindClick: function bindClick() {
      var _this = this;
      $('#Jbtn3').on('click', function () {
        $(this).addClass('on');
        _this.timer(function () {
          $('#Jalert').hide();
          $('#Jbtn3').removeClass('on');
        }, 100);
      });
    },
    finishRecord: function finishRecord() {
      // 生成数据
      this.genData(this.index);
      this.analyze();
      $('#Jbtn2').removeClass('on');
      // $('#Jbtn2').off('touchstart');
      // $('#Jbtn2').off('touchend');
      this.randomPlay();
    },
    analyze: function analyze() {
      var _this = this;
      $('#Janalyze').show();
      var $dots = $('.dot-i');
      var i = 0;
      this.dotTimer = setInterval(function () {
        $dots.eq(i).addClass('op1');
        i++;
        if (i > 6) {
          $dots.removeClass('op1');
          i = 0;
        }
      }, 150);

      // 绘图成功之后关闭当前页
      _this.draw('#Jp4', function (src) {

        $('#Jbase64Img').attr('src', src);
        var _src = src.split(',')[1];
        CONFIG.base64 = _src;
        // $('#Jp5').removeClass('op0');
        // $('#Jp5').height(docEle.clientHeight-140);
        if (CONFIG.isLizhi()) {
          $('#JqrcodeTxt').html('');
        } else {
          // 修改文字
          $('#JqrcodeTxt').html('长按保存图片<br>声音<br>藏着另一个陌生的你');
        }
        _this.go2P4();

        // 生成透明图之后就加载下一次的mp3
        // _this.randomPlay();
      });

      // 绑定最后两个按钮
      if (!this._replay) {
        // _this.lastBind();
      }
    },
    go2P4: function go2P4() {
      var _this = this;
      $('#Jp4').addClass('op1');
      this.timer(function () {
        $('#Jp3').hide();
        $('#Jtips0').html('请说出你此时此刻的想法吧');
        _this.stopJsAni();
        $('#Jalert').hide();
        $('#Janalyze').hide();
        $('#Jbottom').show();
      }, 3000);
    },
    lastBind: function lastBind() {
      var _this = this;
      $('#Jbottom').on('click', function (e) {
        e.preventDefault();
        var id = e.target.id;
        console.log(id);
        if (id == 'Jlink') {
          $('#Jlink').addClass('on');
          _this.timer(function () {
            window.location.href = CONFIG.link;
          }, 30);
        }

        if (id == 'Jreplay') {
          $('#Jreplay').addClass('on');
          _this.timer(function () {
            _this.replay();
            $('#Jreplay').removeClass('on');
          }, 30);
        }

        if (id == 'Jsave') {
          $('#Jsave').addClass('on');
          _this.timer(function () {
            $('#Jsave').removeClass('on');
            window.saveImage(CONFIG.base64, function (ret) {
              var num = parseInt(ret.errCode)
              switch (num) {
                case 0:
                  _this.showPop('已保存到手机');
                  break;
                case 1:
                  _this.showPop('存储失败');
                  break;
                case 2:
                  _this.showPop('无存储权限');
                  break;
                case 99:
                  _this.showPop('未知错误');
                  break;
              }

            });
          }, 30);
        }
      });
    },
    replay: function replay() {
      $('#Jp2').show();
      // 先清空p3/p4的状态
      this.clearP3();

      this.clearP2();
    },
    clearP2: function clearP2() {
      $('#Jbottom').hide();
      this._replay = true; //标记状态, 避免重新绑定事件
      var _this = this;
      // $('#Jp2').show();
      this._feelingObj = {}; //清空所有情绪
      $('.feeling-itm').removeClass('on');
      $('#Jbtn1').removeClass('on');
      var t = setTimeout(function () {
        _this.playMp3();
        clearTimeout(t);
        t = null;
      }, 0);
    },
    clearP3: function clearP3() {
      // $('#Jp3').show();
      this.finished = false;
      this.i = 0;
      $('#JguyBg').attr("class", "guy-bg-con");
      $('#JguyPic').attr("class", "p4-guy");
      $('#JqrcodeTxt').html('扫一扫，解读声音里另一个陌生的你');
      $('#Jbase64Img').removeAttr('src');
    },
    stopJsAni: function stopJsAni() {
      clearInterval(this.dotTimer);
      this.dotTimer = null;
    },
    alert: function alert() {
      $('#Jalert').show();
    },
    showPop: function showPop(str) {
      $('#Jpop').html(str).fadeIn();
      this.timer(function () {
        $('#Jpop').hide();
      }, 1500);
    },

    draw: function draw(selector, cb) {
      var selector = selector;
      drawCanvas(selector);
      function DPR() {
        // if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        //   return window.devicePixelRatio;
        // }
        return 1;
      }

      function parseValue(value) {
        return parseInt(value, 10);
      }
      function drawCanvas(selector) {
        // 获取想要转换的 DOM 节点
        var dom = document.querySelector(selector);
        // dom = dom.cloneNode(true);
        var box = window.getComputedStyle(dom);
        // DOM 节点计算后宽高
        var width = parseValue(box.width);
        var height = parseValue(box.height);
        // 获取像素比
        var scaleBy = DPR();
        // 创建自定义 canvas 元素
        var canvas = document.createElement('canvas');

        // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
        canvas.width = width * scaleBy;
        canvas.height = height * scaleBy;
        // 设定 canvas css宽高为 DOM 节点宽高
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        // 获取画笔
        var context = canvas.getContext('2d');

        // 将所有绘制内容放大像素比倍
        context.scale(scaleBy, scaleBy);

        // 将自定义 canvas 作为配置项传入，开始绘制
        return html2canvas(dom, {
          scale:1,
          canvas: canvas,
          removeContainer: false,
          backgroundColor: null
        }).then(function (fgCanvas) {
          var dom = document.querySelector('body');
          var box = window.getComputedStyle(dom);

          var bgImg = new Image();

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
          bgImg.src = 'src/images/p2/bg.jpg';
          bgImg.onload = function () {
            var bgImgWidth = bgImg.width;
            var bgImgHeight = bgImg.height;
            var bgCanvasRatio = bgCanvasWidth / bgCanvasHeight;
            var bgImgRatio = bgImgWidth / bgImgHeight;

            var sX, sY, sW, sH;

            if (bgCanvasRatio > bgImgRatio) {
              // width: 100%
              sX = 0;
              sY = Math.abs((bgImgHeight - bgImgWidth / bgCanvasRatio) / 2);
            } else {
              // height: 100%
              sX = Math.abs((bgImgWidth - bgImgHeight * bgCanvasRatio) / 2);
              sY = 0;
            }

            var ctx = bgCanvas.getContext('2d');
            ctx.drawImage(bgImg, sX, sY, bgImgWidth - sX * 2, bgImgHeight - sY * 2, 0, 0, bgCanvasWidth, bgCanvasHeight);
            ctx.drawImage(fgCanvas, hGap, vGap, fgCanvas.width, fgCanvas.height);

            if (CONFIG.isLizhi()) {
              var src = bgCanvas.toDataURL('image/jpeg',0.6);
            }else{
              var src = bgCanvas.toDataURL('image/jpeg',0.8);
            }
            // console.log(src)
            cb && cb(src);
          };
        });
      }
    }
  };

  window.mod = mod;
  window.CONFIG = CONFIG;

  // 测试页面
  if (document.body.id == 'Jtest') {
    return;
  }

  if (document.body.id == 'Jbridge') {
    // 百度计数器
    // setBd();
    // 微信
    if (CONFIG.isWeixin()) {
      var openid = localStorage.getItem(CONFIG.item);
      if (!!openid) {
        window.location.href = CONFIG.targetUrl;
      } else {
        window.location.href = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=brand&redirectURL=' + encodeURIComponent(CONFIG.targetUrl);
      }
    } else {
      window.location.href = 'index.html';
    }
    return;

  } else {

    activeVoice(Jaudio); // 激活 但是没有播放

    if (CONFIG.dev) {
      if (CONFIG.isLizhi()) {
        $('#Jbottom').width(530);
      }
      CONFIG.userName = '开发模式'
      mod.init(CONFIG.userName);
      return;
    }

    // 百度计数器
    setBd();

    if (false) {
      // 微信打开
      if (CONFIG.isWeixin()) {
        checkAuth(function (userName) {
          wxApi.init(function () {
            var shareData = {
              title: document.title,
              desc: desc.content,
              link: CONFIG.targetUrl,
              imgUrl: CONFIG.sharePic
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            mod.init(userName);
          });
        }, function () {
          window.location.href = CONFIG.authUrl;
        });
        return;
      }

      // 荔枝APP打开
      if (CONFIG.isLizhi()) {
        $('#Jbottom').width(530);
        getLzUserName(function (name) {
          var _name = !!name? name :CONFIG.userName;
          mod.init(_name);
        });
        return;
      }
    }

    // 其他浏览器
    mod.init(CONFIG.userName);
  }
});