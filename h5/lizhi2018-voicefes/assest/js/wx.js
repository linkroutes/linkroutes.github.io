var isLoad = false;
var WXENV = new function (ticketUrl) {
    var self = this;
    self.ticketUrl = ticketUrl;
    self.ready = false;
    self.readyHandlers = [];
    self.shareData = {
        title: 'title',
        desc: "desc",
        link: "",
        imgUrl: "",
        type: "",
        dataUrl: "",
        success: function (res) { },
        cancel: function (res) { }
    };

    self.debug = false; //设置true会显示debug信息

    self.jsApiList = [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "hideAllNonBaseMenuItem"
    ];

    self.addReadyHandler = function (callback) {
        if (self.ready) {
            callback();
        } else {
            self.readyHandlers.push(callback);
        }
    };

    self.updateShareData = function (data) {
        if (typeof data == "undefined") {
            data = self.shareData;
        }

        if (self.ready) {
            self._updateShareData(data);
        } else {
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
            console.log("loading");
        }
    };

    window.WXENV_CALLBACK = function (config) {
        config.debug = self.debug;
        config.jsApiList = self.jsApiList;
        wx.config(config);
    };

    var js = document.getElementsByTagName("script")[0];

    self.onEnvReady = function () {
        var url = self.ticketUrl;
        if (url.indexOf("?") == -1) {
            url += "?";
        } else {
            url += "&";
        }

        url += "url=" + encodeURIComponent(window.location.href);
        url += "&callback=WXENV_CALLBACK";
        url += "&_=" + new Date().valueOf();

        var script = document.createElement("script");
        script.src = url;
        js.parentNode.insertBefore(script, js.nextSibling);
    };

    var wxjs = document.createElement("script");
    wxjs.addEventListener("load", function () {
        wx.ready(function () {
            self.ready = true;
            self.updateShareData();
            wx.hideMenuItems({
                menuList: ["menuItem:profile", "menuItem:addContact"]
            });

            for (var i = 0; i < self.readyHandlers.length; i++) {
                self.readyHandlers[i]();
            }

            self.readyHandlers = [];
        });
        self.onEnvReady();
    });

    wxjs.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
    js.parentNode.insertBefore(wxjs, js.nextSibling);
}("http://wx.e2capp.com/jsticket.ashx?serv_name=xtly.suzuki");