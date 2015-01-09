CORE.createModule ("notesModel", function (sb) {
	var note,
		uniqueIdCounter = 0,
		uniqueId = "";
		
	//custom id generator
	function generateId () {
		uniqueId = "note" + uniqueIdCounter;
		uniqueIdCounter++;
	}
	
	//Note Constructor
	function Note (id, title, description){
		this.id = id;
		this.title = title;
		this.description = description;
	}
	
	//add edit functionality in individual notes
	Note.prototype.edit = function (editedObj) {
		this.title = editedObj.title;
		this.description = editedObj.description;
	}
	
	//initialize the module
	function init () {
		sb.listen({
			"create-note" : createNote
		});
	}
	
	//destroy the module
	function destroy () {
		note = null;
		uniqueIdCounter = 0;
		uniqueId = "";
	}
	
	//create note using Constructor Pattern 
	function createNote (data) {
		var title = data.title,
			desc = data.description;
		
		generateId();
		
		var newNote = new Note(uniqueId, title, desc);

		sb.notify({
			type : "note-created",
			data : {noteObj:newNote}
		});		
	}
	
	//return the necessary API using Revealing Module Pattern
	return {
		init : init,
		destroy : destroy
	}
});
