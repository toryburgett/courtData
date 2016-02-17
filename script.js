$(document).ready(function(){
  $(".oyez").hide();
  $(".wiki").hide();

  $("#oyez").on("click", function(){
    $(".oyez").toggle();
  });
  $("#wiki").on("click", function(){
    $(".wiki").toggle();
  });


});
