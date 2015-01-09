CORE.createModule ("displayNote", function (sb) {
	var titleBar,
		descriptionArea;
		
	//initialize the module
	function init () {
		titleBar = sb.find("span");
		descriptionArea = sb.find("div");
		sb.listen({
			"view-note" : showNote
		});
		
		//set necessary event handlers
		sb.addEvent("#displayNote", "click", stopPropagation);
		sb.addEvent(document, "click", removeDisplayPopUp);
	}
	
	//destroy the module
	function destroy () {
		titleBar = null;
		descriptionArea = null;
		
		//remove event handlers
		sb.removeEvent("#displayNote", "click", stopPropagation);
		sb.removeEvent(document, "click", removeDisplayPopUp);
	}
	
	//display note in lightbox
	function showNote (noteObj) {
		sb.fadeInView("#displayNote");
		sb.insertData(noteObj.title, titleBar);
		sb.insertData(noteObj.description, descriptionArea);
	}
	
	function stopPropagation (e) {
		sb.stopPropagationOfEvent(e);
	}
	
	//remove the lightbox
	function removeDisplayPopUp (e) {
		sb.stopPropagationOfEvent(e);
		sb.fadeOutView("#displayNote");
	}
	
	//return necessary API using Revealing Module Pattern
	return {
		init : init,
		destroy : destroy
	}
});

//Start all modules at the end
CORE.startAll();