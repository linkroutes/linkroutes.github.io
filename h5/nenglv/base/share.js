"use strict";

var data={
	title: "测测你是几分好男人",
	desc: "事业优秀的你，对家人能做到几分呢？我拿到了"+shareScore+"分，PK看看谁是better man！",
	link: "http://www1.pchouse.com.cn/magazine/pcyidong/mag/171023nenglv/index.html",
	imgUrl: "http://www1.pchouse.com.cn/magazine/pcyidong/mag/171023nenglv/images/shareImg.jpg",
	timeLineTitle:"测测你是几分好男人",
	success:function(){
		_czc.push(﻿["_trackEvent","能率171023","分享成功"]);
	},
};
function setShare(){
	// alert(shareScore)
    function shareInit(shareData){
	    wxApi.init(function () {
	        wx.onMenuShareAppMessage({
	            title: shareData.title,
	            desc: shareData.desc,
	            link: shareData.link,
	            imgUrl: shareData.imgUrl,
	            success:function(res){
	                // shareDone(res);
	                shareData.success();
	            }
	        });// 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareTimeline({
	            title: shareData.timeLineTitle,
	            link: shareData.link,
	            imgUrl: shareData.imgUrl,
	            success:function(res){
	                // shareDone(res);
	                shareData.success();
	            }
	        });// 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareQQ(shareData);// 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareWeibo(shareData);// 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
	    });
	}
	shareInit({
	    title: data.title,
	    desc: data.desc,
	    timeLineTitle:data.timeLineTitle,
	    link: data.link,
	    imgUrl: data.imgUrl,
	    success:data.success
	});
    setShareInfo({
        title: data.title,
        summary: data.desc,
        pic: data.imgUrl,
        url: data.link
    });

};
setShare();