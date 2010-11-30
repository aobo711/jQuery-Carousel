
jQuery.extend( jQuery.easing,
{
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
	}
});

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
	currentItem.stop().animate(
		{opacity : 0}, animTime*0.5 , config.easeEffect		
	).css({zIndex: 1});
	targetItem.stop().animate(
		{opacity : 1}, animTime , config.easeEffect		
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

