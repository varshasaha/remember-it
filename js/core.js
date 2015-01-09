var CORE = (function () {
	var moduleData = {};
		
	//creating specific modules
	function createModule (moduleSelector, creator) {
		var temp;
		if(typeof moduleSelector === "string" && typeof creator === "function"){
			temp = creator(sandbox.create(this, moduleSelector));
			if(temp.init && temp.destroy && typeof temp.init === "function"){
				moduleData[moduleSelector] = {
					create : creator,
					instance : null
				};
				temp = null;
			}
		}
	}
	
	//start module with a specific id
	function start (moduleSelector) {
		var module = moduleData[moduleSelector];
		
		//use Singleton Pattern , if instance exists, return that
		if(module && !module.instance){
			module.instance = module.create(sandbox.create(this, moduleSelector));
			
			//call initialize method
			module.instance.init();
		}
	}
	
	//start all modules
	function startAll () {
		var moduleId;
		for (moduleId in moduleData){
			if(moduleData.hasOwnProperty(moduleId)){
				this.start(moduleId);
			}
		}
	}
	
	//stop module with specific id
	function stop (moduleSelector) {
		var module = moduleData[moduleSelector];
		if(module && module.instance){
			module.instance.destroy();
			module.instance = null;
		}
	}
	
	//stop all modules
	function stopAll () {
		var moduleId;
		for(moduleId in moduleData){
			if(moduleData.hasOwnProperty(moduleId)){
				this.stop(moduleId);
			}
		}
	}
	
	//trigger events
	function triggerEvent (event) {
		var moduleId;
		for(moduleId in moduleData){
			if(moduleData.hasOwnProperty(moduleId)){
				var propertyValue = moduleData[moduleId];
				if(propertyValue.events && propertyValue.events[event.type]){
					propertyValue.events[event.type](event.data);
				}
			}
		}
	}
	
	//register events with modules
	function registerEvents (events, moduleSelector) {
		var module = moduleData[moduleSelector];
		if(module){
			module.events = events;
		}
	}
	
	//check if element is an object
	function isObj (obj) {
		return $.isPlainObject(obj);
	}
	
	//return the necessary API using Revealing Module Pattern
	return {
		createModule : createModule,
		start : start,
		startAll : startAll,
		stop : stop,
		stopAll : stopAll,
		triggerEvent  : triggerEvent,
		registerEvents : registerEvents,
		
		//DOM specific functionalities
		dom : {
			query : function (selector, context) {
				var ret;
				if(context){
					ret = $(context).find(selector);
				}
				else{
					ret = $(selector);
				}
				return ret.get(0);
			},
			bind : function (element, event, callback) {
				if(event){
					$(element).on(event,callback);
				}
			},
			unbind : function (element, event, callback) {
				if(event){
					$(element).off(event,callback);
				}
			},
			attach : function (child, parent) {
				$(parent).append($(child));
			},
			remove : function (selector) {
				$(selector).remove();
			},
			create : function (tagName, options, element){
				var el = document.createElement(tagName),
					option;
				if(options){
					for(option in options){
						el[option] = options[option];
					}
				}
				if(element){
					el.textContent = element.title;
					if(element.description){
						el.attributes["data-description"] = element.description;
					}
				}
				if(tagName === 'li'){
					var colors = ['#F6CEE3', '#F3F781', '#CEE3F6','#BCF5A9','#ECCEF5','#F6E3CE'];
					var randomColor = colors[Math.floor(Math.random() * colors.length)];
					el.style.background = randomColor;
				}
				return el;
			},
			cloneEl : function (element) {
				return $(element).clone(true);
			},
			parentLi : function (element, parent) {
				return $(element).parents(parent).get(0);
			},
			updateContent : function (selector, text) {
				var el = $(selector).get(0);
				el.textContent = text;
				return el;
			},
			fadeInView : function (view) {
				var lb = $('.lightbox:eq(0)')
					.clone(true)
						.append($(view))
							.appendTo('body')
								.end()
									.fadeIn("slow");
				$(view).show();
			},
			insertData : function (data, view) {
				view.value = "";
				view.textContent = "";
				view.value = data;
				return view.textContent = data;
			},
			fadeOutView : function (view) {
				$('.lightbox').fadeOut("slow");
				$(view).hide();
			},
			stopPropagationOfEvent : function (e) {
				e.stopPropagation();
			}
		},
		isObj : isObj,
		persistInStorage : function (obj) {
			window.localStorage.setItem("notes",JSON.stringify(obj));
		},
		getFromStorage : function () {
			return JSON.parse(window.localStorage.getItem("notes"));
		},
		validate : function (selector) {
			return !!selector.value;
		},
		showError : function (selector) {
			$(selector).addClass("redBorder");
			$(".required").fadeIn("slow");
		},
		removeError:function (selector) {
			$(".required").fadeOut("slow");
			$(selector).removeClass("redBorder");
		}
		
	}; 
})();