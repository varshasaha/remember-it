CORE.createModule ("notesView", function (sb) {
	var noteList = {},
		noteEl,
		listEl,
		editDeleteEl,
		editButton,
		deleteButton;
		
	//initialize the module
	function init () {
		listEl = sb.find("ul");
		editDeleteEl = sb.find("div");
		sb.listen({
			"note-created" : newNote,
			"note-updated" : updateNote
		});
		
		//find notes from local storage (if any)
		if(sb.getPersistedNotes()){
			noteList = sb.getPersistedNotes();
			Object.keys(noteList).forEach(function (id) {
				var note = noteList[id];
				attachNote(note);
			});
		}
		
	}
	
	//destroy the module
	function destroy () {
		listEl = null;
		editDeleteEl = null;
	}
	
	//add new Note and persist in local storage
	function newNote (note) {
		noteList[note.noteObj.id] = note.noteObj;
		sb.persist(noteList);
		attachNote(note.noteObj);
	}
	
	//note format
	function createNoteFormat (noteObj,parent) {
		descriptionDiv = sb.createTag("div", {className:"noteDescription"}, {title : noteObj.description});
		var clonedEditDeleteDiv = sb.cloneEl(editDeleteEl);
		sb.attachChild(clonedEditDeleteDiv, parent);
		sb.attachChild(descriptionDiv, parent);
		deleteButton = sb.find(".deleteNote", parent);
		editButton = sb.find(".editNote", parent);
		
		//add necessary event handlers
		sb.addEvent(deleteButton,"click", deleteNote);
		sb.addEvent(editButton,"click", editNote);
		sb.addEvent(parent,"click", displayNote);
	}
	
	//notify that a note item has been clicked
	function displayNote (e) {
		sb.stopPropagationOfEvent(e);
		var noteObj = noteList[e.currentTarget.id];
		sb.notify({
			type : "view-note",
			data : noteObj
		});
	}
	
	//attach note to the list
	function attachNote (noteObj) {
		noteEl = sb.createTag("li", {id:noteObj.id}, noteObj);
		createNoteFormat(noteObj, noteEl);
		sb.attachChild(noteEl, listEl);
	}
	
	//detach note from the list
	function detachNote (noteId) {
		sb.removeChild('#' + noteId);
	}
	
	//update note object and notify that the collection has been updated
	function updateNote (noteObj) {
		noteList[noteObj.id] = noteObj;
		sb.persist(noteList);
		var el = sb.updateContent("#" + noteObj.id, noteObj.title);
		createNoteFormat(noteObj, el);
		sb.notify({
			type : "update-finish"
		});
	}
	
	//notify that edit note has been pressed
	function editNote (e) {
		sb.stopPropagationOfEvent(e);
		var editedEl = sb.findParentLi(e.target, "li");
		var editObj = noteList[editedEl.id];
		sb.notify({
			type : "note-edited",
			data : editObj
		});
	}
	
	//delete note from the collection
	function deleteNote (e) {
		sb.stopPropagationOfEvent(e);
		var deletedEl = sb.findParentLi(e.target, "li");
		delete noteList[deletedEl.id];
		sb.persist(noteList);
		detachNote(deletedEl.id);
	}
	
	//return the necessary API using Revealing Module Pattern
	return {
		init : init,
		destroy : destroy
	}
});