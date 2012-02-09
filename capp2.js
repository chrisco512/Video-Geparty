$(document).ready(function(){
  $("#answer").hide();
  $("#100").click(function(){
    $("#board").fadeOut();
    $("#answer").fadeIn();
    console.log(gapi.hangout.getParticipantId());
    //console.log(gapi.hangout.getParticipants()[0].displayIndex());
    console.log('holaaaa...');//
    var localPart = gapi.hangout.getParticipantById( gapi.hangout.getParticipantId() );
    if( localPart.displayIndex == 0 ) {
      $("#question").fadeIn();
      console.log('fff...');
    }
  });
  $("#answer").click(function(){
    $(this).fadeOut();
    $("#question").fadeOut();
    $("#board").fadeIn();
  });
});