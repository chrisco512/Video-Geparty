function displayHideBox(boxNumber)
{
	console.log("Display/hide box number " + boxNumber);
    if(document.getElementById("LightBox"+boxNumber).style.display=="none") {
        document.getElementById("LightBox"+boxNumber).style.display="block";
        document.getElementById("grayBG").style.display="block";
    } else {
        document.getElementById("LightBox"+boxNumber).style.display="none";
        document.getElementById("grayBG").style.display="none";
    }
};

function changeTitleColor(){
	console.log("Changing title color");
	var elem = document.getElementById("title");
	if(elem.value == ""){
		$("#titlebox").css("color","grey");
		$("#titlebox").html("Name of Game");
	}
	else{
		$("#titlebox").css("color","#eb9c31");
		$("#titlebox").html(elem.value);
	}
};

function changeCategoryColor(id){
	console.log("Changing button color category " + id);
	var elem = document.getElementById("cat"+id);
	if(elem.value == ""){
		$("#catbox" + id).css("color","grey");
		$("#catbox" + id).html("Category " + id);
	}
	else{
		$("#catbox" + id).css("color","#eb9c31");
		$("#catbox" + id).html(elem.value);
	}
};

function changeQuestionColor(catid, qid){
	console.log("Changing button color category cat" + catid + "_q" + qid);
	var elem = document.getElementById("cat"+catid+"_q"+qid);
	var elem2 = document.getElementById("cat"+catid+"_a"+qid);
	if(elem.value == "" || elem2.value == ""){
		$("#cat" + catid + "_q" + qid + "box").css("color","grey");
	}
	else{
		$("#cat" + catid + "_q" + qid + "box").css("color","#eb9c31");
	}
};

function initPage(){
	console.log("Initializing Page.");
	changeTitleColor();
	var i, j;
	for(i=1; i<7; i++){
		changeCategoryColor(i);
		for(j=1; j<6; j++){
			changeQuestionColor(i, j);
		}
	}
	displayHideBox('0'); return false;
};

function changeSpan(){
		$("#spanID").text("Not valid!").show().fadeOut(1000);
		$.post("test.php", $("#form").serialize());
};
