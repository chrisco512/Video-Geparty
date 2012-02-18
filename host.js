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

/*attributes to be implemented
	-id
	-name
end attributes */

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