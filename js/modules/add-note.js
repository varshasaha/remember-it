CORE.createModule("addNoteModule", function (sb) {
	var title,
		noteDesc,
		saveButton;
	
	//initialize the module
	function init () {
		title = sb.find("input");
		noteDesc = sb.find("textarea");
		title.value = "";
		noteDesc.value = "";
		saveButton = sb.find("button");
		sb.addEvent(saveButton, "click", addNote);
	};
	
	//destroy the module
	function destroy () {
		sb.removeEvent(saveButton, "click", addNote);
		title = null;
		noteDesc = null;
		saveButton = null;
	}
	
	//on save press
	function addNote(e){
		sb.stopPropagationOfEvent(e);
		
		//validate for title
		if (sb.validate(title)) {
			sb.removeError(title);
			var noteObj = {
				title : title.value,
				description : noteDesc.value
			};
		
			//notify the sandbox that a save event has been performed
			sb.notify({
				type : "create-note",
				data : noteObj
			});
		}
		else {
			sb.showError(title);
		}
	}
	
	//return the necessary API using Revealing Module Pattern
	return {
		init : init,
		destroy : destroy
	};
});
