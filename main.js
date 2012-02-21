// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
Note to Team: When coding and testing, make extensive use of console.log for debugging purposes.
Javascript can be a messy language and outputs to the console (hidden from browser view)
will make everyone's life easier.  Press Ctrl+Shift+J to display console in Chrome.
*******
The following function runs whenever the HTML document has fully loaded.
It is a JQuery function with an inline function call.  We use this
to call our initGame function, which initializes state variables.
*/  
$(document).ready( function(){	

	if( gapi.hangout.isApiReady() ) {
		initGame();
	} else {
		gapi.hangout.onApiReady.add(initGame);
	}
	console.log("You loaded the function");
	$("#cat3_q0").click( function(){
		if( game.isHost() ){
			console.log("attempting to set state...");
			game.setState( cnst.ANSWER );
			console.log("state is now..." + game.getState() );
			}
	});
});

//set up initial variables on game load 
function initGame() {
	console.log("Init func is being run.......");
	console.log("cnst.start is initially " + cnst.START );
	game.setState( cnst.START );
	board.setBoard();
		
	gapi.hangout.data.setValue("Player1Id", "1");
	gapi.hangout.data.setValue("Player1Score", "250");
	gapi.hangout.data.setValue("Player1Name", "George");
	
	//TODO: this was a proof of concept event handler for a state changed event
	//needs to be implemented below as a true function.  This is our main
	//loop, since it is run each time the game state changes, and must control the game flow.
	gapi.hangout.data.onStateChanged.add( function(event) {
		gameLoop();
	});
}

function gameLoop() {
	var currentState = game.getState();
	console.log("State changed.  Game State is now " + currentState );
	if( currentState == cnst.ANSWER ) {
		console.log("Attempting to display answer...");
		printer.displayAnswer();
	}
}


