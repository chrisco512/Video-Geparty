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

/* functions to be implemented
	-constructor
	-pullId() -- gets google id from api
	-pullName() -- gets google name from api
	-modifyScore(amount) --adjusts player score by an int value
	-buzzIn() -- buzzer call
	-respond( response ) --allows player to send a string for final jeopardy
	-getScore()
	-getId()
	-setId()
	-getName()
	-setName()
	-enterWager( amount )
end functions */
