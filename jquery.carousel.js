/**
 * @include jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 */
jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/**
 * jQuery.carousel
 * More information: https://github.com/aobo711/jQuery-Carousel
 * 
 * Open source under the BSD License
 * Copyright © 2010 zjtian711@gmail.com
 * 
 * This is a jQuery animation plugin that focus on carousel effects,
 * especialy for banner showcases, it use changing opacity smoothly
 * as default effect, and supports any other effects by customer function
 * 
 */
(function($) {
	$.extend($.fn, {
		carousel : function(setting) {	
			//merge config
			var config = this.config = $.extend({
					itemContainer : "#itemContainerId" ,				//carousel contents wrapper
					prevBtn : "#prevBtnId" ,							//forward and up buttons id
					nextBtn : "#nextBtnId" ,							//backward and down buttons id
					prevDisableClass : "prev-disable",					//available forward and up buttons class
					nextDisableClass : "next-disable",		            //unavailable forward and up buttons class
					autoScroll : true ,									//auto play animation
					defaultIndex : 0,									//the default animation index, starting from 0
					delayTime : 6000 ,									//animation interval events, the number of milliseconds
					animTime : 500 ,									//animation execution time 
					navTriggerTime : 200,								//the animation triggered by switching navigation
					orientation : "left" ,								//The direction of animation,up|down|left|right
					scrollCount : 1 ,									//animation steps 
					showCount : 5 ,										//The amount of content displayed on the screen
					useNav : false,										//Whether to use the navigation small button,configuration through a custom HTML generator{navHTMLBuilder} 
					navCurrentClass : "current",						//Current navigation buttons classname
					navContainer : "#navContainerId",					//navigation dom id
					navEvent : "mouseover",								//navigation trigger event
					easeEffect : "swing",								//default animation effect
					customChange : defaultChange,						//custom switching function
					customInit : null,									//switching function of the initialization function defined
					btnNav : false,										//whether to use the navigation buttons
			}, setting || {}),
			
			self = this,
			
			//start main functions
			//initialization
			wrapper = self.css("position","relative") ,
			itemContainer = $(config.itemContainer,self).css("position","relative"),
			items = self.items = itemContainer.children(),
			nav = $(config.navContainer) ,
			navItems = [],
			count = items.length,
			singleHeight = $(items[0]).outerHeight(),
			singleWidth = $(items[0]).outerWidth(),	
			prevBtn = $(config.prevBtn),
			nextBtn = $(config.nextBtn),
			animParams = self.animParams = {
				left : { relatedProp : "left" ,opposite :"right"},
				right : { relatedProp : "left" , opposite :"left"},
				top : { relatedProp : "top" , opposite :"bottom"},
				bottom : { relatedProp : "top" , opposite :"top"}
			};
			self.index = config.defaultIndex;
			if(config.customInit){
				config.customInit.call(self);
			}	
			self.changeTo = function(i){
				if(!checkIndex(config.orientation,i) || self.stopFlag){
					return;
				}
				if(self.index == i && i!= 0) return;
				i = i >= count ? 0 : i ;
				config.customChange.call(self,i,arguments[1]);
				navTo(i);
				refreshNavBtn(i);
			};
			if(animParams[config.orientation].relatedProp === "left"){
				itemContainer.css("width" , singleWidth * count ? (singleWidth * count + "px") : "auto");
				items.css("float","left");
			}else {				
				itemContainer.css("height" , singleHeight * count ? (singleHeight * config.count + "px") : "auto");
			}
			
			if(nav.length == 0 & config.useNav){
				nav = buildNav();
				navItems = nav.children();				
			}
			self.changeTo(config.defaultIndex);
			
			navTo(self.index);
			//end initialization
			refreshNavBtn(self.index);
			
			//live events
			if(navItems.length != 0){
				navItems.bind(config.navEvent ,function(){
					var navItem = this,
						index = parseInt(navItem.id.replace(config.navContainer + "-",""));
						self.changeTo(index,1);
				}).bind("mouseover",function(){
					self.stopFlag = 1;
				}).bind("mouseout",function(){
					self.stopFlag = 0;	
				});
			}
			itemContainer.bind("mouseover",function(){
				self.stopFlag = 1;
			}).bind("mouseout",function(){
				self.stopFlag = 0;
			});
			
			if(config.btnNav){
				prevBtn.bind("click" , function(){
					if(this.className.indexOf(config.prevDisableClass) >= 0) return;
					var prevIndex = calIndex(self.index,1);
					self.changeTo(prevIndex);
					refreshNavBtn(prevIndex);
				});
				nextBtn.bind("click" , function(){
					if(this.className.indexOf(config.nextDisableClass) >= 0) return;
					var nextIndex = calIndex(self.index,0);
					self.changeTo(nextIndex);
					refreshNavBtn(nextIndex);
				});
			}
			
			//bind auto scroll
			if(config.autoScroll){
				var interval = setInterval(function(){
					self.changeTo(calIndex(self.index,true));
				},config.delayTime);
			}
			//end live events
			
			function buildNav(){
				var c = self.config, a =[],b =[];
				c.navContainer = c.navContainer.replace("#","");
				for(var x = 0;x < count;x++){
					a.push("<a href=\"javascript:void(0)\" "+ (x > count - c.showCount ? "class=\"unreachable\"" : "") + " id=\"" + config.navContainer + "-" + x +"\">"+ (x + 1)+ "</a>");
				}
				var nav = $("<div></div>").attr("id",c.navContainer).css("position","absolute").html(a.join(""));
				wrapper.append(nav);
				return nav;
			}
			
			
			function navTo(i){
				if(nav.length == 0) return;
				navItems.eq(self.index).removeClass(config.navCurrentClass);
				navItems.eq(i).addClass(config.navCurrentClass);
				self.index = i;
			};
			
			function defaultChange(i){
				if( self.stopFlag) {return 0;}
				var parmas = animParams[config.orientation],
					scrollLength = parmas.relatedProp === "left" ? singleWidth : singleHeight,
					propertyTo = 0 - i * scrollLength,
					animTime = arguments[1] ? config.navTriggerTime : config.animTime;
					
				var animProperty = parmas.relatedProp === "left" ?{ left: propertyTo }: {top : propertyTo};
				itemContainer.stop();
				itemContainer.animate(animProperty , animTime,config.easeEffect);
			}
			
			function calIndex(i,flag){
				var s = parseInt(config.scrollCount);
				if(flag){
					return clearIndex(parseInt(i)+ s > count -1 ? 0 : parseInt(i)+ s );
				}else{
					return clearIndex(i - s);
				}
			}
			
			//reset the index within a permissible range
			function clearIndex(index){
				return	index >= count - config.showCount ? count - config.showCount  : (index < 0 ? 0 : index);		
			}
			
			//check if it needs to play animation
			function checkIndex(o,index){
				return count - index >= config.showCount && index >= 0 && index !== self.index;
			}
			function refreshNavBtn(index){
				var c =this.config,t=this;
				if(index == 0){
					nextBtn.addClass(config.nextDisableClass);
				}else{
					nextBtn.removeClass(config.nextDisableClass);
				}
				if(index == (count - config.showCount)){			
					prevBtn.addClass(config.prevDisableClass);
				}else{					
					prevBtn.removeClass(config.prevDisableClass);
				}
			}
			//end main functions
			return self;
		}
	}); 
})(jQuery);


/**
 * some carousel effect functions
 */
function opacityChange(i){
	var self = this, 
		animParams = self.animParams,
		config = self.config;
	if( self.stopFlag) {return 0;}
		animTime = arguments[1] ? config.navTriggerTime : config.animTime,
		currentItem = $(self.items[self.index]),
		targetItem = $(self.items[i]);
	
	currentItem.css({zIndex: 1});
//	currentItem.stop().animate(
//		{opacity : 0}, animTime*0.5 , config.easeEffect		
//	).css({zIndex: 1});
	targetItem.stop().animate(
		{opacity : 1}, animTime , config.easeEffect	,function(){
			currentItem.css({opacity : 0});
		}	
	).css({zIndex : 2});
}
function opacityInit (){
	var self = this;
	self.items.css({
		position: "absolute",
		zIndex: 1 ,
		opacity : 0
	});
	$(self.items[self.config.defaultIndex]).css({
		opacity : 1,
		zIndex : 2
	});
}

