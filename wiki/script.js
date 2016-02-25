$(document).ready(function(){

  var wikiJson = "https://gist.githubusercontent.com/toryburgett/8f19b0635cb46cc62d6b/raw/09359187af36428b0fab53515477997c24fa5bbb/wiki_2014.json";
  var caseYear = 2014;

  var navRows = 0;

  var totalRows = 0;
  var rowStartIndex = 0;
  var rowEndIndex = 0;

  var allWikiCases = [];
  var allWikiData = {year: "", cases: allWikiCases, opinions: []};
  var justiceKeys = ["roberts", "scalia", "kennedy", "thomas", "ginsburg", "breyer", "alito", "sotomayor", "kagan"];
  var opinionTypes = ["majority", "dissent", "concurrence", "concurrencedissent"];

  function deleteText(line, char){
    var saveVar = line;
    for(var letter in char){
      if(char[letter].length === 1){
        for(var c=0; c<line.length; c++){
          if(line.charAt(c) === char[letter]){
            saveVar = saveVar.replace(char[letter], "");
          }
        }
      } else {
        // only does this once
        saveVar = saveVar.replace(char[letter], "");
      }
    }
    return saveVar;
  }

  function wikiAjax(year, url){
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      for(var a=0; a<response.length; a++){
        if(response[a] === ("=="+year+" term opinions==")){
          allWikiData.year = deleteText(response[a], ["="]);
        }else if((response[a].includes("{{"))&&(response[a].includes("}}"))){
          navRows++;
          console.log(navRows);
          console.log(totalRows);
          console.log(rowEndIndex);
          console.log(allWikiData);
        }else if(response[a].includes("{{")){
          totalRows++;
          rowStartIndex = a;
        }else if(response[a].includes("}}")){
          rowEndIndex = a;
          var caseLength = rowEndIndex - rowStartIndex;
          var newCase = {
            caseId: "",
            case: "",
            caseNum: "",
            volume: "",
            argue_date: "",
            decision_date: "",
            majVotes: 0,
            minVotes: 0,
            attendance: {
              totalVotes: 0,
              didVote: 0,
              notVote: 0
            },
            justices: {roberts: [], scalia: [], kennedy: [], thomas: [], ginsburg: [], breyer: [], alito: [], sotomayor: [], kagan: []},
            opinions: []
          };
          //for every entry in the case from the response
          for(var b=0; b<caseLength; b++){
            // Enter General Case Info
            var caseInfoKeys = ["case", "volume", "argue-date", "decision-date", "case-display", "#"];
            for(var c=0; c<caseInfoKeys.length; c++){
              if(response[rowStartIndex+b].includes("|"+caseInfoKeys[c]+"=")){
                var newCaseKey = caseInfoKeys[c];
                if(caseInfoKeys[c].includes("-")){
                  newCaseKey = caseInfoKeys[c].replace("-", "_");
                }
                if(newCaseKey === "case_display"){
                  newCaseKey = "case";
                }
                if(newCaseKey === "#"){
                  newCaseKey = "caseNum";
                }
                newCase[newCaseKey] = deleteText(response[rowStartIndex+b], [("|"+caseInfoKeys[c]+"=")]);
              }
            }
            // Create and enter caseId for case
            var caseId = year+"_"+newCase.volume+"_"+newCase.caseNum;
            newCase.caseId = caseId;
            // Enter Justice Info for Case
            for(var d=0; d<justiceKeys.length; d++){
              if(response[rowStartIndex+b].includes("<!--"+justiceKeys[d]+"-->")){
                var rawCurrentJustice = response[rowStartIndex+b];
                var editCurrentJustice = deleteText(rawCurrentJustice, ["<!--"+justiceKeys[d]+"-->"]);
                var currentJusticeArray = editCurrentJustice.split("|");
                var numOpinionsJoin = editCurrentJustice.match(/opinion/g).length;
                var justiceName = justiceKeys[d];
                var justiceInfo = {
                  name: justiceName,
                  vote: "",
                  majorityVote: 0,
                  minorityVote: 0,
                  partMajorityVote: 0,
                  attendance: 2,
                  data: editCurrentJustice,
                  numOpinionsJoin: numOpinionsJoin,
                  caseId: caseId,
                  year: year,
                  opinionAuthored: [],
                  joined: {
                    total: [],
                    inFull: [],
                    part: []
                  }
                };
                for(var e=0; e<currentJusticeArray.length; e++){
                  //if the justiceArray entry pertains to an opinion
                  var rawJusticeOpinion = currentJusticeArray[e];
                  if(currentJusticeArray[e].includes("opinion")){
                    // did the justice vote / participate?
                    // justice did not participate in voting
                    if(currentJusticeArray[e].includes("didnotparticipate")){
                      justiceInfo.vote = "none";
                      justiceInfo.attendance = 0;
                      newCase.attendance.notVote ++;
                      newCase.attendance.totalVotes ++;
                    // justice did participate in vote
                    }else{
                      justiceInfo.attendance = 1;
                      newCase.attendance.didVote ++;
                      newCase.attendance.totalVotes ++;
                      // if joined opinion
                      if(currentJusticeArray[e].includes("join")){
                        var justiceJoined = {opinion: "", author: "", partJoin: 0, fullJoin: 0, authorId: ""};
                        var authorJoined = "";
                        var opinion = "";
                        // what is the opinionType of this?
                        for(var f = 0; f<opinionTypes.length; f++){
                          if(rawJusticeOpinion.includes(opinionTypes[f])){
                            opinion = opinionTypes[f];
                            justiceJoined.opinion = opinion;
                          }
                        }
                        // who is the author of joined opinion?
                        // what is the id for the opinion?
                        var authorIdArray = currentJusticeArray[e].split(opinion);
                        // which justice wrote this opinion (with the id) for this case?
                        for(var g = 0; g<caseLength; g++){
                          if(response[rowStartIndex+g].includes("="+opinion+authorIdArray[1])){
                            for(var h=0; h<justiceKeys.length; h++){
                              if(response[rowStartIndex+g].includes(justiceKeys[h])){
                                justiceJoined.authorId = authorIdArray[1];
                                authorJoined = justiceKeys[h];
                                justiceJoined.author = justiceKeys[h];
                              }
                            }
                          }
                        }
                        //Did they join the whole thing, or just partially?
                        if(rawJusticeOpinion.includes("partjoin")){
                          // if joind an opinion in part
                          justiceJoined.partJoin = 1;
                          justiceInfo.joined.part.push(justiceJoined);
                          justiceInfo.partMajorityVote = 1;
                        }else{
                          // if they joined the entire opinion
                          justiceJoined.fullJoin = 1;
                          justiceInfo.joined.inFull.push(justiceJoined);
                        }
                        // how did the justice vote?
                        if((opinion === "dissent")||(opinion === "concurrencedissent")){
                          justiceInfo.vote = "minority";
                          justiceInfo.minorityVote = 1;
                        } else {
                            justiceInfo.vote = "majority";
                            justiceInfo.majorityVote = 1;
                        }
                        // have they signed onto a cd? if yes...
                        if(justiceInfo.joined.total.length !== 0){
                          for(var p=0; p<justiceInfo.joined.total.length; p++){
                            if(((justiceInfo.joined.total[p].opinion === "majority")||(justiceInfo.joined.total[p].opinion === "concurrence"))&(opinion === "concurrencedissent")){
                              justiceInfo.vote = "minority";
                              justiceInfo.minorityVote = 1;
                              justiceInfo.majorityVote = 0;
                            }
                          }
                        }
                        justiceInfo.joined.total.push(justiceJoined);
                      }else{
                        // if authored opinion -- includes "opinion", not join or didnotparticipate
                        var opinionAuthored = {
                          opinion: "",
                          author: justiceName,
                          caseId: caseId,
                          year: year,
                          opinionId: "",
                          authoredId: "",
                        };
                        //what is the type of opinion?
                        var authoredOpinionType = "";
                        for(var j = 0; j<opinionTypes.length; j++){
                          if(rawJusticeOpinion.includes(opinionTypes[j])){
                            authoredOpinionType = opinionTypes[j];
                            opinionAuthored.opinion = authoredOpinionType;
                          }
                        }
                        // find Id of authored opinion
                        var authoredIdArray = currentJusticeArray[e].split(authoredOpinionType);
                        var authoredId = authoredIdArray[1];
                        opinionAuthored.authoredId = authoredId;
                        opinionAuthored.opinionId = caseId+"_"+authoredOpinionType+"_"+justiceName+"_"+authoredId;
                        // how did the justice vote?
                        if((authoredOpinionType === "dissent")||(authoredOpinionType === "concurrencedissent")){
                          justiceInfo.vote = "minority";
                          justiceInfo.minorityVote = 1;
                        } else {
                          justiceInfo.vote = "majority";
                          justiceInfo.majorityVote = 1;
                        }
                        // write cd but signed onto majority, minority vote
                        if(justiceInfo.joined.total.length !== 0){
                          for(var q=0; q<justiceInfo.joined.total.length; q++){
                            if(((justiceInfo.joined.total[q].opinion === "majority")||(justiceInfo.joined.total[q].opinion === "concurrence"))&(authoredOpinionType === "concurrencedissent")){
                              justiceInfo.vote = "minority";
                              justiceInfo.minorityVote = 1;
                              justiceInfo.majorityVote = 0;
                            }
                          }
                        }
                        // push authored array to justice info
                        justiceInfo.opinionAuthored.push(opinionAuthored);
                        // add to opinion of cases
                        newCase.opinions.push(opinionAuthored);
                        //add to all opinions
                        allWikiData.opinions.push(opinionAuthored);

                      }
                    }
                  }
                }
                newCase.justices[justiceName].push(justiceInfo);
              }
            }
          }
          //total case numbers - majority votes v minority votes
          for(var o=0; o<justiceKeys.length; o++){
            var justice = justiceKeys[o];
            if(newCase.justices[justice][0].majorityVote === 1){
              newCase.majVotes ++;
            }else if(newCase.justices[justice][0].minorityVote === 1){
              newCase.minVotes ++;
            }
          }
          allWikiCases.push(newCase);
        }
      }
    }).fail(function(){
      console.log("wikiAjax request fails!");
    });
  }

  $(".wikiData").on("click", function(){
    wikiAjax(caseYear, wikiJson);
  });



  var wikiDraw = function(){
    for(var p=0; p<allWikiData.cases.length; p++){
      var caseFinder = allWikiData.cases[p].caseId;
      // individual case wrapper, title, opinionArea, justiceArea
      $(".casesArea").append("<div class=\"caseWiki "+caseFinder+"\"></div>");
      $(".caseWiki."+caseFinder).append("<div class=\"caseWikiTitle "+caseFinder+"\"> <h2>"+allWikiData.cases[p].case+"</h2><h3>"+allWikiData.cases[p].majVotes+" - "+allWikiData.cases[p].minVotes+"</h3></div>");
      $(".caseWiki."+caseFinder).append("<div class=\"justiceArea "+caseFinder+"\"></div>");
      $(".caseWiki."+caseFinder).append("<div class=\"opinionArea "+caseFinder+"\"></div>");
      for(var q=0; q<justiceKeys.length; q++){
          var justiceName = justiceKeys[q];
          var justice = allWikiData.cases[p].justices[justiceName][0];
          var justiceNumOpinions = justice.numOpinionsJoin;
          var justiceWidth = (1/justiceNumOpinions)*100;
          $(".justiceArea."+caseFinder).append("<div class=\"justice "+justiceName+caseFinder+"\"></div>");
          //author credit
          if(justice.opinionAuthored.length !== 0){
            $(".opinionArea."+caseFinder).append("<p>"+justice.vote+", author: "+justice.name+"</p>");
          }
          if(justice.joined.total !==0){
            for(var s=0; s<justice.joined.total.length; s++){
              $(".justice."+justiceName+caseFinder).append("<div class=\"justiceOpinion join"+justice.joined.total[s].opinion+"\" style=\"width: "+justiceWidth+"%;\"><p>"+justiceName+"</p><p>"+justice.joined.total[s].author+"</p></div>");
            }
          }
          if(justice.opinionAuthored.length !== 0){
            $(".justice."+justiceName+caseFinder).append("<div class=\"justiceOpinion "+justice.opinionAuthored[0].opinion+"\" style=\"width: "+justiceWidth+"%;\">"+justiceName+"</div>");
          }
          if(justice.vote === "none"){
            $(".justice."+justiceName+caseFinder).append("<div class=\"justiceOpinion didnotparticipate\">"+justiceName+"</div>");
          }
        }
    }
  };

  $(".wikiDraw").on("click", function(){
    wikiDraw();
  });



  // Justices
  var wikiJusticeDataRoberts = {
    name: "John Roberts", title: "Chief Justice", seniority: 1, lastName: "Roberts", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },
    justices: {
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataScalia = {
    name: "Antonin Scalia", title: "Associate Justice", seniority: 2, lastName: "Scalia", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataKennedy = {
    name: "Anthony Kennedy", title: "Associate Justice", seniority: 3, lastName: "Kennedy", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataThomas = {
    name: "Clarence Thomas", title: "Associate Justice", seniority: 4, lastName: "Thomas", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },

      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataGinsburg = {
    name: "Ruth Bader Ginsburg", title: "Associate Justice", seniority: 5, lastName: "Ginsburg", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataBreyer = {
    name: "Stephen Breyer", title: "Associate Justice", seniority: 6, lastName: "Breyer", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataAlito = {
    name: "Samuel Alito", title: "Associate Justice", seniority: 7, lastName: "Alito", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedFullTotalCaseIds: [],
        sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedPartTotalCaseIds: [],
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedFullTotalCaseIds: [],
        sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedPartTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedFullTotalCaseIds: [],
        sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedPartTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedFullTotalCaseIds: [],
        sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedPartTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedFullTotal: 0, sotomayorJoinedFullTotalCaseIds: [],
        sotomayorJoinedPartTotal: 0, sotomayorJoinedPartTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataSotomayor = {
    name: "Sonia Sotomayor", title: "Associate Justice", seniority: 8, lastName: "Sotomayor", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedFullTotalCaseIds: [],
        kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedPartTotalCaseIds: [],
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedFullTotalCaseIds: [],
        kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedPartTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedFullTotalCaseIds: [],
        kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedPartTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedFullTotal: 0, kaganConDissJoinedFullTotalCaseIds: [],
        kaganConDissJoinedPartTotal: 0, kaganConDissJoinedPartTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedFullTotal: 0, kaganJoinedFullTotalCaseIds: [],
        kaganJoinedPartTotal: 0, kaganJoinedPartTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },

      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedFullTotalCaseIds: [],
            kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedPartTotalCaseIds: [],
            kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
          kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
          kaganWithTotal: 0, kaganWithTotalCaseIds: [],
          kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
          kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
          kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
          kaganTotalMathCheck: 0
        }
      }
    }
  };
  var wikiJusticeDataKagan = {
    name: "Elena Kagan", title: "Associate Justice", seniority: 9, lastName: "Kagan", year: 0,
    authored: {
      majorityAuthored: 0, majorityAuthoredCaseIds: [],
      minorityAuthored: 0, minorityAuthoredCaseIds: [],
      concurrenceAuthored: 0, concurrenceAuthoredCaseIds: [],
      conDissAuthored: 0, conDissAuthoredCaseIds: [],
      decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
      withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
      opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    },
    joined:{
      withMajority: 0, withMajorityCaseIds: [], partWithMajority: 0, partWithMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [], partWithMinority: 0, partWithMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [], partWithConcurrence: 0, partWithConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [], partWithConDiss: 0, partWithConDissCaseIds: [],
      opinionsJoinedFull: 0, opinionsJoinedFullCaseIds: [], opinionsJoinedPart: 0, opinionsJoinedPartCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },
    unanimousDec: {
      unanimousDecTotal: 0,   unanimousDecTotalCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedFullTotalCaseIds: [],
        robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedPartTotalCaseIds: [],
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedFullTotalCaseIds: [],
        robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedPartTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedFullTotalCaseIds: [],
        robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedPartTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedFullTotal: 0, robertsConDissJoinedFullTotalCaseIds: [],
        robertsConDissJoinedPartTotal: 0, robertsConDissJoinedPartTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedFullTotal: 0, robertsJoinedFullTotalCaseIds: [],
        robertsJoinedPartTotal: 0, robertsJoinedPartTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedFullTotalCaseIds: [],
        scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedPartTotalCaseIds: [],
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedFullTotalCaseIds: [],
        scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedPartTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedFullTotalCaseIds: [],
        scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedPartTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedFullTotalCaseIds: [],
        scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedPartTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedFullTotal: 0, scaliaJoinedFullTotalCaseIds: [],
        scaliaJoinedPartTotal: 0, scaliaJoinedPartTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedFullTotalCaseIds: [],
        kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedPartTotalCaseIds: [],
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedFullTotalCaseIds: [],
        kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedPartTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedFullTotalCaseIds: [],
        kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedPartTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedFullTotalCaseIds: [],
        kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedPartTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedFullTotal: 0, kennedyJoinedFullTotalCaseIds: [],
        kennedyJoinedPartTotal: 0, kennedyJoinedPartTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedFullTotalCaseIds: [],
        thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedPartTotalCaseIds: [],
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedFullTotalCaseIds: [],
        thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedPartTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedFullTotalCaseIds: [],
        thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedPartTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedFullTotal: 0, thomasConDissJoinedFullTotalCaseIds: [],
        thomasConDissJoinedPartTotal: 0, thomasConDissJoinedPartTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedFullTotal: 0, thomasJoinedFullTotalCaseIds: [],
        thomasJoinedPartTotal: 0, thomasJoinedPartTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedFullTotalCaseIds: [],
        ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedPartTotalCaseIds: [],
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedFullTotalCaseIds: [],
        ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedPartTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedFullTotalCaseIds: [],
        ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedPartTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedFullTotalCaseIds: [],
        ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedPartTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedFullTotal: 0, ginsburgJoinedFullTotalCaseIds: [],
        ginsburgJoinedPartTotal: 0, ginsburgJoinedPartTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedFullTotalCaseIds: [],
        breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedPartTotalCaseIds: [],
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedFullTotalCaseIds: [],
        breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedPartTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedFullTotalCaseIds: [],
        breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedPartTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedFullTotal: 0, breyerConDissJoinedFullTotalCaseIds: [],
        breyerConDissJoinedPartTotal: 0, breyerConDissJoinedPartTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedFullTotal: 0, breyerJoinedFullTotalCaseIds: [],
        breyerJoinedPartTotal: 0, breyerJoinedPartTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedFullTotalCaseIds: [],
        alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedPartTotalCaseIds: [],
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedFullTotalCaseIds: [],
        alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedPartTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedFullTotalCaseIds: [],
        alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedPartTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedFullTotal: 0, alitoConDissJoinedFullTotalCaseIds: [],
        alitoConDissJoinedPartTotal: 0, alitoConDissJoinedPartTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedFullTotal: 0, alitoJoinedFullTotalCaseIds: [],
        alitoJoinedPartTotal: 0, alitoJoinedPartTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedFullTotalCaseIds: [],
            robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedPartTotalCaseIds: [],
            robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
          robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
          robertsWithTotal: 0, robertsWithTotalCaseIds: [],
          robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
          robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
          robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
          robertsTotalMathCheck: 0,
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedFullTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedPartTotalCaseIds: [],
            scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
          scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
          scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
          scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
          scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
          scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
          scaliaTotalMathCheck: 0,
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedFullTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedPartTotalCaseIds: [],
            kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
          kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
          kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
          kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
          kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
          kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
          kennedyTotalMathCheck: 0,
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedFullTotalCaseIds: [],
            thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedPartTotalCaseIds: [],
            thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
          thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
          thomasWithTotal: 0, thomasWithTotalCaseIds: [],
          thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
          thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
          thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
          thomasTotalMathCheck: 0,
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedFullTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedPartTotalCaseIds: [],
            ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
          ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
          ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
          ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
          ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
          ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
          ginsburgTotalMathCheck: 0,
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedFullTotalCaseIds: [],
            breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedPartTotalCaseIds: [],
            breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
          breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
          breyerWithTotal: 0, breyerWithTotalCaseIds: [],
          breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
          breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
          breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
          breyerTotalMathCheck: 0,
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedFullTotalCaseIds: [],
            alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedPartTotalCaseIds: [],
            alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
          alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
          alitoWithTotal: 0, alitoWithTotalCaseIds: [],
          alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
          alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
          alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
          alitoTotalMathCheck: 0,
        }
      },

      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: []
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: []
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: []
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedFullTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedPartTotalCaseIds: [],
            sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: []
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
          sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
          sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
          sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
          sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
          sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
          sotomayorTotalMathCheck: 0,
        }
      }
    }
  };  var wikiAllJusticeData = {
    roberts: wikiJusticeDataRoberts,
    scalia: wikiJusticeDataScalia,
    kennedy: wikiJusticeDataKennedy,
    thomas: wikiJusticeDataThomas,
    ginsburg: wikiJusticeDataGinsburg,
    breyer: wikiJusticeDataBreyer,
    alito: wikiJusticeDataAlito,
    sotomayor: wikiJusticeDataSotomayor,
    kagan: wikiJusticeDataKagan
  };

  var wikiAllOpinionData = {
    year: 0,
    totalMajorityAuthored: 0, totalMajorityAuthoredCaseIds: [],
    totalMinorityAuthored: 0, totalMinorityAuthoredCaseIds: [],
    totalConcurrenceAuthored: 0, totalConcurrenceAuthoredCaseIds: [],
    totalConDissAuthored: 0, totalConDissAuthoredCaseIds: [],
    totalOpinionsAuthored: 0, totalOpinionsAuthoredCaseIds: []
  };

  var wikiData = {
    year: 0,
    wikiAllCasesData: allWikiData,
    wikiAllJusticeData: wikiAllJusticeData,
    wikiAllOpinionData: wikiAllOpinionData
  };

  var review = [];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var updateTotal = function(justiceXpath, key, caseId){
    console.log(justiceXpath);
    console.log(key);

    justiceXpath[key] ++;
    justiceXpath[key+"CaseIds"].push(caseId);
  };

  var wikiJusticeData = function(num){
    // set the year
    wikiData.year = num;
    wikiData.wikiAllOpinionData.year = num;
    for(var a=0; a<justiceKeys.length; a++){
      wikiData.wikiAllJusticeData[justiceKeys[a]].year = num;
    }

    //address every individual case
    for(var b=0; b<allWikiData.cases.length; b++){

      // if((b>10)&(b<13)){
      if((b<12)){


      var currentCase = allWikiData.cases[b];
      var caseId = {caseId: currentCase.caseId, case: currentCase.case};
      // address every justice for a case
      for(var c=0; c<justiceKeys.length; c++){
        var justiceName = justiceKeys[c];
        var currentJustice = currentCase.justices[justiceName][0];
        var justiceData = wikiData.wikiAllJusticeData[justiceName];
        // console.log(currentJustice);
        // console.log(justiceData);

        // Attendance
        if(currentJustice.attendance === 0){
          // Did Not Vote
          updateTotal(justiceData.attendance, "casesNotVotedTotal", caseId);
          updateTotal(justiceData.attendance, "casesTotalMathCheck", caseId);
        }else if(currentJustice.attendance === 1){
          // Did Vote
          updateTotal(justiceData.attendance, "casesVotedTotal", caseId);
          updateTotal(justiceData.attendance, "casesTotalMathCheck", caseId);

          // Court Agreeance
          var currentJusticeVote = currentJustice.vote;
          var currentJusticeVoteCap = capitalizeFirstLetter(currentJusticeVote);
          var courtAgreeance = "with"+currentJusticeVoteCap+"Totals";
          updateTotal(justiceData.courtAgreeance, "opinionsJoinedTotal", caseId);
          updateTotal(justiceData.courtAgreeance, courtAgreeance, caseId);

          // currentJustice v compareJustice, sidedWith
          for(var f=0; f<justiceKeys.length; f++){
            var compareJusticeName = justiceKeys[f];
            // make sure you're not comparing justice with themselves
            if(compareJusticeName !== justiceName){
              //Get new compareJustice
              var compareJustice = currentCase.justices[compareJusticeName][0];
              var compareJusticeVote = compareJustice.vote;
              var compareJusticeVoteCap = capitalizeFirstLetter(compareJusticeVote);
              // if the compareJustice voted
              if(compareJustice.attendance === 1){
                var compareCaseId = {caseId: currentCase.caseId, case: currentCase.case, justiceA: justiceName, justiceB: compareJusticeName, justiceAVote: currentJusticeVote, justiceBVote: compareJusticeVote};
                // if compareJustice vote = currentJustice vote
                if(currentJusticeVote === compareJusticeVote){
                  var compareOpinionString = compareJusticeName+"WithAnd"+currentJusticeVoteCap;
                  var compareJusticeNameString = compareJusticeName + "WithTotal";
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareOpinionString, compareCaseId);
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareJusticeNameString, compareCaseId);
                }else{
                // if compareJustice vote != currentJustice vote
                  var compareNotOpinionString = compareJusticeName+"NotWithAnd"+currentJusticeVoteCap;
                  var compareNotJusticeNameString = compareJusticeName + "NotWithTotal";
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareNotOpinionString, compareCaseId);
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareNotJusticeNameString, compareCaseId);
                }
                justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareJusticeName+"TotalMathCheck"] ++;
              }
            }
          }





          //Joined opinions - total (joined), other justices (justices[justice][justice+"Author"][opinionType])
          // Full & unanimous
          if(currentJustice.joined.inFull.length !== 0){
            for(var d=0; d<currentJustice.joined.inFull.length; d++){
              var currentJusticeJoinOpinionFull = currentJustice.joined.inFull[d];
              var opinionAbbrev = "";
              var opinionAbbrevCap = "";

              // set caseId
              var joinFullCaseId = {caseId: currentCase.caseId, case: currentCase.case, joiner: justiceName, author: currentJusticeJoinOpinionFull.author, opinion: currentJusticeJoinOpinionFull.opinion, fullOrPart: "full"};

              // console.log(currentJustice.joined.inFull);
              console.log(currentJusticeJoinOpinionFull);

              // if the opinion was unanimous majority, no author
              if((currentJusticeJoinOpinionFull.author === "")&&(currentJusticeJoinOpinionFull.opinion === "majority")){
                opinionAbbrev = currentJusticeJoinOpinionFull.opinion;
                updateTotal(justiceData.unanimousDec, "unanimousDecTotal", caseId);
              }else{
                // Just in case
                if((currentJusticeJoinOpinionFull.author === "")){
                  console.log("error");
                  console.log(currentJusticeJoinOpinionFull);
                }

                // set variables for opinions
                if((currentJusticeJoinOpinionFull.opinion === "majority")||(currentJusticeJoinOpinionFull.opinion === "concurrence")){
                  opinionAbbrev = currentJusticeJoinOpinionFull.opinion;
                }else if(currentJusticeJoinOpinionFull.opinion === "dissent"){
                  opinionAbbrev = "minority";
                }else if(currentJusticeJoinOpinionFull.opinion === "concurrencedissent"){
                  opinionAbbrev = "conDiss";
                }
                opinionAbbrevCap = capitalizeFirstLetter(opinionAbbrev);
                var opinionJoinedAuthor = currentJusticeJoinOpinionFull.author;

                // joined author specific opinion
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"][opinionAbbrev], (opinionJoinedAuthor+opinionAbbrevCap+"OpinionAuthoredJoinedFullTotal"), joinFullCaseId);
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"][opinionAbbrev], (opinionJoinedAuthor+opinionAbbrevCap+"OpinionAuthoredJoinedTotal"), joinFullCaseId);

                //joined author totals
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals, (opinionJoinedAuthor+"OpinionAuthoredJoinedFullTotal"), joinFullCaseId);
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals, (opinionJoinedAuthor+"OpinionAuthoredJoinedTotal"), joinFullCaseId);

              }
              console.log(currentJusticeJoinOpinionFull);
              console.log(opinionAbbrev);


              opinionAbbrevCap = capitalizeFirstLetter(opinionAbbrev);
              var justiceJoinedString = "with"+opinionAbbrevCap;
              updateTotal(justiceData.joined, justiceJoinedString, joinFullCaseId);
              updateTotal(justiceData.joined, "opinionsJoinedFull", joinFullCaseId);
              updateTotal(justiceData.joined, "opinionsJoinedTotalMathCheck", joinFullCaseId);

              console.log(justiceData.joined);




            }
          }
          // Part
          if(currentJustice.joined.part.length !== 0){
            for(var e=0; e<currentJustice.joined.part.length; e++){
              var currentJusticeJoinOpinionPart = currentJustice.joined.part[e];



            }
          }





          //Authored Opinions - authored

          //Justices joined my opinion - myOpinionJoiners[justice]



        }
      }



      }





    }

  };

  $(".wikiJustice").on("click", function(){
    wikiJusticeData(caseYear);
    console.log("Wiki Data");
    console.log(wikiData);
    console.log("Justice Data");
    console.log(wikiData.wikiAllJusticeData);
    console.log("Review");
    console.log(review);
  });
});
