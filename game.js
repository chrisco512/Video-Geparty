//game.js
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The game object determines the flow of the game by tracking and setting the various
state values.  In VG, there is a concept of a game STATE and game MODE.  STATE
can vary between:
START: which is meant to be the initial state where a host is selected
SELECT: state enables host functions such as selecting the next question.
ANSWER: displays answer and fires buzzer timer and buzzer enable functions 
A MODE state variable tracks the Geparty round, whether Single, Double, or Final.

Basically any var that is global in nature and shared between all participants 
should be accessed or altered through the game object. 
*/

/*attributes to be implemented
NOTE: all attributes should be implemented in shared state object
end attributes */

/* functions to be implemented
	-nextRound()
	-more to be added...
end functions */

//TODO: implement function so that a player id must be passed to it 
//check if player is host
game.isHost = function( /* insert player id var here */ ) {
	var theHost = gapi.hangout.data.getValue("host");
	var theParticipant = gapi.hangout.getParticipantId();
	if( theParticipant == theHost ) {
		console.log("You are " + theParticipant + " the host is " + theHost );
		return (true);
	}
	else {
		console.log("You are " + theParticipant + " the host is " + theHost );
		return (false);
	}
};
//TODO: implement function so that a player id must be passed to it
//set host function
game.setHost = function( /* insert player id var here */ ) {
	var newHost = gapi.hangout.getParticipantId();
	console.log("You just set the host to: " + newHost );
	gapi.hangout.data.setValue( "host", newHost );
	game.setState( cnst.SELECT );
};

//sets the state of the gameboard
//currently only accepts START, SELECT, ANSWER as valid input
game.setState = function( newState ) {
	console.log("RUNNING game.setState with state " + newState);
	switch( newState ) {
	case cnst.START:
		gapi.hangout.data.setValue( "state", newState );
		//console.log("now state is " + game.getState() );
		break;
	case cnst.SELECT:
		gapi.hangout.data.setValue( "state", newState );
		//console.log("now state is " + game.getState() );
		break;
	case cnst.ANSWER:
		gapi.hangout.data.setValue( "state", newState );
		//console.log("now state is " + game.getState() );
		break;
	default:
		console.log("Bad State: " + newState );
	}
};
//gets the game's state variable
game.getState = function() {
	var currentState = gapi.hangout.data.getValue("state");
	return (currentState);
};