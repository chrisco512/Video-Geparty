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

//this object will be instantiated, so it should follow tradition constructor obj model

/*attributes to be implemented
	-score=0
	-id
	-name
end attributes */

player.score = 0;
player.id = 0;
player.name = "";

function player() /*constructor*/
{
	this.score = 0;
	this.id = player.pullId();
	this.name = player.pullName();
}

player.pullId= function(/*gets google id from api */)
{
	var playerId = gapi.hangout.getParticipantId();
	return(playerId);
};

player.pullName = function(/*gets google name from api*/)
{
   var playerName = gapi.hangout.getParticipantById(this.pullId());
	var person = playerName.person.displayName;
   return(person);
	
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

// player.getId = function(/* gets player Id */)
// {
// };
// player.setId = function(/*sets player Id */)
// {
// };
// player.getName = function(/* gets player Name */)
// {
// };
// player.setName = function(/*sets player Name */)
// {
// };
// player.enterWager = function(int amount) /*allows player to enter wager for question */
// {
		//don't implement for first release
// };


