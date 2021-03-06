/**
 * Created by liyanlong on 16/6/21.
 */
/**
 * @author  : liyanlong
 * @version : 1.0.0
 * @date    : 2016-06-21
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.Puzzle = factory();
    }
}(this, function () {
    function Puzzle(options){
        
        var defaults = {
            container : "#puzzleBox",
            item : ".item",
            itemWidth : 300,
            itemHeight : 300,
            rows : 3,
            column : 2,
            bgImg : "1.png",
            isRandom : true,
            sortArr : null,
            success : function(){}
        }
        
        this.options = this.extend(defaults,options);
        var op = this.options;

        //全局函数
        this.wrap = document.querySelector(op.container);
   
        this.betweenLeft = this.wrap.getBoundingClientRect().left;
        this.betweenTop = this.wrap.getBoundingClientRect().top;
        this.containerW = this.wrap.getBoundingClientRect().width;
        this.containerH = this.wrap.getBoundingClientRect().height; 

        this.isPop = false;
        this.comparison = this.createCompareArr();

        this.init();
    }


    Puzzle.prototype = {
        init : function(){
            this.insertContent();
            this._bind();
            this.creataDragBox();
        },
        extend : function(target,source){
            for(var i in source){
                target[i] = source[i];
            }
            return target;
        },
        sortRandom : function(){
            var op = this.options;

            this.itemList = document.querySelectorAll(op.item);
            var len = this.itemList.length;
            if(len != op.rows*op.column){
                throw new Error("拖动块数有误 请重新检查！");
            }


            
            for (var i = 0; i < len; i++) {
                var bgpX = this.comparison[i].split("")[0]*1 ? -(this.comparison[i].split("")[0]*1*op.itemWidth)+"px" : 0 ;
                var bgpY = this.comparison[i].split("")[1]*1 ? -(this.comparison[i].split("")[1]*1*op.itemHeight)+"px" : 0 ;
                

                this.itemList[i].dataset.num = i+1;
                this.itemList[i].style.cssText = ";background: url("+ op.bgImg +") no-repeat;background-position:" + bgpX + " " + bgpY + ";background-size:" + this.wrap.clientWidth + "px;" + this.itemList[i].style.cssText; 
            };
            var arr = this.arrFomat(this.itemList);  
            if(op.isRandom){
                arr.sort(this.randowsort);
            }else{
                try{
                    for (var i = 0; i < op.sortArr.length; i++) {
                        arr[i] = this.itemList[op.sortArr[i]-1];
                    };
                }catch(e){
                    throw new Error("必须指定自定义的随机序列！");
                }
                
            }
            return arr ;
        },
        insertContent : function(){
            this.saveHtml = this.wrap.innerHTML;
            var op = this.options,
                arr = this.sortRandom(),
                fragment = document.createDocumentFragment();


            for (var i = 0; i < arr.length; i++) {
                fragment.appendChild(arr[i])
            };
            this.wrap.innerHTML = "";
            this.wrap.appendChild(fragment);
            
        },
        arrFomat : function(objList){
            var arr = [];
            var divArr = [].slice.call(objList)
            return divArr;
        },
        _bind : function(){
            for (var i = 0,len = this.itemList.length; i < len; i++) {
                if(this.isMoblie){
                    this.touchDrag(this.itemList[i]);
                }else{

                }
            };
        },
        randowsort : function(a,b){
            return Math.random()>.5 ? -1 : 1;  
        },
        isMoblie : function(){
            return ("ontouchstart" in document) ? true : false;
        },
        touchDrag : function(obj){
            var intX=intY=0,
                op = this.options,
                zdex = obj.style.zIndex,
                prevX,prevY,moveStartIndex,moveEndIndex,touchendLeft,touchendTop,compareX,compareY;


            var _this = this;

            obj.addEventListener("touchstart", function(ev){
                ev.preventDefault();
                var touch = ev.touches[0];
                if(ev.touches.length>1) return;
               
                prevX = obj.offsetLeft;
                prevY = obj.offsetTop;

                intX = touch.pageX - prevX;
                intY = touch.pageY - prevY;

                //添加拖动块 
                _this.drag.style.backgroundPosition = getComputedStyle(ev.target,null)["background-position"];
                _this.drag.style.left = (_this.betweenLeft + prevX) + "px";
                _this.drag.style.top = (_this.betweenTop + prevY) + "px";

                
                moveStartIndex = _this.getIndex(ev.target);
            }, false)


            obj.addEventListener("touchmove", function(ev){
                ev.preventDefault();
                var touch = ev.touches[0];

                if(ev.touches.length>1) return;


                touchendLeft = touch.pageX - _this.betweenLeft;
                touchendTop = touch.pageY - _this.betweenTop;

                _this.drag.style.display =  "block";

                _this.drag.style.left = touch.pageX-intX + _this.betweenLeft + 'px';
                _this.drag.style.top = touch.pageY-intY + _this.betweenTop + 'px';
            }, false)

            obj.addEventListener("touchend", function(ev){
                ev.preventDefault();
                _this.drag.style.display = "none";

                compareX  = compareY = undefined;

                if(touchendLeft == undefined || touchendTop == undefined) return;

                for (var i = 0,len = op.column ; i < len; i++) {
                    if(touchendLeft <= _this.containerW && touchendLeft - op.itemWidth*i>=0 && touchendLeft - op.itemWidth*i < op.itemWidth){
                        compareX = i.toString();
                    }
                };

                for (var i = 0,len = op.rows ; i < len; i++) {
                    if(touchendTop <= _this.containerH && touchendTop - op.itemHeight*i>=0 && touchendTop - op.itemHeight*i < op.itemHeight){
                        compareY = i.toString();
                    }
                };
                var itemList = document.querySelectorAll(op.item);
                var comparXY = compareX + compareY;


                if(compareX == undefined || compareY == undefined){
                    return false;
                }
                _this.comparison.forEach(function(num,i){
                    if(comparXY == num){
                        var bgp = getComputedStyle(itemList[i],null)["background-position"];
                        var dataNum = itemList[i].dataset.num;
                        itemList[i].style.backgroundPosition = getComputedStyle(obj,null)["background-position"];
                        itemList[i].dataset.num = obj.dataset.num;
                        obj.style.backgroundPosition = bgp;
                        obj.dataset.num = dataNum;

                        moveEndIndex = i
                    }   
                })


                var update = _this.updatePuzzle();
                if(!!update){
                    update = false;
                    _this.wrap.style.backgroundImage= "url("+ op.bgImg +")";
                    _this.wrap.style.backgroundRepeat = "no-repeat";
                    for (var i = 0,len=_this.itemList.length; i < len; i++) {
                        _this.itemList[i].classList.add("fadeOut");
                    };
                    _this.createMask();
                    op.success && op.success();
                }

                

                

            }, false)
        },
        getIndex : function(elem){
            return ( elem && elem.parentNode ) ? this.prevAll(elem).length : -1;
        },
        prevAll : function(elem){
            var match = [],
                cur = elem.previousSibling;
            while(cur && cur.nodeTpye != 9){
                if(cur.nodeType == 1){
                    match.push(cur)
                }
                cur = cur.previousSibling
            }
            return match;
        },
        updatePuzzle : function(){
            var op = this.options,
                itemList = document.querySelectorAll(op.item);
            var isSort = true;
            for (var i = 0,len = itemList.length; i < len; i++) {
                if(itemList[i].dataset.num*1 != i+1){
                    isSort = false;
                }
            };
            return isSort;
        },
        restart : function(){
            if (this.mask) {
                this.mask.style.display = "none";
                document.body.removeChild(this.mask);
            };
            
            this.wrap.style.cssText="";
            document.body.removeChild(this.drag);
            
            this.wrap.innerHTML = this.saveHtml;
            // this.insertContent();
            this._bind();
        },
        creataDragBox : function(){
            var op = this.options,
                dragW = this.itemList[0].clientWidth,
                dragH = this.itemList[0].clientHeight;
                
            this.drag = document.createElement("div");
            this.drag.id="drag";
            this.drag.style.cssText = "width:" + dragW + "px;height:" + dragH + "px;position:fixed;background:url("+ op.bgImg +") no-repeat;background-size:640px;opacity:0.7;display:none";
            document.body.appendChild(this.drag);
        },
        createMask : function(){
            var op = this.options,
                maskH = this.wrap.clientHeight + this.betweenTop;
            this.mask = document.createElement("div");
            this.mask.id="mask";
            this.mask.style.cssText = "width:100%;height:" + maskH + "px;position:absolute;top:0;left:0;z-index:100;";
            document.body.appendChild(this.mask);
        },
        createCompareArr : function(){
            var op = this.options,
                arr = [];
            for (var i = 0; i < op.rows; i++) {
                for (var k = 0; k < op.column; k++) {
                    var combineNum = k.toString() + i.toString();
                    arr.push(combineNum);
                };
            };
            return arr;
        }
    }

    return Puzzle;
}));