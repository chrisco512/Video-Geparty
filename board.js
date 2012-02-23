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
	var newAnswer = "Wes Cherry developed the version of this card game for one that came with Windows 95";
	var newQuestion = "What is Solitaire?";
	gapi.hangout.data.setValue( "cat3_a0", newAnswer );
	gapi.hangout.data.setValue( "cat3_q0", newQuestion );
};
//pulls question from shared state object
//TODO: implement a parameter(s) that represents the question id according to naming conventions in the shared state
board.getQuestion = function( /* question id var */ ) {
	return (gapi.hangout.data.getValue( "cat3_q0" ));
};
//get answer from shared state
//TODO: implement a parameter(s) that represents the answer id according to naming conventions in the shared state
board.getAnswer = function( /* answer id var */ ) {
	return (gapi.hangout.data.getValue( "cat3_a0" ));
};
//TODO: implement parameters that rep the cat id according to naming conventions
board.getCategory = function( catNum ) {
	if( catNum < 6 && catNum >= 0 )
		return( gapi.hangout.data.getValue( "cat" + catNum ) );
	else
		console.log("ERROR: Category number out of range.");
};