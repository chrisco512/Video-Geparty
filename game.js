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
SETUP: Calls the setup functions to populate board questions from server
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
		console.log("True: You are " + theParticipant + " the host is " + theHost );
		return (true);
	}
	else {
		console.log("False: You are " + theParticipant + " the host is " + theHost );
		return (false);
	}
};

game.startGame = function()
{
	board.setBoard();
	console.log("Running Start Game");
	game.setHost();
	gapi.hangout.data.setValue("Mode",cnst.SINGLE);
	// game.setPlayers();
	// setLocalPlayerNum();
	game.setState( cnst.SETUP );
};

game.setHost = function() {   /* set host function */
	console.log("running set host ");
	var newHostId = getGoogleId();
	var newHostParticipant = getThisParticipant();
	var newHostName = newHostParticipant.person.displayName;
	gapi.hangout.data.setValue("host", newHostId);
	gapi.hangout.data.setValue("hostName", newHostName);
	console.log("HostID: " + newHostId + " HostParticipant: " + newHostParticipant + " HostName: " + newHostName);
	gapi.hangout.data.submitDelta( {"host":newHostId} );
	var tempHost = gapi.hangout.data.getValue("host");
	console.log( "yess2..." + tempHost );
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
	case cnst.SETUP:
		gapi.hangout.data.setValue( "state", newState );
		//console.log("now state is " + game.getState() );
		break;
	case cnst.DAILY:
		console.log("DAILY");
		gapi.hangout.data.setValue( "state", newState );
		//console.log("now state is " + game.getState() );
		break;			
	default:
		console.log("Bad State: " + newState );
	}
};

game.setPlayers = function()
{
	/*console.log("running set Players...........");
	var temp1 = player.getGoogleIdByPlayerNum( 1 );
	var temp2 = player.getGoogleIdByPlayerNum( 2 );
	var temp3 = player.getGoogleIdByPlayerNum( 3 );
	console.log("Player1: " + temp1);
	console.log("Player2: " + temp2);
	console.log("Player3: " + temp3);*/

	/*// Test Code - Get rid of later.
	console.log("Testing if array matches display index.");
	var arrParticipants = gapi.hangout.getParticipants();
	for(var i = 0; i < arrParticipants.length; i++){
		console.log("i is " + i + ", and displayIndex is " + arrParticipants[i].displayIndex);
	}*/

	console.log("in setplayers function...host is: " + gapi.hangout.data.getValue("host") );
	var arrParticipants = gapi.hangout.getParticipants();
	var playerNumber;
	for(var i = 0; i < arrParticipants.length; i++)
	{
		console.log("Iterating through array......");
			/*var temp1 = player.getGoogleIdByPlayerNum( 1 );
			var temp2 = player.getGoogleIdByPlayerNum( 2 );
			var temp3 = player.getGoogleIdByPlayerNum( 3 );
			console.log("Player1: " + temp1);
			console.log("Player2: " + temp2);
			console.log("Player3: " + temp3);*/
		console.log( "ID for Index " + i + ": " + arrParticipants[i].person.id );
		console.log("ArrParticipants[i].person.id is: " + arrParticipants[i].person.id + "Host getValue is: " + gapi.hangout.data.getValue("host"));
		if( arrParticipants[i].person.id == gapi.hangout.data.getValue("host"))
		{
			console.log("current index is host, moving on...");
			var displayIndexHost = arrParticipants[i].displayIndex;
			var playerId = arrParticipants[i].person.id;
			var playerName = arrParticipants[i].person.displayName;
			$("#podium" + displayIndexHost).html("<tr><td>HOST<br />" + playerName + "</td></tr>");
			console.log("About to set...Player"+displayIndexHost+"Id to " + playerId);
		    	gapi.hangout.data.setValue( ("Player" + displayIndexHost + "Id") , playerId);
			gapi.hangout.data.setValue( ("Player" + displayIndexHost + "Name") , playerName);
			gapi.hangout.data.setValue( ("Player" + displayIndexHost + "Score") , "0");
			gapi.hangout.data.setValue("HostIndex", "" + displayIndexHost );
		}
		else
		{
			var playerId = arrParticipants[i].person.id;
			var playerName = arrParticipants[i].person.displayName;
			playerNumber = arrParticipants[i].displayIndex;
			$("#podium" + playerNumber).html("<tr><td class=\"podiumTop\" id=\"podiumlight" + playerNumber + "\" colspan=\"9\"></td></tr><tr><td class=\"podium" + playerNumber + "Score\" colspan=\"9\">$0</td></tr><tr class=\"podiumTimer" + playerNumber + "\" style=\"background-color:black\"><td class=\"podium5" + playerNumber + "\"></td><td class=\"podium4" + playerNumber + "\"></td><td class=\"podium3" + playerNumber + "\"></td><td class=\"podium2" + playerNumber + "\"></td><td class=\"podium1" + playerNumber + "\"></td><td class=\"podium2" + playerNumber + "\"></td><td class=\"podium3" + playerNumber + "\"></td><td class=\"podium4" + playerNumber + "\"></td><td class=\"podium5" + playerNumber + "\"></td></tr>");
			console.log("About to set...Player"+playerNumber+"Id to " + playerId);
		    	gapi.hangout.data.setValue( ("Player" + playerNumber + "Id") , playerId);
			gapi.hangout.data.setValue( ("Player" + playerNumber + "Name") , playerName);
			gapi.hangout.data.setValue( ("Player" + playerNumber + "Score") , "0");
			console.log("PLAYER" + playerNumber + "="+ gapi.hangout.data.getValue("Player" + playerNumber + "Name"));
		}
	}
};

//gets the game's state variable
game.getState = function() {
	var currentState = gapi.hangout.data.getValue("state");
	return (currentState);
};