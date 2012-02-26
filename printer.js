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
	-displayScores() --updates scores
	-displayCountdown() --displays countdown for buzzedIn player
	-displayControls() --displays user control buttons
	-displaySelect() --highlights player with board control	
end functions */

printer.display = function(currentState) {
	if( currentState == cnst.START ) {
		console.log("Calling printer.displayStart");
		printer.displayStart();
	}
	else if( currentState == cnst.ANSWER ) {
		console.log("Attempting to display answer...");
		console.log("displayQuestion = " + gapi.hangout.data.getValue("displayQuestion"));
		if(gapi.hangout.data.getValue("displayQuestion") == "1"){
			printer.displayQuestion();
		}
		else{
			printer.displayAnswer();
		}
	} 
	else if( currentState == cnst.SELECT ) {
		console.log("Select your question, host");
		printer.displayBoard();
		board.setUpJQuery();
		host.releaseBuzzers();
	}
};

printer.displayStart = function() { 
	console.log("RUNNING printer.displayStart");
	$("#board").html( function() {
		var startTable = "<tr><th><button type=\"button\" onclick=\"game.startGame();\">I am host!  Let us start the game!</button></th></tr>";
		return(startTable);
	});
};

printer.displayBoard = function() {
	console.log("RUNNING printer.displayBoard");
	gapi.hangout.data.setValue("displayQuestion","0");
	$("#board").html( function() {
		var boardTable = "";
		boardTable += "<tr>";
		for( var i = 0; i < 6; i++ ){
			boardTable += "<th id=\"";
			boardTable += ("cat" + i );
			boardTable += "\">";
			boardTable += board.getCategory( i );
			boardTable += "</th>";
		}
		boardTable += "</tr>";
		for( var i = 0; i < 5; i++ ) {
			boardTable += "<tr>";
			for( var j = 0; j < 6; j++ ) {
				boardTable += "<td id=\"cat" + j + "_q" + i + "\">$" + (i+1) + "00</td>";
			}
			boardTable += "</tr>";
		}
		return (boardTable);
	});
};

//Alters the display of the game grid during the Answer state.  A player will see only
//the answer on their screen, while the host will see the question and answer.
printer.displayAnswer = function() {
	console.log("RUNNING printer.displayAnswer");
	$("#board").html( function(){
		console.log("trying to display the answer");
		var answerTable = "<tr><th>"+gapi.hangout.data.getValue("cat"+gapi.hangout.data.getValue("currentCat"))+"</tr></th><tr><th id=\"#answer\">";
		var answer = board.getAnswer();
		answerTable += answer;
		answerTable += "</th></tr>";
		answerTable += "<input onkeydown=\"player.buzzIn()\" />";
		//working up to isHost func
		if( game.isHost() ) {
			answerTable += "<tr><th>" + board.getQuestion() +"<br></br>"+"<button type=\"button\" onclick=\"host.showQuestion();\">Show Question</button>" 
															+"<br></br>"+"<button type=\"button\" onclick=\"game.setState(cnst.SELECT);\">Move on</button>" + "</tr></th>";			
		}
		return (answerTable);
	});
};

printer.displayQuestion = function() {
	if(!game.isHost()){
		console.log("RUNNING printer.displayQuestion");
		$("#board").html( function(){
			console.log("trying to display the answer");
			var answerTable = "<tr><th>"+gapi.hangout.data.getValue("cat"+gapi.hangout.data.getValue("currentCat"))+"</tr></th><tr><th id=\"#answer\">";
			var answer = board.getAnswer();
			answerTable += answer;
			answerTable += "</th></tr>";
			//working up to isHost func
			answerTable += ("<tr><th>" + board.getQuestion() + "</tr></th>");		
			return (answerTable);
		});
	}
};