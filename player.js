//player.js
// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The player object stores pertinent functions to be accessed by the players.  
In Video Geparty, players have relatively few functions, as most of the game
control is determined by the host.
*/

LocalPlayerNum = 0;

function setLocalPlayerNum() {
	
	console.log("Running setlocalplayernum.................................");
	var temp0 = player.getGoogleIdByPlayerNum( 0 );
	var temp1 = player.getGoogleIdByPlayerNum( 1 );
	var temp2 = player.getGoogleIdByPlayerNum( 2 );
	var temp3 = player.getGoogleIdByPlayerNum( 3 );
	console.log("Player1: " + temp0);
	console.log("Player1: " + temp1);
	console.log("Player2: " + temp2);
	console.log("Player3: " + temp3);
	for( var i = 0; i < 4; i++ ) {
		var temp = getGoogleId();
		var temp2 = player.getGoogleIdByPlayerNum( i );
		if( temp == temp2 ) {
			LocalPlayerNum = i;
		}
	}
	console.log("Local Player Num Set to: " + LocalPlayerNum );
}

player.pullName = function() { /*gets google name from api*/
       var playerName = getThisParticipant();
	   var person = playerName.person.displayName;
       return(person);
};

player.getGoogleIdByPlayerNum = function( playerNum ){  /* gets player Id */
		
		//console.log("Running gGIDbN: " + gapi.hangout.data.getValue("Player" + playerNum + "Id"));
		//console.log("playerNUM: " + playerNum );
		//console.log("Player1Id: " + gapi.hangout.data.getValue("Player1Id"));
		//console.log("Player2Id: " + gapi.hangout.data.getValue("Player2Id"));
		//console.log("Player3Id: " + gapi.hangout.data.getValue("Player3Id"));
		return( gapi.hangout.data.getValue("Player" + playerNum + "Id") );
};

player.getName = function( playerNum ) {  /* gets player Name */
	return(gapi.hangout.data.getValue("Player" + playerNum + "Name"));
};

function getGoogleId() { /* Returns the Google Id for the local user */
	//console.log("Running getGoogleId()");
	var thisLocalId = gapi.hangout.getParticipantId();
	//console.log("thisLocalId: " + thisLocalId );
	var thisParticipant = gapi.hangout.getParticipantById( thisLocalId );
	//console.log("thisParticipant.person.id: " + thisParticipant.person.id );
	return( thisParticipant.person.id );
}

function getThisParticipant() {   /* Returns the Participant Object for the local user */
	var thisLocalId = gapi.hangout.getParticipantId();
	var thisParticipant = gapi.hangout.getParticipantById( thisLocalId );
	return(thisParticipant);
} 

// player.setName = function(playerNum) {   /*sets player Name */
	// var playerName = gapi.hangout.getParticipantById(this.pullId());
	// var person = playerName.person.displayName;
	// gapi.hangout.data.setValue("Player" + playerNum + "Name",""+ person);
// };
player.buzzIn = function()
{
	buzzOn( LocalPlayerNum );
};

player.isController = function(){
	if(gapi.hangout.data.getValue("boardController") == getGoogleId){
		return true;
	}
	return false;
};

player.isValidBet = function(bet) {
	
};

// player.buzzIn = function(/*buzzer call*/)
// {
	// main.buzzOn();  /*calls buzzOn function from main code*/
//}

//player.respond = function(response)/*Get players string for final jeopardy, store it in sharedstare object*/
//{
		//not critical for first release
//};

// player.getScore = function(/* gets player score*/)
// {
// };

// player.enterWager = function(int amount) /*allows player to enter wager for question */
// {
		//don't implement for first release
// };



//TRASH

// player.setId = function( playerNum, playerId ) /*sets player Id*/
// {
	// var playerName = gapi.hangout.getParticipantById(this.pullId());
	// var playerId = playerName.person.id;
     // gapi.hangout.data.setValue("Player" + playerNum + "Id",""+ playerId);
// };

// player.pullId = function() {  /*gets hangout id from api; possibly not needed */
	// var playerId = gapi.hangout.getParticipantId();
	// return(playerId);
// };

