$(document).ready(function(){

  var oyez = "https://api.oyez.org/cases/2014/13-553?labels=true";

  function oyezAjax(){
    var url = oyez;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      $(".documentName").append("<h1>"+response.name+"</h1>");
      $(".documentName").append("<h2>"+response.decisions[0].majority_vote+" - "+response.decisions[0].minority_vote+"</h2>");
      for(var i=0; i<response.decisions[0].votes.length; i++){
        var selectedVote = response.decisions[0].votes[i];
        $(".documentName").append("<p>"+selectedVote.member.last_name+" - "+selectedVote.vote+"</p>");
        if(selectedVote.joining){
          for(var x=0; x<selectedVote.joining.length; x++){
            $(".documentName").append("<p> - Joined "+selectedVote.vote+" opinion authored by  "+selectedVote.joining[x].last_name+"</p>");
          }
        }else{
          $(".documentName").append("<p> - Wrote "+selectedVote.vote+" Opinion</p>");
        }
      }
    }).fail(function(){
      console.log("Ajax request fails!");
    });
  }

  $("button").on("click", function(){
    oyezAjax();
  });
});
