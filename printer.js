//printer.js
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The printer object determines the output to each users screen.
It is called each time the sharedState object changes.  For performance/latency reasons,
there should be as few changes to the sharedState as possible.  
*/

/*attributes to be implemented
	NO ATTRIBUTES IN PRINTER OBJECT
end attributes */

/* functions to be implemented
	-display() --master function, assesses state and fires appropriate display functions
	-displayBoard() 
	-displayScores() --updates scores
	-displayStart() --displays start screen
	-displayCountdown() --displays countdown for buzzedIn player
	-displayControls() --displays user control buttons
	-displaySelect() --highlights player with board control	
end functions */


//Alters the display of the game grid during the Answer state.  A player will see only
//the answer on their screen, while the host will see the question and answer.
printer.displayAnswer = function() {
	$("#board").html( function(){
		var answerTable = "<tr><th>";
		var answer = board.getAnswer();
		answerTable += answer;
		answerTable += "</th></tr>";
		//working up to isHost func
		if( game.isHost() ) {
			answerTable += "<tr><th>" + board.getQuestion() + "</tr></th>";			
		}
		return (answerTable);
	});
};