//printer.js
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }
if (typeof effects == 'undefined') { effects = {}; }
if (typeof explode == 'undefined') { explode = {}; }
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

printer.displayScores = function() {
	console.log("running display host");
	var host = gapi.hangout.data.getValue("hostName");
	//console.log("1: "+plr1+"  2: "+plr2+"  3: "+plr3);
	var hostIndex = gapi.hangout.data.getValue("HostIndex");
	
	for( var i = 0; i < 4; i++ ) {
		if( i == parseInt(hostIndex) ) {
			$("#podium"+i).html("HOST<br />" + host);
		}
		else
		{
			$("#podiumlight"+i).html(""+player.getName(i));
			$(".podium" + i + "Score").html("$"+gapi.hangout.data.getValue("Player"+i+"Score"));
			console.log("Buzzedin.................is..........."+gapi.hangout.data.getValue("BuzzedIn"));
			var temp = parseInt(gapi.hangout.data.getValue("BuzzedIn"));
			if(i == temp){
				$("#podiumlight"+i).css("background-color","orange");
			}
			else{
				$("#podiumlight"+i).css("background-color","black");
			}
			
		}
	}
};

printer.display = function(currentState) {
	if( currentState == cnst.START ) {
		console.log("Calling printer.displayStart");
		gapi.hangout.data.setValue("AlreadyReleased", "false");
		printer.displayStart();
	}
	else if( currentState == cnst.SETUP ) {
		game.setPlayers();
		setLocalPlayerNum();
		game.setState( cnst.SELECT );
	}
	else if( currentState == cnst.ANSWER ) {
		console.log("Attempting to display answer...");
		console.log("displayQuestion = " + gapi.hangout.data.getValue("displayQuestion"));
		//setLocalPlayerNum();
		if(gapi.hangout.data.getValue("displayQuestion") == "1"){
			printer.displayQuestion();
		}
		else{
			printer.displayAnswer();
		}
	} 
	else if( currentState == cnst.SELECT ) {
		console.log("Select your question, host");
		gapi.hangout.data.setValue("AlreadyReleased", "false");
		if(board.isEmpty()){
			console.log("*** END OF ROUND ***");
			printer.displayIntermission();
		}
		else{
			printer.displayBoard();
			board.setUpJQuery();
		}
		
		//game.setPlayers();
		//host.releaseBuzzers();
	}
	else if( currentState == cnst.DAILY ){
		console.log("You've found the daily double for this round!");
		console.log("displayQuestion = " + gapi.hangout.data.getValue("displayQuestion"));
		//setLocalPlayerNum();
		if(gapi.hangout.data.getValue("displayQuestion") == "1"){
		//If not host, show the solution
			printer.displayQuestion();
		}
		else{
			printer.displayDaily();
		}		
	}
	printer.displayControls();
	printer.displayScores();
	printer.displayBuzzerLights();
	printer.displayBuzzerReleaseLight();
	printer.podiumAlign();
};

printer.displayBuzzerReleaseLight = function(){
	var hostIndex = gapi.hangout.data.getValue("HostIndex");
	console.log("buzzer release light, hostindex is: " + hostIndex);
	if(gapi.hangout.data.getValue("Buzzer") == "true"){
		$("#podium"+hostIndex).css("background-color","green");
	}
	else{
		$("#podium"+hostIndex).css("background-color","red");
	}
};

printer.displayBuzzerLights = function(){
	var count = gapi.hangout.data.getValue("CountdownNum");
	var id = gapi.hangout.data.getValue("BuzzedIn");
	console.log("about to try the count switch for count: " + count);
	switch(count){
		case "6":
			console.log("made it into case 6");
			$(".podium5" + id).css("background-color","red");
			$(".podium4" + id).css("background-color","red");
			$(".podium3" + id).css("background-color","red");
			$(".podium2" + id).css("background-color","red");
			$(".podium1" + id).css("background-color","red");
			//$(".podiumTimer" + id).css("background-color","red"); // Make the whole bar red
			break;
		case "5":
			console.log("made it into case 5");
			$(".podium5" + id).css("background-color","black");
			break;
		case "4":
			console.log("made it into case 4");
			$(".podium5" + id).css("background-color","black");
			$(".podium4" + id).css("background-color","black");
			break;
		case "3":
			console.log("made it into case 3");
			$(".podium5" + id).css("background-color","black");
			$(".podium4" + id).css("background-color","black");
			$(".podium3" + id).css("background-color","black");
			break;
		case "2":
			console.log("made it into case 2");
			$(".podium5" + id).css("background-color","black");
			$(".podium4" + id).css("background-color","black");
			$(".podium3" + id).css("background-color","black");
			$(".podium2" + id).css("background-color","black");
			break;
		case "1":
			console.log("made it into case 1");
			$(".podium5" + id).css("background-color","black");
			$(".podium4" + id).css("background-color","black");
			$(".podium3" + id).css("background-color","black");
			$(".podium2" + id).css("background-color","black");
			$(".podium1" + id).css("background-color","black");
			gapi.hangout.data.setValue("CountdownNum", "0");
			console.log("sound value is loaded");
			gapi.hangout.data.setValue("soundEffect", "Time_is_up");
			break;
		default:
			console.log("Invalid value in displayBuzzerLights");
	}
};

printer.displayControls = function() {
	//$("#btnHelp").hide();
	$("#btnBuzzer").hide();
	$("#btnRight").hide();
	$("#btnWrong").hide();
	$("#btnControl").hide();
	$("#btnRelease").hide();
	//$("#btnQuit").hide();
	if( game.isHost() ) {
		$("#btnRight").show();
		$("#btnWrong").show();
		$("#btnControl").show();
		$("#btnRelease").show();
	}
	else {
		$("#btnBuzzer").show();
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
	$("#board").removeClass();
	$("#board").addClass("imagetable");
	console.log("RUNNING printer.displayBoard");
	gapi.hangout.data.setValue("BuzzedIn","");
	gapi.hangout.data.setValue("displayQuestion","0");
	if( game.isHost() && gapi.hangout.data.getValue("displayControl") == "true" ) 
	{
		$("#board").removeClass();
		$("#board").addClass("controlpanel");
		$("#board").html( function() {
			var controlTable = "";
			controlTable += "<table class=\"controlpanel\"><tr><td><form><tr><td><p class=\"pInstr\">Please choose a player.<br> You can either remove that player <br> or edit that player's score.</p><td width=\"200\"><img src=\"http://i1074.photobucket.com/albums/w417/suerocher/manuel_small.jpg\" alt=\"Player 1\" width =\"100\" height=\"130\"><br><input type=\"Radio\" name = \"RadioButtons\">Player 1</button></td><td width=\"200\"><img src=\"http://i1074.photobucket.com/albums/w417/suerocher/manuel_small.jpg \" alt=\"Player 2\" width =\"100\" height=\"130\"><br><input type=\"Radio\" name = \"RadioButtons\"> Player 2</button></td><td width=\"200\"><img src=\"http://i1074.photobucket.com/albums/w417/suerocher/manuel_small.jpg \" alt=\"Player 3\" width =\"100\" height=\"130\"><br><input type=\"Radio\" name = \"RadioButtons\"> Player 3</button></td></tr><tr><td><br><label for=\"score\">Last Score</label><br><input type=\"text\" name=\"score\" value = \"$0\" readonly = \"readonly\" /><br><input type = \"text\" name = \"adjustScore\" value = \"playerscore\" /><br><button name=\"EditScore\" class=\"button2\"  id=\"btnEditScore\" height=\"20\" width=\"60\" accesskey=\"e\" ><U>E</U>dit Score</button></td><td></td><td><br><button name=\"RemovePlayer\" class=\"button2\"  id=\"btnRemovePlayer\" accesskey=\"r\" ><U>R</U>emove</button><br><br><br>Please press the control panel button again when finished.</td></tr></form></td></tr></table>";
			
			return(controlTable);
		});
	} else {
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
					if( (gapi.hangout.data.getValue( "cat" + j + "_grid" ).charAt(i)) == '1')
						boardTable += "<td id=\"cat" + j + "_q" + i + "\">$" + (2*i+2) + "00</td>";
					else
						boardTable += "<td id=\"cat" + j + "_q" + i + "\"></td>";
						
					//boardTable += "<td id=\"cat" + j + "_q" + i + "\">$" + (2*i+2) + "00</td>";
				}
				boardTable += "</tr>";
			}
			return (boardTable);
		});
	}
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
		//answerTable += "<input onkeydown=\"player.buzzIn()\" />";
		//working up to isHost func
		if( game.isHost() ) {
			answerTable += "<tr><th>" + board.getQuestion() +"<button type=\"button\" onclick=\"game.setState(cnst.SELECT);\">Move on</button>" + "</tr></th>";			
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

printer.displayDaily = function() {
	console.log("RUNNING printer.displayDaily");
	$("#board").html( function(){
		
		console.log("trying to display the daily info");
		var answerTable = "<tr><th>" + gapi.hangout.data.getValue("cat"+gapi.hangout.data.getValue("currentCat")) + "</tr></th>"
		//answerTable += "<input onkeydown=\"player.buzzIn()\" />";
		//working up to isHost func
		if( game.isHost() ) {
			answerTable += "<tr><th> Wait until player has entered their bet! <button type=\"button\" onclick=\"printer.displayAnswer();\">Move on</button>" + "</tr></th>";			
		}


		else
		{
			answerTable += "<tr><th>  Enter Bid: $<input type=\"text\" id=\"bidtext\" accesskey = \"t\" name=\"Bid Text Box\" value=\"\" />" + "<br><br><input type=\"button\" value=\"Submit Bid Now\" id=\"dailysubmit\" onclick=\"player.isValidBet(getElementById('bidtext').value)\" onkeydown=\"if(event.keyCode==13) getElementById('dailysubmit').click()\" />"+"</tr></th>";

		}
		return (answerTable);
	});
};



printer.displayIntermission = function() { 
	console.log("RUNNING printer.displayIntermission");
	if(gapi.hangout.data.getValue("Mode") == cnst.SINGLE ) {
		$("#board").html( function() {
			var startTable = "<tr><th>END OF SINGLE JEOPARDY</th></tr>";
			if(game.isHost()){
				startTable += "<tr><th><button type=\"button\" onclick=\"game.startGameDouble();\">Start Double Jeopardy</button></th></tr>";
			}
			return(startTable);
		});
	}
	else if(gapi.hangout.data.getValue("Mode") == cnst.DOUBLE ) {
		$("#board").html( function() {
			var startTable = "<tr><th>END OF DOUBLE JEOPARDY</th></tr>";
			if(game.isHost()){
				startTable += "<tr><th><button type=\"button\" onclick=\"game.startGameFinal();\">Start Final Jeopardy</button></th></tr>";
			}
			return(startTable);
		});
	}
	else {
		$("#board").html( function() {
			var startTable = "<tr><th>END OF FINAL JEOPARDY</th></tr>";
			startTable += "<tr><th>Dee Bug McPlaceholderson wins!</th></tr>";
			return(startTable);
		});
	}
};

printer.podiumAlign = function() {
	console.log("RUNNING printer.podiumAlign");
	var players = gapi.hangout.getParticipants().length;
	if(gapi.hangout.layout.isChatPaneVisible()) {
		console.log("Moving left");
		for(var i = 0; i < players; i++) {	
			$("#podium" + i).css("left","-56%");
		}
	}
	else{
		console.log("Moving right");
		for(var i = 0; i < players; i++) {
			$("#podium" + i).css("left","0%");
		}
	}
};
//check to see if a sound effect needs to be played, if so, then call the game.playSound function
printer.playSounds = function()
{
	var curSound = gapi.hangout.data.getValue("soundEffect");
	if(curSound == "Applause")
	{
		console.log("Playing Applause Sound");
		$("#Applause").get(0).play();
		gapi.hangout.data.setValue("soundEffect", "");

	}
	else if(curSound == "BuzzIn")
	{
		console.log("Playing BuzzIn Sound");
		$("#buzzIn").get(0).play();
		gapi.hangout.data.setValue("soundEffect", "");

	}
	else if(curSound == "dailyDouble")
	{
		console.log("Playing dailyDouble Sound");
		$("#dailyDouble").get(0).play();
		gapi.hangout.data.setValue("soundEffect", "");
	}
	else if(curSound == "Time_is_up")
	{
		console.log("Playing Time is up sound");
		$("#Time_is_up").get(0).play();
		gapi.hangout.data.setValue("soundEffect", "");
	}
};
