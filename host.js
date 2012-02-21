//host.js
// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The host object stores pertinent functions to be accessed by the host.  
These functions should only be accessed by a player verified by the 
game.isHost() function.
*/
host.id = 0;
host.name = "";
/*attributes to be implemented
	-id
	-name
end attributes */


function host(){
	this.id = pullID();
	this.name = pullName();
};

host.pullID = function(){
	return (gapi.hangout.getParticipantId());
};

host.pullName = function(){
	return (gapi.hangout.getParticipantById(gapi.hangout.getParticipantId()).person.displayName);
};

host.adjustScore = function(playerId, amount){
	if(gapi.hangout.data.getValue("Player1Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player1Score"));
		score += amount;
		gapi.hangout.data.setValue("Player1Score", ""+score);
	}
	else if(gapi.hangout.data.getValue("Player2Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player2Score"));
		score += amount;
		gapi.hangout.data.setValue("Player2Score", ""+score);
	}
	else if(gapi.hangout.data.getValue("Player3Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player3Score"));
		score += amount;
		gapi.hangout.data.setValue("Player3Score", ""+score);
	}
};

host.questionCorrect = function(){

};

host.questionIncorrect = function(){

};

host.questionUnanswered = function(){

};

host.releaseBuzzers = function(){

};

host.removePlayer = function(playerId){

};
 
host.selectAnswer = function( answerId ){

};

host.showQuestion = function( answerId ){

};
 
/* functions to be implemented
	-constructor
	-pullId() -- gets google id from api
	-pullName() -- gets google name from api
	-adjustScore( playerId, amount) --adjusts player score by an int value
	-questionCorrect() --credits a player for a correct answer
	-questionIncorrect() --debits a player for incorrect answer
	-questionUnanswered() --fires if no one answers correctly in allotted time ( NOTE: might belong in game object, since it is fired automatically by game )
	-releaseBuzzers()
	-removePlayer(playerId)
	-selectAnswer( answerId )
	-showQuestion( answerId )
end functions */