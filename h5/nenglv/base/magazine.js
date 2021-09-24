
var Magazine
$(document).ready(function(){


Magazine = (function(a_option){
	window.onorientationchange = function(){
		var a = "_orientation="+Math.abs(window.orientation);
		window.location.assign(window.location.href.replace("_orientation="+parseAppMsg("_orientation"),a=="_orientation=90"?"_orientation=90":"_orientation=0"));
	};
	function M(){};
	M.prototype = {
		/**
		* to do:parse the meassage in url setting by app .
		* param string param name .
		* return null or string value .
		*/
		parseAppMsg: function(a_sParamName){
			var reg = new RegExp("(^|\\?|&)"+ a_sParamName +"=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
			return "";
		},
		callApp : function (a_str){window.location.href = a_str;}
		,
		addEvent: function(a_sEventType, a_fCallback){
			var _self = this;
			if( _self[a_sEventType] ){
				_self[a_sEventType].append(a_fCallback);
			}else{
				_self[a_sEventType] = [a_fCallback];
			}
		},
		trigger: function(a_sEventType){
	      try{
	      var _arguments = arguments

	      var _self = this;
	      _self[a_sEventType].forEach(function(a_fCallback){
	        if(1<_arguments.length){
	          // alert(3)
	          _arguments = [].slice.call(_arguments)
	      	console.log(_arguments)
	          _arguments.shift()
	      	// console.log(a)
	          a_fCallback.apply(window,_arguments)
	        }else{
	          a_fCallback();
	        }
	      });
	      }catch(e){
	          return 1;
	      }
    },
		initScroller : function(){
			if(iScroll){
				var _aScroller = [];
				var _temp;
				$(".contentScroller").each(function(a_n,el){
					_aScroller[a_n] = new iScroll(el);
				});
				return _aScroller;
			}
		},
		initButton: function(){
			var that=this;
			var _temp;
			$(".button").each(function(a_n,a_el){
				$(a_el).tap(function(e){
					var e = window.event;
					if(e.target.getAttribute('data-href')){
					     that.callApp( e.target.getAttribute('data-href'))
					}
					e.preventDefault();
					e.stopPropagation();
					})
			});
			return false;
		},
		removeAnimation: function(){

		},
		releaseImage: function(a_img, a_delay){
			a_img.parentNode.removeChild(a_img);
			a_img.src='data:image/gif;base64,'+'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
			window.timeout(function() {a_img = null;}, (a_delay || 60000) );
		},
		replaceImageIn: function(){
			var _self = this;
			$(".tempImage").each(function(a_n,a_e){
				var _img = document.createElement("img");
				a_e.parentNode.replaceChild(_img,a_e);
				$(_img).attr("src",$(a_e).attr("data-src") );
			});
		},
		replaceImageOut: function(a_img){
			if(!a_img){console.error("can't find the image for release!");return false;}
			var _self = this;
			var _div = document.createElement("div");
			var _$div = $(_div);
			_$div.attr("data-src",a_img.src);
			_$div.addClass("tempImage");
			a_img.parentNode.replaceChild(_div,a_img);
			//_self.releaseImage(a_img);
		}
	}
	var m = new M();
	m.initButton();// ¶Ô°´Å¥½ûÖ¹µ¯³öipad²Ëµ¥
	m._ORIENTATION = m.parseAppMsg("_orientation")=="90"?"landscape":"portrait";
	m._debug = m.parseAppMsg("debug");
	$(document.body).tap(function(e){
		//alert("show menu");
		if(m._debug ){
			alert("show menu");
			//m.replaceImageIn();
		} else if (window.location.href.match("machine")) { m.callApp("http://PassOnClickEvent"); }
	});
	// handling the localShare
	var shortLink=m.parseAppMsg("shortLink");
	if(shortLink){
		var shareTitle=document.querySelector("title").innerText || "PChouse家居杂志";
		var id=location.href.split("Newsstand/")[1].split("/article-")[0] || 0;
		var articleId=location.href.split("/article-")[1].split("/html-")[0] || 0;
		var shareUrl=shortLink.match("http") ? shortLink : "http://coin.pchouse.com.cn/s/"+shortLink;
		window.app = {
		    localShare: function() {
		        window.location.href = 'appLocalShare:?title='+ shareTitle + '&url='+shareUrl;
		    }
		};
	}
	function _appendLink(a_sSrc, a_sClass){
		var _Link = document.createElement("link");
		_Link.setAttribute("rel","stylesheet");
		_Link.setAttribute("type","text/css");
		_Link.className = a_sClass;
		if(a_sClass){
			_Link.setAttribute("data-href",a_sSrc);
		}else{
			_Link.href = a_sSrc;
		}
		document.head.appendChild(_Link);
	}
	if( a_option.orientation ){
		//_appendLink(m._ORIENTATION+"/css/layout.css")
		_appendLink(m._ORIENTATION+"/css/animation.css", "animation")
	}
	//console.info("magazine option:");
	//console.dir(a_option);
	return m;



})({orientation:1})

})


function getJson(a_sUrl,a_sCallback){
		console.log("-----------")
		var _script = document.createElement("script");
		_script.type="text/javascript";
		_script.src=a_sUrl+"?callback="+a_sCallback;
		document.getElementsByTagName("head")[0].appendChild(_script);
}
var parseJson;
function initAD(a_$dom,a_sUrl,a_id,a_callback){
	var _$dom = a_$dom;
	if(window.navigator.onLine){
		getJson(a_sUrl,"parse")
		/*$.get(a_sUrl,function(a_json){
			alert(a_json)
			var _json = JSON.parse(a_json);
			a_$dom.addClass("AD")
				.attr("data-vc",_json["test.test3."].ads["vc-uri"])
				.attr("data-cc",_json["test.test3."].ads["cc-uri"])
		})*/
		parseJson = function(a_json){
			_$dom.addClass("AD")
				.attr("data-vc",a_json[a_id].ads[0]["vc-uri"])
				.attr("data-cc",a_json[a_id].ads[0]["cc-uri"])
				.attr("data-ctUri",a_json[a_id].ads[0]["ct-uri"])
			if(a_callback){
				a_callback();
			}
		}
	}else{

	}
	a_$dom.sendEvent = function(a_sEvent){
		if(window.navigator.onLine){
			if("cc"===a_sEvent && a_$dom.attr("data-ctUri")){
				window.location.href = a_$dom.attr("data-cc")+"&useParam&url="+escape(a_$dom.attr("data-ctUri"))+"#CustomBrowser";
			}else{
				var _img = new Image();
				//alert("data-"+a_sEvent+" is:"+a_$dom.attr("data-"+a_sEvent))
				_img.src = a_$dom.attr("data-"+a_sEvent);
				//document.getElementsByTagName("body")[0].appendChild(_img);
			}
		}else{
			try{
				var _nOffLine = parseInt(localStorage.getItem(a_$dom.attr("data-"+a_sEvent)|| 0 ));
				localStorage.setItem(a_json[a_sEvent], _nOffLine++);
			}catch(error){
				//$.get("")
			}
		}
	}
}
