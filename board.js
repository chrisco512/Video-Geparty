//board.js
// think of these as includes
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The board object is meant to store functions that deal with the question and answer sets
for each game.  It retrieves questions from the server, returns questions from the current
game's question/answer set, and tracks which questions on the grid have already been asked
each round so that the printer object can properly display the grid.
*/

/*attributes to be implemented
	NOTE: board attributes should be stored in shared state object
end attributes */

/* functions to be implemented
	-removeFromGrid( gridNum ) --function updates shared state so that printer object will not show questions already presented
end functions */

//TODO: function needs to be expanded to incorporate database code, also a for loop that runs through and stores each
//question, answer, and category in the shared state according to proper naming convention.  
board.setBoard = function() {
	for(var i = 0; i < 6; i++){
		var newCategory = "Test Cat" + i;
		gapi.hangout.data.setValue("cat"+i, newCategory);
		for(var j = 0; j < 5; j++){
			var newAnswer = "Test Cat" + i + " A" + j;
			var newQuestion = "Test Cat" + i + " Q" + j;
			gapi.hangout.data.setValue( "cat" + i + "_a" + j, newAnswer );
			gapi.hangout.data.setValue( "cat" + i + "_q" + j, newQuestion );
		}
	}	
};

//pulls question from shared state object
//TODO: implement a parameter(s) that represents the question id according to naming conventions in the shared state
board.getQuestion = function() {
	var cat = gapi.hangout.data.getValue("currentCat");
	var q = gapi.hangout.data.getValue("currentQ");
	return (gapi.hangout.data.getValue( "cat"+cat+"_q"+q ));
};
//get answer from shared state
//TODO: implement a parameter(s) that represents the answer id according to naming conventions in the shared state
board.getAnswer = function() {
	var cat = gapi.hangout.data.getValue("currentCat");
	var a = gapi.hangout.data.getValue("currentQ");
	return (gapi.hangout.data.getValue( "cat"+cat+"_a"+a ));
};
//TODO: implement parameters that rep the cat id according to naming conventions
board.getCategory = function( catNum ) {
	if( catNum < 6 && catNum >= 0 )
		return( gapi.hangout.data.getValue( "cat" + catNum ) );
	else
		console.log("ERROR: Category number out of range.");
};
