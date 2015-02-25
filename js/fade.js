(function($){
    $.fn.extend({
        slider : function(options){
            var wrap = $(this);

            //设置默认值
            var defaults = {
                direction : 'horizontal',//轮播方式
                speed : '300',//轮播速度
                width : null,//轮播图的宽度
                height : null,//轮播图的高度
                easing : 'linear',
                autoPlay : true,//是否自动轮播
                delayTime : '2',//轮播间隔时间
                hideDot : false,//是否隐藏点击按钮
                hideArrow : false,//是否隐藏左右箭头
                fadeInTime : 200,//如果direction是fader的话设置淡出时间
                fadeOutTime : 200//如果direction是fader的话设置淡入时间
            };

            var opts = $.extend(defaults, options || {});

            function CommonV(){
                this.init.apply(this,arguments);
            }

            CommonV.prototype = {
                constructor : CommonV,
                init : function(options){
                    var that = this;
                    this.direction = typeof options.direction === "string" ? options.direction : defaults.direction;
                    this.speed = typeof options.speed === "number" ? options.speed : defaults.speed;
                    this.delayTime = options.delayTime === "number" ? options.delayTime : defaults.delayTime;
                    this.wrapper = wrap;
                    this.timer = null;
                    this.lis = wrap.find("li");
                    this.length = wrap.find("li").size();
                    this.li_width = typeof options.width === "number" ? options.width : this.lis.first().width();
                    this.li_height = typeof options.height === "number" ? options.height : this.lis.first().height();
                    this.easing = typeof options.easing === "string" ? options.easing : defaults.easing;
                    this.autoPlay = typeof options.autoPlay === "boolean" ? options.autoPlay : defaults.autoPlay;
                    this.startIndex = 1;
                    this.hideDot = typeof options.hideDot === "boolean" ? options.hideDot : defaults.hideDot;
                    this.hideArrow = typeof options.hideArrow === "boolean" ? options.hideArrow : defaults.hideArrow;
                    if(!this.hideDot){
                        var ul_focus = $('<ul class="focus"></ul>')
                        var li_focus = "";
                        for(var i=0;i<this.length;i++){
                            li_focus += "<li></li>" ;
                        }
                        ul_focus.append(li_focus);
                        wrap.parent().after(ul_focus);
                        this.Dot = $("ul.focus").find("li") ;
                        $("ul.focus").css("margin-left",-($("ul.focus").width() / 2));
                        this.Dot.first().addClass("active").siblings().removeClass("active");
                    }

                    if(!this.hideArrow){
                        wrap.parent().after($('<i class="prev"></i><i class="next"></i>'));
                        this.next = $("i.next");
                        this.prev = $("i.prev") ;
                        if(this.direction == "horizontal"){
                            wrap.css({
                                "width" : this.li_width * this.length,
                                "height" : this.li_height
                            });
                            this.next.on("click",function(){
                                that.doMove().next("left");
                            });
                            this.prev.on("click",function(){
                                that.doMove().prev("left");
                            });
                        }else if(this.direction == "vertical"){
                            wrap.css({
                                "width" : this.li_width,
                                "height" : this.li_height * this.length
                            });
                            this.next.on("click",function(){
                                that.doMove().next("top");
                            });
                            this.prev.on("click",function(){
                                that.doMove().prev("top");
                            })
                        }else{
                            this.fadeInTime = typeof options.fadeInTime === "number" ? options.fadeInTime : defaults.fadeInTime;
                            this.fadeOutTime = typeof options.fadeOutTime === "number" ? options.fadeOutTime : defaults.fadeOutTime;
                            wrap.removeClass("slider").addClass("slider_fade");
                            this.lis.first().show();
                            this.startIndex = 0;
                            this.next.on("click",function(){
                                that.doMove().fader("next");
                            });
                            this.prev.on("click",function(){
                                that.doMove().fader("prev");
                            })
                        }
                    };
                    if(this.autoPlay){
                        this._doNext = function () {return that.doMove.apply(that)};
                        this._doTop = function () {return that.doMove.apply(that)};
                        this._doFader = function () {return that.doMove.apply(that)};
                        this.mouseMove();
                    }
                },

                doMove : function(){
                    var _this = this;
                    var doNext = function(dir){
                        var li_first = _this.wrapper.find("li:eq(0)");
                        if(!_this.wrapper.is(":animated")){
                            _this.startIndex++;
                            if(_this.startIndex > _this.length) {
                                _this.wrapper.append(li_first);
                                if(dir == "left"){
                                    var current_left = parseInt(_this.wrapper.position().left);
                                    _this.wrapper.css(dir, current_left + _this.li_width);
                                }else{
                                    var current_top = parseInt(_this.wrapper.position().top);
                                    _this.wrapper.css(dir, current_top + _this.li_height);
                                }
                                _this.Dot.eq(0).addClass("active").siblings().removeClass("active");
                            }

                            if(dir == "left"){
                                var current_left = parseInt(_this.wrapper.position().left);
                                var current_shape = current_left - _this.li_width;
                            }else{
                                var current_top = parseInt(_this.wrapper.position().top);
                                var current_shape = current_top - _this.li_height;
                            }

                            if(dir == "left"){
                                _this.wrapper.stop().animate({left: current_shape}, _this.speed, _this.easing ,function() {
                                    dolevelJudge(dir);
                                });
                            }else{
                                _this.wrapper.stop().animate({top: current_shape}, _this.speed, _this.easing ,function() {
                                    dolevelJudge(dir);
                                });
                            }
                            _this.Dot.eq(_this.startIndex-1).addClass("active").siblings().removeClass("active");
                        };

                        function dolevelJudge(ele){
                            if(_this.startIndex > _this.length) {
                                var li_last = _this.wrapper.find("li:eq("+(_this.length-1)+")");
                                _this.wrapper.prepend(li_last);
                                _this.wrapper.css(ele, 0);
                                _this.startIndex = 1;
                            }
                        };
                    };

                    var doPrev = function(dir){
                        var li_last = _this.wrapper.find("li:eq("+(_this.length-1)+")");
                        if(!_this.wrapper.is(":animated")){
                            _this.startIndex--;
                            if(_this.startIndex == 0){
                                _this.wrapper.prepend(li_last);
                                if(dir == "left"){
                                    var current_left = parseInt(_this.wrapper.position().left);
                                    _this.wrapper.css("left", current_left - _this.li_width);
                                }else{
                                    var current_top = parseInt(_this.wrapper.position().top);
                                    _this.wrapper.css("top", current_top - _this.li_height);
                                }
                                _this.Dot.eq(_this.length-1).addClass("active").siblings().removeClass("active");
                            }

                            if(dir == "left"){
                                var current_left = parseInt(_this.wrapper.position().left);
                                var current_shape = current_left + _this.li_width;
                            }else{
                                var current_top = parseInt(_this.wrapper.position().top);
                                var current_shape = current_top + _this.li_height;
                            }

                            if(dir == "left"){
                                _this.wrapper.stop().animate({left : current_shape}, _this.speed, _this.easing, function(){
                                    doUpRightJudge(dir);
                                }) ;
                            }else{
                                _this.wrapper.stop().animate({top : current_shape}, _this.speed, _this.easing, function(){
                                    doUpRightJudge(dir);
                                }) ;
                            }
                            _this.Dot.eq(_this.startIndex-1).addClass("active").siblings().removeClass("active");
                        };

                        function doUpRightJudge(ele){
                            if(_this.startIndex == 0){
                                var li_first = _this.wrapper.find("li:eq(0)")
                                _this.wrapper.append(li_first);
                                if(ele == "left"){
                                    _this.wrapper.css(ele,-((_this.length - 1) * _this.li_width));
                                }else{
                                    _this.wrapper.css(ele,-((_this.length - 1) * _this.li_height));
                                }
                                _this.startIndex = _this.length;
                            }
                        };
                    };

                    var fader = function(dir){
                        if(dir == "next"){
                            _this.startIndex++;
                            if(_this.startIndex == _this.length){
                                  _this.startIndex = 0;
                            }
                            _this.wrapper.find("li")
                              .eq(_this.startIndex)
                              .stop()
                              .fadeIn(_this.fadeInTime)
                              .siblings()
                              .fadeOut(_this.fadeOutTime);
                        }else{
                            if(_this.startIndex == 0){
                                _this.startIndex = _this.length;
                            }
                            _this.startIndex--;
                            _this.wrapper.find("li")
                              .eq(_this.startIndex)
                              .stop()
                              .fadeIn(_this.fadeInTime)
                              .siblings()
                              .fadeOut(_this.fadeOutTime);
                        }
                         _this.Dot.eq(_this.startIndex).addClass("active").siblings().removeClass("active");
                    }

                    if(this.autoPlay){
                        if(_this.direction == "horizontal"){
                            doNext("left");
                        }else if(_this.direction == "vertical"){
                            doNext("top");
                        }else{
                            fader("next");
                        }
                    }
                    return {
                        next : doNext,
                        prev : doPrev,
                        fader : fader
                    };
                },

                mouseMove : function(){
                    var _this = this;
                    wrap.parents("div.demo").hover(function(){
                        if(_this.timer){
                            _this.autoPlay = false;
                            clearInterval(_this.timer) ;
                        }
                    },function(){
                        _this.autoPlay = true;
                        if(_this.direction == "horizontal"){
                            _this.timer = setInterval(function(){
                                _this._doNext();
                            },_this.delayTime * 1000);
                        }else if(_this.direction == "vertical"){
                            _this.timer = setInterval(function(){
                                _this._doTop();
                            },_this.delayTime * 1000);
                        }else{
                             _this.timer = setInterval(function(){
                                _this._doFader();
                            },_this.delayTime * 1000);
                        }
                    }).trigger("mouseleave")
                }
            };
            new CommonV(opts);
        }
      })
})(jQuery)