var sandbox = {
	create : function (core, moduleSelector) {
	
		//make a sandbox container for each module
		var CONTAINER = core.dom.query("#" + moduleSelector);
		
		//return necessary API using Module Pattern
		return {
			find : function (tagName, context) {
				if(context){
					return core.dom.query(tagName, context);
				}
				return core.dom.query(tagName,CONTAINER);
			},
			addEvent : function (element, event, callback){
				core.dom.bind(element, event, callback);
			},
			removeEvent : function (element, event, callback){
				core.dom.unbind(element, event, callback);
			},
			notify : function (event) {
				if(core.isObj(event) && event.type){
					core.triggerEvent(event);
				}
			},
			listen : function (events) {
				if(core.isObj(events)){
					core.registerEvents(events, moduleSelector);
				}
			},
			attachChild : function (child, parent) {
				return core.dom.attach(child, parent);
			},
			createTag : function (tagName, options, element) {
				return core.dom.create(tagName, options, element);
			},
			removeChild : function (child, parent){
				return core.dom.remove(child, parent);
			},
			cloneEl : function (element){
				return core.dom.cloneEl(element);
			},
			findParentLi : function (element, parent){
				return core.dom.parentLi(element, parent);
			},
			updateContent : function (selector, text){
				return core.dom.updateContent(selector, text);
			},
			fadeInView : function (view, element){
				return core.dom.fadeInView(view, element);
			},
			insertData : function (data, view){
				return core.dom.insertData(data, view);
			},
			fadeOutView : function (view, element){
				return core.dom.fadeOutView(view);
			},
			stopPropagationOfEvent : function (event) {
				return core.dom.stopPropagationOfEvent(event);
			},
			persist : function (object) {
				return core.persistInStorage(object);
			},
			getPersistedNotes : function () {
				return core.getFromStorage();
			},
			validate : function (selector) {
				return core.validate(selector);
			},
			showError : function (selector) {
				return core.showError(selector);
			},
			removeError : function (selector) {
				return core.removeError(selector);
			}
		};
	}
}