CORE.createModule ("notesEditView", function (sb) {
	var noteObj,
		editModule,
		title,
		description,
		update; 
		
	//initialize the module
	function init () {
		editModule = sb.find(".editDisplay");
		title = sb.find("input");
		description = sb.find("textarea");
		update = sb.find("button");
		title.value = "";
		description.value = "";
	
		sb.listen({
			"note-edited" : showEdit,
			"update-finish" : hideEdit
		});
		
		//add necessary event handlers
		sb.addEvent(update, "click", updateNote);
		sb.addEvent("#notesEditView", "click", stopPropagation);
		sb.addEvent(document, "click", removeEditPopUp);
	}
	
	//destroy the module
	function destroy () {
		editModule = null;
		title = null;
		description = null;
		update = null;
		
		//remove event handlers
		sb.addEvent(update, "click", updateNote);
		sb.addEvent("#notesEditView", "click", stopPropagation);
		sb.addEvent(document, "click", removeEditPopUp);
	}
	
	//show edit in lightbox
	function showEdit (editObj) {
		noteObj = editObj;
		sb.fadeInView("#notesEditView");
		sb.insertData(editObj.title, title);
		sb.insertData(editObj.description, description);
	}
	
	//remove the lightbox
	function removeEditPopUp (e) {
		sb.stopPropagationOfEvent(e);
		sb.fadeOutView("#notesEditView");
	}
	
	//notify that note has been updated
	function updateNote (e) {
		sb.stopPropagationOfEvent(e);
		var updatedTitle = title.value,
			updatedDescription = description.value;
			updatedNote = {
				id : noteObj.id,
				title : updatedTitle,
				description : updatedDescription
			}
		sb.notify({
			type : "note-updated",
			data : updatedNote
		});
	}
	
	function hideEdit () {
		sb.fadeOutView("#notesEditView");
	}
	
	function stopPropagation (e) {
		sb.stopPropagationOfEvent(e);
	}
	
	//return the necessary API using the Revealing Module Pattern
	return {
		init : init,
		destroy : destroy
	}
});

