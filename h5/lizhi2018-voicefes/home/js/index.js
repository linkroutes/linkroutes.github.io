"use strict";

var host = "";
host = "http://lizhi.shuizuipianyi.com/api/app/";

var apis = {
    List: host + 'List.ashx',
    Login: host + 'Login.ashx',
    SendMsg: host + 'SendMsg.ashx',
    Support: host + 'Support.ashx',
    View: host + 'View.ashx',
    Share: host + 'Share.ashx',
    DoLottery: host + 'DoLottery.ashx'
};
var cd = new COUNTDOWN();
window.isCompleteLoading = false;

var loader_resource = new Loader();
function loading() {
    var interval = setInterval(increment, 40);
    var current = 0;
    function increment() {
        ++current;
        $('.counter').html(current + '%');
        if (current == 100) {
            clearInterval(interval);
            openMainSence();
        }
    }

    console.log(resouce.images);
    loader_resource.images = resouce.images;
    loader_resource.audios = resouce.audios;
    loader_resource.loadUpdateCallBack = function () {};
    loader_resource.loadH5(function () {
        window.isCompleteLoading = true;
    });
}

var audio = document.getElementById('bgm');
function openMainSence(interval) {
    if (window.isCompleteLoading) {
        $('.defineBox').removeClass('page-hide');
        nextPage('.page-home');
        startHeaderAni(0);
    }
}

var mySwiper;
function startHeaderAni(i) {
    i = i % 7 + 1;
    endAnimation($('.idol' + i), function () {
        $('.idol').removeClass('animated bounce');
        startHeaderAni(++i);
    });
    $('.idol' + i).addClass('animated bounce');
}
// 初始化
function init() {
    //点击头像，进入明星页
    $('.idol').click(function () {
        nextPage('.page-idol');
        initSwiper();
        var idol_id = $(this).data('id');
        mySwiper.slideTo(idol_id - 1, 0);
        $('.idol-img').css({
            'opacity':0
        })
        $('.idol-img' + idol_id).addClass('animated fadeInDown');
        setTimeout(function(){
            $('.idol-img').css({
                'opacity':1
            })
        },1000)

        openStarMusic(idol_id);
        $('.meet-btn').data('id', idol_id);
    });

    $('.play-btn').click(function () {
        if($('.voice4').hasClass('page-hide')){
            addClass($('.ani-voice'),'page-hide');
            $('.voice4').removeClass('page-hide');
            window.isOpenMusic ? openBgm() : closeBgm();
            closeMusic(mySwiper.activeIndex % 7 + 1);
        }
        else{
            closeBgm();
            toggleStarMusic(mySwiper.activeIndex % 7 + 1);
            addClass($('.voice4'),'page-hide');
            $('.ani-voice').removeClass('page-hide');
        }
    });

    //约定TA
    $('.meet-btn').click(function () {
        addClass($('.call'), 'call' + (mySwiper.activeIndex + 1));

        var data = {
            id: $('.meet-btn').data('id')
        };
        if (true) {
            nextPage('.page-call');
            var t = setTimeout(function () {
                clearTimeout(t);
                tip.play();
                closeBgm();
            }, 900);
            var t1 = setTimeout(function () {
                clearTimeout(t1);
                if (false) {
                    $('.mask-call').removeClass('page-hide');
                }
                else{
                    getRank()
                }
            }, 1500);

            var t2 = setTimeout(function () {
                clearTimeout(t2);
                if (false) {
                    nextPage('.page-info');
                }
            }, 4200);
        }
        return;
        $.get(apis.Support, data, function (res) {
            if (res.errCode == 0) {
                nextPage('.page-call');
                var t = setTimeout(function () {
                    clearTimeout(t);
                    tip.play();
                    closeBgm();
                }, 900);
                var t1 = setTimeout(function () {
                    clearTimeout(t1);
                    if (window.user.islogin <= 0) {
                        $('.mask-call').removeClass('page-hide');
                    }
                    else{
                        getRank()
                    }
                }, 1500);

                var t2 = setTimeout(function () {
                    clearTimeout(t2);
                    if (window.user.islogin <= 0) {
                        nextPage('.page-info');
                    }
                }, 4200);
            }
            else {
                msg(res.errMsg);
            }
        });
    });

    // 发送验证码
    $('.codebox').click(function () {
        var self = this;
        if ($(self).data('enable')) {
            var data = {
                telephone: $.trim($('#telephone').val())
            };
            if (data.telephone == '') {
                msg('请输入手机号！');
            } else if (!/^1\d{10}$/i.test(data.telephone)) {
                msg('手机号格式不正确！');
            } else {
                cd.countdown(60, function (time) {
                    $('.codebox p').html(time + '秒');
                }, function () {
                    $('.codebox p').html('重新获取');
                    $(self).data('enable', true);
                });

                $(self).data('enable', false);
                $.get(apis.SendMsg, data, function (res) {
                    if (res.errCode == 0) {
                        msg("发送成功");
                    } else {
                        msg(res.errMsg);
                        $(self).data('enable', true);
                    }
                });
            }
        }
    });

    //留资提交
    $('.submit-btn').click(function () {
        var data = {
            username: $.trim($("#username").val()),
            telephone: $.trim($("#telephone").val()),
            ver_code: $.trim($('#code').val())
        };

        if (data.username == "") {
            msg("请填写您的姓名！");
            return;
        } else if (data.telephone == "") {
            msg("请填写您的手机！");
            return;
        } else if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(data.telephone)) {
            msg('手机号格式不正确');
            return;
        } else if (data.ver_code == '') {
            msg('请输入验证码！');
            return;
        } else {
            $.post(apis.Login, data, function (res) {
                if (res.errCode == 0) {
                    window.user.islogin  = 1
                    draw.play();
                    nextPage('.page-prize');
                    $('.mask-prize').removeClass('page-hide');
                    if (res.data.giftid <= 5) {
                        nextSection('.section1');
                    } else {
                        nextSection('.section2');
                    }
                }
                else if (res.errCode == 1) {
                    window.user.islogin  = 1
                    draw.play();
                    nextPage('.page-prize');
                    $('.mask-prize').removeClass('page-hide');
                    nextSection('.section3');
                }
                else {
                    msg(res.errMsg);
                }
            });
        }
    });

    //打开中奖
    $('.open-btn').click(function () {
        nextPage('.page-info');
    });

    //进入排行榜
    $('.mask-prize').click(function () {
        getRank();
    });

    //为idol拉票
    $('.vote-btn').click(function () {
        $('.mask-share').removeClass('page-hide');
    });

    //分享页
    $('.mask-share').click(function () {
        $('.mask-share').addClass('page-hide');
    });
}

function getRank() {
    var num = 100000;
    var res = {
        data:[
            {
                headimgurl:'./images/home/idol1.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol2.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol3.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol4.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol5.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol6.png',
                support_count:parseInt(Math.random()*num)
            },
            {
                headimgurl:'./images/home/idol7.png',
                support_count:parseInt(Math.random()*num)
            }
        ]
    };
        if (true) {
            nextPage('.page-rank');
            var html = "\n<div class=\"p-rank gold abs h-center\">\n                        <img src=\"" + res.data[0].headimgurl + "\" alt=\"\">\n                        <div class=\"p-rank votebox abs\">\n                            <p>\u7968\u6570:<span class=\"number\">" + res.data[0].support_count + "</span></p>\n                        </div>\n                    </div>\n                    <div class=\"p-rank silver abs\">\n                        <img src=\"" + res.data[1].headimgurl + "\" alt=\"\">\n                        <div class=\"p-rank votebox abs\">\n                            <p>\u7968\u6570:<span class=\"number\">" + res.data[1].support_count + "</span></p>\n                        </div>\n                    </div>\n                    <div class=\"p-rank bronze abs\">\n                        <img src=\"" + res.data[2].headimgurl + "\" alt=\"\">\n                        <div class=\"p-rank votebox abs h-center\">\n                            <p>\u7968\u6570:<span class=\"number\">" + res.data[2].support_count + "</span></p>\n                        </div>\n                    </div>\n                    <div class=\"itembox abs h-center\">\n                        <div class=\"item\">\n                            <div class=\"p-rank four abs v-center\"></div>\n                            <div class=\"p-rank rank-imgbg abs v-center\">\n                                <img src=\"" + res.data[3].headimgurl + "\" alt=\"\">\n                            </div>\n                            <div class=\"p-rank votebox abs v-center\">\n                                <p>\u7968\u6570:<span class=\"number\">" + res.data[3].support_count + "</span></p>\n                            </div>\n                        </div>\n                        <div class=\"item\">\n                            <div class=\"p-rank five abs v-center\"></div>\n                            <div class=\"p-rank rank-imgbg abs v-center\">\n                                <img src=\"" + res.data[4].headimgurl + "\" alt=\"\">\n                            </div>\n                            <div class=\"p-rank votebox abs v-center\">\n                                <p>\u7968\u6570:<span class=\"number\">" + res.data[4].support_count + "</span></p>\n                            </div>\n                        </div>\n                        <div class=\"item\">\n                            <div class=\"p-rank six abs v-center\"></div>\n                            <div class=\"p-rank rank-imgbg abs v-center\">\n                                <img src=\"" + res.data[5].headimgurl + "\" alt=\"\">\n                            </div>\n                            <div class=\"p-rank votebox abs v-center\">\n                                <p>\u7968\u6570:<span class=\"number\">" + res.data[5].support_count + "</span></p>\n                            </div>\n                        </div>\n                        <div class=\"item\">\n                            <div class=\"p-rank seven abs v-center\"></div>\n                            <div class=\"p-rank rank-imgbg abs v-center\">\n                                <img src=\"" + res.data[6].headimgurl + "\" alt=\"\">\n                            </div>\n                            <div class=\"p-rank votebox abs v-center\">\n                                <p>\u7968\u6570:<span class=\"number\">" + res.data[6].support_count + "</span></p>\n                            </div>\n                        </div>\n                    </div>\n            ";
            $('.rank-content').html(html);
        } else {
            // msg(res.errMsg);
        }
}

function initSwiper() {
    mySwiper = new Swiper('.swiper-container', {
        speed: 550,
        //loop:true,
        noSwiping: false,
        effect: 'fade',
        fade: {
            crossFade: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                for (var i = 0; i < 7; i++) {
                    window['idol' + (i + 1)].pause();
                    window['idol' + (i + 1)].currentTime = 0;
                }
                openStarMusic(this.activeIndex + 1);
                addClass($('.voice4'),'page-hide');
                $('.ani-voice').removeClass('page-hide');
            }
        }
    });
}

for (var i = 1; i <= 7; i++) {
    window['idol' + i] = document.getElementById('idol' + i);
    window['idol' + i].onended = function () {
        window.isOpenMusic ? openBgm() : closeBgm();
        addClass($('.ani-voice'),'page-hide');
        $('.voice4').removeClass('page-hide')
    };
}

var audio = document.getElementById('bgm');
var draw = document.getElementById('draw');
var tip = document.getElementById('tip');
tip.onended = function () {
    window.isOpenMusic ? openBgm() : closeBgm();
}
document.addEventListener('DOMContentLoaded', function () {
    // audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
        draw.load();
        tip.load();
        for (var _i = 1; _i <= 7; _i++) {
            window['idol' + _i].load();
        }
    }, false);
});

$(".music").on("touchstart", function (e) {
    toggleMusic();
});

window.isOpenMusic = true;
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        $(".music-open").removeClass("page-hide");
        $(".music-close").addClass("page-hide");
        window.isOpenMusic = true;
    } else {
        audio.pause();
        $(".music-open").addClass("page-hide");
        $(".music-close").removeClass("page-hide");
        window.isOpenMusic = false;
    }
}

function closeBgm() {
    audio.pause();
    $(".music-open").addClass("page-hide");
    $(".music-close").removeClass("page-hide");
}

function openBgm() {
    audio.play();
    $(".music-open").removeClass("page-hide");
    $(".music-close").addClass("page-hide");
}

function openStarMusic(id) {
    window['idol' + id].play();
    $('.meet-btn').data('id', id);
    closeBgm();
}

function toggleStarMusic(id) {
    if (window['idol' + id].paused) {
        window['idol' + id].play();
    } else {
        window['idol' + id].pause();
    }
}

function closeMusic(id) {
    window['idol' + id].pause();
}