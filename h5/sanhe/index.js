$(function(argument) {

  var Pflag = 1,ANITIME = 2800;
  $('body').on('touchstart', function(e){
    if (Pflag) {
      Jbgm.play();
      Pflag = 0;
    }
  });
  var picArr = [
    "images/a1-1.png",
    "images/p5-3-line.png",
    "images/a1-2.png",
    "images/p5-3-pop-bg@2x.png",
    "images/a2-1.png",
    "images/p5-3-pop-btn.png",
    "images/a2-2.png",
    "images/p5-3-pop-tit.png",
    "images/a3-1.png",
    "images/p5-3-pop-txt.png",
    "images/a3-2.png",
    "images/p5-3-pot.png",
    "images/a4-1.png",
    "images/p5-3-round.png",
    "images/a4-2.png",
    "images/p5-3-static-items@2x.png",
    "images/a5-1.png",
    "images/p5-3-txt.png",
    "images/a5-2.png",
    "images/p5-4-pop-bg.png",
    "images/a6-1.png",
    "images/p5-4-pop-bg@2x.png",
    "images/a6-2.png",
    "images/p5-4-pop-btn.png",
    "images/arr.png",
    "images/p5-4-pop-tit.png",
    "images/cupon-pop-bg@2x.png",
    "images/p5-4-pop-txt.png",
    "images/form-pop-bg@2x.png",
    "images/p5-4-pot.png",
    "images/form-pop-btn.png",
    "images/p5-4-round-4.png",
    "images/guy-pop-bg.png",
    "images/p5-4-round.png",
    "images/guy-pop-bg@2x.png",
    "images/p5-4-star.png",
    "images/guy-pop-food.png",
    "images/p5-4-static-items@2x.png",
    "images/guy-pop-pot.png",
    "images/p5-4-txt.png",
    "images/guy-pop-tit.png",
    "images/p5-4-wing.png",
    "images/hand.png",
    "images/p5-5-line.png",
    "images/intro-dot.png",
    "images/p5-5-pop-bg@2x.png",
    "images/logo.png",
    "images/p5-5-pop-btn.png",
    "images/p1-3line.png",
    "images/p5-5-pop-tit.png",
    "images/p1-blue-bar.png",
    "images/p5-5-pop-txt.png",
    "images/p1-static-items@2x.png",
    "images/p5-5-pot.png",
    "images/p1-tri.png",
    "images/p5-5-round.png",
    "images/p1-txt.png",
    "images/p5-5-static-items@2x.png",
    "images/p2-blue-bar.png",
    "images/p5-5-txt.png",
    "images/p2-blue-bar@2x.png",
    "images/p5-5-violin.png",
    "images/p2-static-items.png",
    "images/p5-6-a.png",
    "images/p2-static-items@2x.png",
    "images/p5-6-bar.png",
    "images/p2-tri.png",
    "images/p5-6-pop-bg@2x.png",
    "images/p2-txt-1.png",
    "images/p5-6-pop-btn1.png",
    "images/p2-txt-2.png",
    "images/p5-6-pop-btn2.png",
    "images/p2-txt-3.png",
    "images/p5-6-pop-tit.png",
    "images/p3-blue-bar.png",
    "images/p5-6-pop-txt.png",
    "images/p3-blue-bar@2x.png",
    "images/p5-6-pot.png",
    "images/p3-pot.png",
    "images/p5-6-q.png",
    "images/p3-static-items.png",
    "images/p5-6-static-items@2x.png",
    "images/p3-static-items@2x.png",
    "images/p5-7-blue-bar.png",
    "images/p3-tri.png",
    "images/p5-7-circle-b.png",
    "images/p3-txt-1.png",
    "images/p5-7-circle-s.png",
    "images/p3-txt-2.png",
    "images/p5-7-guy.png",
    "images/p4-cube.png",
    "images/p5-7-guy@2x.png",
    "images/p4-mask.png",
    "images/p5-7-red-bar.png",
    "images/p4-rule.png",
    "images/p5-7-red-bar@2x.png",
    "images/p4-static-items@2x.png",
    "images/p5-7-red-block.png",
    "images/p4-tags.png",
    "images/p5-7-red-block@2x.png",
    "images/p4-tit-1.png",
    "images/p5-7-static-items@2x.png",
    "images/p4-tit-2.png",
    "images/p5-7-txt1.png",
    "images/p5-1-bag.png",
    "images/p5-7-txt2.png",
    "images/p5-1-line.png",
    "images/p5-7-txt3.png",
    "images/p5-1-pop-bg@2x.png",
    "images/p5-8-static-items@2x.png",
    "images/p5-1-pop-btn.png",
    "images/p5-8-txt@2x.png",
    "images/p5-1-pop-tit.png",
    "images/p6-btn.png",
    "images/p5-1-pop-txt.png",
    "images/p6-circle-b.png",
    "images/p5-1-pot.png",
    "images/p6-circle-s.png",
    "images/p5-1-round.png",
    "images/p6-guy@2x.png",
    "images/p5-1-static-items@2x.png",
    "images/p6-red-bar.png",
    "images/p5-1-txt.png",
    "images/p6-red-bar@2x.png",
    "images/p5-2-book.png",
    "images/p6-static-items@2x.png",
    "images/p5-2-line.png",
    "images/p6-txt@2x.png",
    "images/p5-2-pop-bg@2x.png",
    "images/p7-bg@2x.png",
    "images/p5-2-pop-btn.png",
    "images/rule-close-btn.png",
    "images/p5-2-pop-tit.png",
    "images/rule-pop-bg.png",
    "images/p5-2-pop-txt.png",
    "images/rule-pop-bg@2x.png",
    "images/p5-2-pot.png",
    "images/rule-pop-btn.png",
    "images/p5-2-round.png",
    "images/rule-pop-tit.png",
    "images/p5-2-static-items@2x.png",
    "images/rule-pop-txt.png",
    "images/p5-2-txt.png",
    "images/tips.png",
    "images/p5-3-crown.png",
    "images/wxshare.jpg"
  ];
  $.extend({
      preLoad:function(n, o, e) {
          function t(o) {
              var c = new Image();
              c.onload = function() {
                  i += 1, e((100 * i / r).toFixed(0));
                  var o = n.shift();
                  o && t(o);
              }, c.src = o;
          }
          var i = 0, r = n.length;
          return r ? void n.slice(i, i + o).forEach(function() {
              t(n.shift());
          }) :e(100);
      }
  });
  var loadFlag = 1, _picArr = picArr.concat([]) ,$loading = $("#loading"), $JloadingTxt=$('#JloadingTxt');
  $.preLoad(_picArr, 3, function(percent) {
    $JloadingTxt.html(percent + "%");
    if (100 == percent && loadFlag ) {
      loadFlag = 0;
      setTimeout(function(){
        $loading.fadeOut(1e3, function() {
            $loading.remove();
            $('.arr').show();
            $('.P1').addClass('active');
        })
      },1000)
    }
  });
  var mySwiper,swipeFlag=1, mod = {
    swiper:function(){
      function fixPagesHeight() {
        $('.swiper-slide,.swiper-container').css({
          height: $(window).height(),
        })
      }
      $(window).on('resize', function() {
        fixPagesHeight();
      });
      fixPagesHeight();
      mySwiper = new Swiper("#Jswipe",{
        direction:'vertical',
        followFinger:false,
        onInit: function(swiper) {
          swiper.myactive = 0;
        },
        onTransitionStart:function(swiper){
          var index = swiper.activeIndex;
          if(index == 4 && swipeFlag){
            $('.arr').hide();
            mySwiper.lockSwipes();
          }
          if(index == 5){
            ($('.cupon-pop-wrap').css('display') =='block') && $('.logo').hide();
          }
          if(index == 6){
            $('.logo').show();
            $('.arr').hide();
          }
        },
        onTransitionEnd: function(swiper){
          var index = swiper.activeIndex;
          console.log(index);
          $('.P'+(index+1)).addClass('active').siblings().removeClass('active');
        }
      });
      // mySwiper.lockSwipeToPrev();
    },
    bindClick:function(ele,callback){
      $(ele).on('touchend', function(event){
        event.preventDefault();
        callback && callback();
      });
    },
    all:function(){
      var _this = this;
      // 行动规则
      this.bindClick('.p4-rule', function() {
        mySwiper.lockSwipes();
        $('.rule-pop-wrap').show().addClass('active');
      });
      // 关闭行动规则弹窗
      this.bindClick('#Jclose-pop',function(){
        $('.rule-pop-wrap').hide();
        mySwiper.unlockSwipes();
      });
      // 关闭行动规则弹窗并跳到下一页
      this.bindClick('#Jclose-pop2',function(){
        mySwiper.unlockSwipes();
        $('.rule-pop-wrap').hide();
      });

      // 体贴温柔
      var a1flag = 1;
      this.bindClick('#Ja1-1',function(){
        if (a1flag) {
          a1flag = 0;
          $('.p5-1').addClass('on');
          var t = setTimeout(function(){
            $('.p5-1-pot').addClass('p5-1-pot-ani');
            $('.p5-1-bag').addClass('p5-1-bag-ani');
            clearTimeout(t);
            t = null;
          },1200);
          var timer = setTimeout(function(){
            // $('.p5-1').hide();
            $('.p5-1').fadeOut(300);
            $('.p5-2').show().addClass('p5-2-ani');
            clearTimeout(timer);
            timer = null;
          },ANITIME)
        }
      });
      // 粗心冷漠
      this.bindClick('#Ja1-2',function(){
        a1flag && $('.p5-1-pop-wrap').show().addClass('active');
      });
      // 关闭
      this.bindClick('.p5-1-pop-btn',function(){
        $('.p5-1-pop-wrap').hide();
      });

      // 低调涵养
      var a2flag = 1;
      this.bindClick('#Ja2-1', function() {
        if (a2flag) {
          a2flag = 0;
          $('.p5-2').addClass('on');
          var t = setTimeout(function(){
            $('.p5-2-pot').addClass('p5-2-pot-ani');
            $('.p5-2-book').addClass('p5-2-book-ani');
            clearTimeout(t);
            t = null;
          },1200);
          var timer = setTimeout(function(){
            // $('.p5-2').hide();
            $('.p5-2').fadeOut(300);
            $('.p5-3').show().addClass('p5-3-ani');
            clearTimeout(timer);
            timer = null;
          },ANITIME)
        }
      });

      // 桀骜张扬
      this.bindClick('#Ja2-2', function() {
        a2flag && $('.p5-2-pop-wrap').show().addClass('active');
      });
      // 关闭
      this.bindClick('.p5-2-pop-btn',function(){
        $('.p5-2-pop-wrap').hide();
      });


      // 热情上进
      var a3flag = 1;
      this.bindClick('#Ja3-1', function() {
        if (a3flag) {

          $('.p5-3').addClass('on');
          var t = setTimeout(function(){
            $('.p5-3-pot').addClass('p5-3-pot-ani');
            $('.p5-3-crown').addClass('p5-3-crown-ani');
            clearTimeout(t);
            t = null;
          },1200);
          var timer = setTimeout(function(){
            // $('.p5-3').hide();
            $('.p5-3').fadeOut(300);
            $('.p5-4').show().addClass('p5-4-ani');
            clearTimeout(timer);
            timer = null;
          },ANITIME)
        }
        // },0)
      });
      // 木讷慵懒
      this.bindClick('#Ja3-2', function() {
        a3flag && $('.p5-3-pop-wrap').show().addClass('active');
      });
      // 关闭
      this.bindClick('.p5-3-pop-btn',function(){
        $('.p5-3-pop-wrap').hide();
      });


      // 颜值气质高
      var a4flag = 1;
      this.bindClick('#Ja4-1', function() {
        if (a4flag) {
          $('.p5-4').addClass('on');
          var t = setTimeout(function(){
            $('.p5-4-pot').addClass('p5-4-pot-ani');
            $('.p5-4-wing').addClass('p5-4-wing-ani');
            clearTimeout(t);
            t = null;
          },1200);
          var timer = setTimeout(function(){
            // $('.p5-4').hide();
            $('.p5-4').fadeOut(300);
            $('.p5-5').show().addClass('p5-5-ani');
            clearTimeout(timer);
            timer = null;
          },ANITIME)
        }
      });
      // 矮矬路人甲
      this.bindClick('#Ja4-2', function() {
        a4flag && $('.p5-4-pop-wrap').show().addClass('active');
      });
      // 关闭
      this.bindClick('.p5-4-pop-btn',function(){
        $('.p5-4-pop-wrap').hide();
      });

      // 才华横溢
      var a5flag = 1;
      this.bindClick('#Ja5-1', function() {
        if (a5flag) {
          $('.p5-5').addClass('on');
          var t = setTimeout(function(){
            $('.p5-5-pot').addClass('p5-5-pot-ani');
            $('.p5-5-violin').addClass('p5-5-violin-ani');
            clearTimeout(t);
            t = null;
          },1200);
          var timer = setTimeout(function(){
            // $('.p5-5').hide();
            $('.p5-5').fadeOut(300);
            $('.p5-6').show().addClass('p5-6-ani').addClass('on');
            $('.p5-6-q').show().addClass('p5-6-q-ani');
            $('.p5-6-a').show().addClass('p5-6-a-ani');
            $('.a6').show().addClass('a6-ani');
            clearTimeout(timer);
            timer = null;
          },ANITIME)
        }
        // },0)
      });
      // 孤陋寡闻
      this.bindClick('#Ja5-2', function() {
        a5flag && $('.p5-5-pop-wrap').show().addClass('active');
      });
      // 关闭
      this.bindClick('.p5-5-pop-btn',function(){
        $('.p5-5-pop-wrap').hide();
      });

      // 会做饭
      this.bindClick('#Ja6-1', function() {
        // $('.p5-6').hide();
        $('.p5-6').fadeOut(300);
        $('.p5-7').show().addClass('active').addClass('p5-7-ani');
        Mguy.play();
        $('.arr').show();
        swipeFlag = 0;
        mySwiper.unlockSwipes();
        // mySwiper.lockSwipeToPrev();
      });

      // 会挣钱
      this.bindClick('#Ja6-2', function() {
        $('.p5-6-pop-wrap').show().addClass('active');
      });

      // 再选一次
      this.bindClick('.p5-6-pop-btn1',function(){
        $('.p5-6-pop-wrap').hide();
      });

      // 伤心欲绝 推荐
      this.bindClick('.p5-6-pop-btn2',function(){
        // $('.p5-6').hide();
        $('.p5-6').fadeOut(300);
        $('.p5-6-pop-wrap').hide();
        $('.p5-8').show().addClass('active').addClass('p5-8-ani');
        Mguy.play();
        $('.arr').show();
        swipeFlag = 0;
        mySwiper.unlockSwipes();
        // mySwiper.lockSwipeToPrev();
      });

      // 关闭人物介绍弹窗
      this.bindClick('#Jguy-close-pop',function(){
        $('.guy-pop-wrap').hide();
        mySwiper.unlockSwipes();
        // mySwiper.lockSwipeToPrev();
      });

      // get cupon
      this.bindClick('#JgetCoupon', function() {
        $('.form-pop-wrap').show();
      });
      // submit
      this.bindClick('#Jsbm', function() {
        var res = _this.checkInput();
        if (!!res) {
        // if (true) {
          var tel = res.tel, name = res.name;
          _this.submitForm(name,tel);

        }
      });


      // 关闭人物介绍
      this.bindClick('.guy-pop-close-btn', function() {
        $('.arr').show();
        $('.guy-pop-wrap').hide();
      });
      this.bindClick('#Jintro1', function() {
        $('.guy-pop-wrap').show();
      });
      this.bindClick('#Jintro2', function() {
        $('.guy-pop-wrap').show();
      });
    },
    submitForm:function(name,tel){
      $.ajax({
        url: INTF,
        data: {
          user_name:name,
          telephone:tel,
          device_type:window.navigator.appVersion
        }
      });
      setTimeout(function(){
        $('.form-pop-wrap').hide();
        Mcupon.play();
        $('.cupon-pop-wrap').show();
        $('.logo').hide();
      },0);
    },
    checkInput:function(){
      // 表单检测
      var $name =$('#Jname').val();
      var $tel = $('#Jtel').val();
      var Reg = /^[1][34578][0-9]{9}$/;
      // 姓名检验
      if(!/^[\u4e00-\u9fa5a-zA-Z0-9\-\·]+$/.test($name)){
        alert('请输入您的名字!');
        return;
      }
      // 手机号码校验
      if(!Reg.test($tel)){
        alert("请输入正确的手机号码!");
        return;
      }
      return {
        name:$name,
        tel:$tel
      };
    },
    init:function(){
      this.swiper();
      this.all();
    }
  };
  mod.init();
});