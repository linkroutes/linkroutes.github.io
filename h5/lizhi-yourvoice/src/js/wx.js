var wxApi = {
  DEV:window.location.href.indexOf('_dev_')>-1,
  debug:false,
  wxJs:'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
  getJs: function (url,callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.charset = "UTF-8";
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
        this.onload = this.onreadystatechange = null;
        callback && callback();
      }
    }
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  init:function (callback) {
    var _this = this;
    this.getJs(_this.wxJs,function(){
      var url=encodeURIComponent(location.href.split('#')[0]);
      $.ajax({
        url: 'https://oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand&currentURL='+url,
        type: 'get',
        success: function (data) {
          var data = data.data;
          wx.config({
            debug: _this.debug,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ]
          });

          if (_this.DEV) {
            callback && callback(data);
          }else{
            wx.ready(function() {
              callback && callback(data);
            });
            wx.error(function(res) {
              alert(res.errMsg);
            });
          }
        }
      });
    })
  }
}