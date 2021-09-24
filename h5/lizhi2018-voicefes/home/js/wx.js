
var isLoad = false;

var url =window.document.location.href;

//获取带"/"的项目名，如：/Tmall
var imgUrl =url.substring(0,url.substr(1).lastIndexOf('/')+1) + '/images/share.jpg'

console.log(url)
console.log(imgUrl)

var WXENV = new (function (ticketUrl) {
    var self = this;
    self.ticketUrl = ticketUrl;
    self.ready = false;
    self.readyHandlers = [];
    self.shareData = {
        title: '史上最强悍粉丝了解一下？？？ ',
        desc: '面撩爱豆！抢荔枝声音节门票～',     // 分享描述
        link: url,            // 分享链接
        imgUrl: imgUrl,    // 分享图标
        type: '',
        dataUrl: '',
        success: function (res) {
        },
        cancel: function (res) {
        }
    };

    self.debug = false;//设置true会显示debug信息

    self.jsApiList =
    [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideAllNonBaseMenuItem',
    ];

    self.addReadyHandler = function (callback) {
        if (self.ready) {
            callback();
        }
        else {
            self.readyHandlers.push(callback);
        }
    };

    self.updateShareData = function (data) {
        if (typeof (data) == 'undefined') {
            data = self.shareData;
        }

        if (self.ready) {
            self._updateShareData(data);
        }
        else {
            self.addReadyHandler(function () {
                self._updateShareData(data);
            });
        }
    };

    self._updateShareData = function (data) {
        wx.onMenuShareTimeline({
            title: data.title,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            type: data.type,
            dataUrl: data.dataUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareQQ({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareWeibo({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });

        if (!isLoad) {
            isLoad = true;
            console.log("loading")
        }
    };

    var js = document.getElementsByTagName('script')[0];

    self.onEnvReady = function () {
        var url = self.ticketUrl;
        if (url.indexOf('?') == -1) {
            url += '?';
        }
        else {
            url += '&';
        }

        url += 'currentURL=' + encodeURIComponent(window.location.href);
        url += '&_=' + new Date().valueOf();

        $.get(url, function(res){
            res.data.debug = self.debug;
            res.data.jsApiList = self.jsApiList;
            wx.config(res.data);
        })
    };


    var wxjs = document.createElement('script');
    wxjs.addEventListener('load', function () {
        wx.ready(function () {
            self.ready = true;
            self.updateShareData();
            wx.hideMenuItems({
                menuList: ['menuItem:profile', 'menuItem:addContact']
            });

            for (var i = 0; i < self.readyHandlers.length; i++) {
                self.readyHandlers[i]();
            }

            self.readyHandlers = [];
        });
        self.onEnvReady();
    });

    wxjs.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    js.parentNode.insertBefore(wxjs, js.nextSibling);
})('//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand');