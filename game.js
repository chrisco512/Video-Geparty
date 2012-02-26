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
	var theParticipant = getGoogleId();
	
	if( theParticipant == theHost ) {
		console.log("You are " + theParticipant + " the host is " + theHost );
		return (true);
	}
	else {
		console.log("You are " + theParticipant + " the host is " + theHost );
		return (false);
	}
};

game.startGame = function()
{
	console.log("Running Start Game");
	game.setHost();
	game.setState( cnst.SELECT );
};

game.setHost = function() {   /* set host function */
	console.log("running set host ");
	var newHostId = getGoogleId();
	gapi.hangout.data.setValue("host", newHostId);
	gapi.hangout.data.submitDelta();
	console.log( gapi.hangout.data.getValue("host") );
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

game.setPlayers = function()
{
	console.log("running set Players...........");
	var temp1 = player.getGoogleIdByPlayerNum( 1 );
	var temp2 = player.getGoogleIdByPlayerNum( 2 );
	var temp3 = player.getGoogleIdByPlayerNum( 3 );
	console.log("Player1: " + temp1);
	console.log("Player2: " + temp2);
	console.log("Player3: " + temp3);
	
	var arrParticipants = gapi.hangout.getParticipants();
	var playerNumber = 1;
	for(var i = 0; i < arrParticipants.length; i++)
	{
		console.log("Iterating through array......");
			var temp1 = player.getGoogleIdByPlayerNum( 1 );
			var temp2 = player.getGoogleIdByPlayerNum( 2 );
			var temp3 = player.getGoogleIdByPlayerNum( 3 );
			console.log("Player1: " + temp1);
			console.log("Player2: " + temp2);
			console.log("Player3: " + temp3);
		console.log( "ID for Index " + i + ": " + arrParticipants[i].person.id );
		
		if( arrParticipants[i].person.id == gapi.hangout.data.getValue("host"))
		{
			console.log("current index is host, moving on...");
			//continue;
		}
		else
		{
			var playerId = arrParticipants[i].person.id;
			console.log("About to set...Player"+playerNumber+"Id to " + playerId);
		    gapi.hangout.data.setValue( ("Player" + playerNumber + "Id") , playerId);
			
			console.log("PLAYER" + playerNumber + "="+ gapi.hangout.data.getValue("Player" + playerNumber + "Id"));
			playerNumber = playerNumber + 1;
		}
	}
};

//gets the game's state variable
game.getState = function() {
	var currentState = gapi.hangout.data.getValue("state");
	return (currentState);
};