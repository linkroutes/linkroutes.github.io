(function(root, factory){
	if(typeof define === 'function' && define.amd){
		define([], factory);
	}else{
		root.Printer = factory(root);
	}
}(this, function(root){
	var Printer = {};
	Printer.printer = {"version": "0.0.1"};
	var init_options = {
		"speed" : 150,		//文字的速度
		"selector" : 'canvas',		//要打印到的标签的ID
		"startIndex" : 0,		//从第几个字符开始打印
		"endIndex" : 0,		//打印到第几个字符结束
		"hasCur" : true,		//是否有光标
		"curId" : 'cur',		//光标的ID
		"curStr" : '_',		//光标字符
		"curStyle" : 'font-weight: bold;',	//光标的样式（CSS样式）
		"curSpeed" : 100,		//光标的速度（ms）
		"lnStr": ""
	};



	var str = "", options = init_options;
	var flwCurTimer, dom, curObj, reStr='', curSwitch,index=0;

	Printer.init = function(arg_str, arg_options){
		str = arg_str;
		for( var option in arg_options ){
			options[option] = arg_options[option];
		}
		dom = document.getElementById(options.selector);
		index = options.startIndex;
		options.endIndex = options.endIndex == 0 ? str.length : options.endIndex
		options.hasCur && flwCur();
		return this;
	}


	Printer.print = function(cb){	//打印函数
		for(var i=0; i<str.length; i++) {
			(function(index){
				setTimeout(function(){
					if (str.charAt(index) === '\n'){
						reStr += '<br>' + options.lnStr;
					} else {
						reStr += str.charAt(index);
					}
					dom.innerHTML= options.lnStr + reStr
				}, options.speed * (index + 1))
			})(i);
		}

		setTimeout(function(){
			if(options.hasCur){
				var element = document.createElement("span");
				element.id = options.curId
				dom.appendChild(element);

				curObj = document.getElementById(options.curId);
				clearTimeout(flwCurTimer);
				setInterval(chCur, options.curSpeed);
			}
			cb && cb();
		}, options.speed * str.length)
	}

	function flwCur(){	//跟随光标
		dom.innerHTML += '<span id="'+options.curId+'" style="'+options.curStyle+'">'+options.curStr+'</span>';
		flwCurTimer = setTimeout(flwCur, 1.5 * options.speed);
	}

	function chCur(){	//闪烁光标
		curObj.innerHTML =  options.curStr ;
		curObj.style.visibility = curSwitch ? 'visible':'hidden';
		curSwitch = !curSwitch
	}

	return Printer;
}));

