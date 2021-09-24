/*  
 * 预加载类
 * jQuery 1.5.0版本以上
 * author:xyantelope 
 * datetime:2016/5/5
 */

var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;

        return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad  
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
            weixin: u.indexOf('MicroMessenger') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
//判断：
var and = browser.versions.android;//android
var ios = browser.versions.ios;//ios
var weixin = browser.versions.weixin;

var Loader = function (){

    /*
     * 完成加载的资源数量
     */
    this.completeLoadItem = 0;

    /*
     * 需要加载的资源数量 
     */
    this.needLoadItem = 0;

    this.images = [];

    this.audios = [];

    this.wxAudio = [];

    /*
    * 加载图片
    */
    this.loadImage = function loadImage(src, callback) {
        var dtd = $.Deferred();
        var _self = this;
        var image = new Image();
        image.onload = function () {
            callback.bind(_self)();
            dtd.resolve();
        };
        image.src = src;
        return dtd.promise();
    },

    /**
     * 加载音频
     */
    this.loadAudio = function loadAudio(item, callback) {
        var dtd = $.Deferred();

        var count = item.count || 1;
        for (var i = 0; i < count; i++) {
            var _self = this;
            var audio = new Audio();

            if (audio.onloadedmetadata == undefined ||
                audio.onloadedmetadata == null ||
                audio.onloadedmetadata == '') {
                console.log("不支持onloadedmetadata属性");
                audio.src = item.src;
                audio.loop = item.loop;
                this.wxAudio[item.name] = audio;

                audio.play();
                audio.pause();
                callback.bind(_self)();
                dtd.resolve();
            }
            else {
                audio.onloadedmetadata = function () {
                    if (browser.versions.android) {
                        audio.volume = 0;
                        console.log("android")
                    }
                    else if (browser.versions.ios) {
                        audio.play();
                        audio.pause();
                        console.log("ios")
                    }

                    callback.bind(_self)();
                    dtd.resolve();
                };
                //preload = "none";
                audio.src = item.src;
                audio.loop = item.loop;
                if (browser.versions.android) {
                    audio.play();
                }
                this.wxAudio[item.name] = audio;

            }
        }

        return dtd.promise();
    },

    /*
     * 加载动画的更新
     */
    this.loadUpdateCallBack = function loadUpdate() {
        ++this.completeLoadItem;
        console.log("complete:" + this.completeLoadItem);
    },

    /*
     * 加载H5,
     */
    this.loadH5 = function loadH5(callback) {
        this.needLoadItem = this.images.length + this.audios.length;

        // loader
        var loaders = [];

        // 加载图片的loader
        for (var i = 0; i < this.images.length; i++) {
            var item = this.images[i];
            loaders.push(this.loadImage(item, this.loadUpdateCallBack));
        }

        // 加载音频的loader
        for (var i = 0; i < this.audios.length; i++) {
            var item = this.audios[i];
            loaders.push(this.loadAudio(item, this.loadUpdateCallBack))
        }

        $.when.apply(null, loaders)
        .done(function () {
            console.log("全部加载完成！");
            callback();
        })
        .fail(function () {
            console.log("加载失败");
        });
    }

    return this;
};
