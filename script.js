$(document).ready(function(){

  // var oyez = "https://api.oyez.org/cases/2014/13-553?labels=true";
  var oyez = "https://api.oyez.org/cases/2014/13-975?labels=true";

  var oyezYear = "https://api.oyez.org/cases/2014";

  var oyezData = [];
  var oyezAllJusticeData = [];

  var opinion = { author: "", opinion: "", case: "", joinees: [] };

  var oyezOpinionTotalData = {
    year: 0,
    totalMajorityAuthored: 0, totalMajorityAuthoredCaseIds: [],
    totalMinorityAuthored: 0, totalMinorityAuthoredCaseIds: [],
    totalConcuranceAuthored: 0, totalConcuranceAuthoredCaseIds: [],
    totalConDissAuthored: 0, totalConDissAuthoredCaseIds: [],
    totalOpinionsAuthored: 0, totalOpinionsAuthoredCaseIds: []
  };

  var oyezJusticeDataGeneric = {
    name: "", lastName: "", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concuranceAuthored: 0, concuranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurance: 0, withConcuranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],


    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    robertsConcuranceOpinionAuthoredJoinedTotal: 0, robertsConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionJoinedAuthoredTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    scaliaConcuranceOpinionAuthoredJoinedTotal: 0, scaliaConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionJoinedAuthoredTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    kennedyConcuranceOpinionAuthoredJoinedTotal: 0, kennedyConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionJoinedAuthoredTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    thomasConcuranceOpinionAuthoredJoinedTotal: 0, thomasConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionJoinedAuthoredTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    ginsburgConcuranceOpinionAuthoredJoinedTotal: 0, ginsburgConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionJoinedAuthoredTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    breyerConcuranceOpinionAuthoredJoinedTotal: 0, breyerConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionJoinedAuthoredTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    alitoConcuranceOpinionAuthoredJoinedTotal: 0, alitoConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionJoinedAuthoredTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    sotomayorConcuranceOpinionAuthoredJoinedTotal: 0, sotomayorConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionJoinedAuthoredTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionJoinedAuthoredTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionJoinedAuthoredTotalCaseIds: [],
    kaganConcuranceOpinionAuthoredJoinedTotal: 0, kaganConcuranceOpinionJoinedAuthoredTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionJoinedAuthoredTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0



  };

  // var justices = [];
  // var opinionData = {caseName: "", caseDecidedDate: "", majVotes: 0, minVotes: 0, justices: justices};
  // var justice = {name: "", decision: "", authored: "", joined: [] };

  function oyezAjax(){
    var url = oyez;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);

      var justices = [];
      var opinionData = {caseName: "", caseDecidedDate: "", majVotes: 0, minVotes: 0, justices: justices};

      opinionData.caseName = response.name;
      opinionData.majVotes = response.decisions[0].majority_vote;
      opinionData.minVotes = response.decisions[0].minority_vote;
      for(var y=0; y<response.decisions[0].votes.length; y++){
        var selectedVote = response.decisions[0].votes[y];
        var justice = {name: "", decision: "", authored: [], joined: [] };
        justice.name = selectedVote.member.last_name;
        justice.decision = selectedVote.vote;
        if(selectedVote.joining){
          for(var z=0; z<selectedVote.joining.length; z++){
            justice.joined.push(selectedVote.joining[z].last_name);
          }
        }
        if(selectedVote.opinion_type !== "none"){
          justice.authored.push({opinion: selectedVote.opinion_type});
        }

        justices.push(justice);

      }





      console.log(opinionData);
      oyezData.push(opinionData);
      console.log(oyezData);




      // $(".documentName").append("<h1>"+response.name+"</h1>");
      // $(".documentName").append("<h2>"+response.decisions[0].majority_vote+" - "+response.decisions[0].minority_vote+"</h2>");
      // for(var i=0; i<response.decisions[0].votes.length; i++){
      //   var selectedVote = response.decisions[0].votes[i];
      //   $(".documentName").append("<p>"+selectedVote.member.last_name+" - "+selectedVote.vote+"</p>");
      //   if(selectedVote.joining){
      //     for(var x=0; x<selectedVote.joining.length; x++){
      //       $(".documentName").append("<p> --- Joined "+selectedVote.vote+" opinion authored by  "+selectedVote.joining[x].last_name+"</p>");
      //     }
      //   }
      //   // else{
      //   //   $(".documentName").append("<p> - Wrote "+selectedVote.vote+" Opinion</p>");
      //   // }
      //   if(selectedVote.opinion_type !== "none"){
      //     $(".documentName").append("<p> --- Wrote "+selectedVote.opinion_type+" Opinion</p>");
      //   }
      //
      // }
    }).fail(function(){
      console.log("Ajax request fails!");
    });
  }


  function oyezYearAjax(){
    var url = oyezYear;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      $(".yearsCases").append("<h1>"+response.name+"</h1>");
      $(".yearsCases").append("<h2>"+response.decisions[0].majority_vote+" - "+response.decisions[0].minority_vote+"</h2>");
      for(var i=0; i<response.decisions[0].votes.length; i++){
        var selectedVote = response.decisions[0].votes[i];
        $(".yearsCases").append("<p>"+selectedVote.member.last_name+" - "+selectedVote.vote+"</p>");
        if(selectedVote.joining){
          for(var x=0; x<selectedVote.joining.length; x++){
            $(".yearsCases").append("<p> --- Joined "+selectedVote.vote+" opinion authored by  "+selectedVote.joining[x].last_name+"</p>");
          }
        }
        // else{
        //   $(".yearsCases").append("<p> - Wrote "+selectedVote.vote+" Opinion</p>");
        // }
        if(selectedVote.opinion_type !== "none"){
          $(".yearsCases").append("<p> --- Wrote "+selectedVote.opinion_type+" Opinion</p>");
        }

      }
    }).fail(function(){
      console.log("Ajax request fails!");
    });
  }



  $(".case").on("click", function(){
    oyezAjax();
    console.log(oyezData);

  });

  $(".year").on("click", function(){
    oyezYearAjax();
  });


});
