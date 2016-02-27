$(document).ready(function(){

  // // 2015 data
  // var wikiJson = "https://gist.githubusercontent.com/toryburgett/538b22e7f28b21c682e6/raw/b7cc75a11e32bdd43bc35e9578e4f63d91bde632/wiki_2015.json";
  // var caseYear = 2015;

  // // 2014 data
  // var wikiJson = "https://gist.githubusercontent.com/toryburgett/8f19b0635cb46cc62d6b/raw/09359187af36428b0fab53515477997c24fa5bbb/wiki_2014.json";
  // var caseYear = 2014;

  // // 2013 data
  // var wikiJson = "https://gist.githubusercontent.com/toryburgett/a3115cd77aa94f9cf615/raw/18ecc59d2f475b614ebd4a7bed0b19dc8588235c/wiki_2013.json";
  // var caseYear = 2013;

  // // 2012 data
  // var wikiJson = "https://gist.githubusercontent.com/toryburgett/e879d6e2e92901f34f20/raw/b97072f7e1b80db7c24993b6dd959f32f1a6b28e/wiki_2012.json";
  // var caseYear = 2012;

  // // 2011 data
  // var wikiJson = "https://gist.githubusercontent.com/toryburgett/dd23845a8a54b16fe086/raw/a46bae4c09cd0c3567041d41befc5f539e39589c/wiki_2011.json";
  // var caseYear = 2011;

  // 2010 data
  var wikiJson = "https://gist.githubusercontent.com/toryburgett/c474efad024e5f84a393/raw/f47262f66ae295927a9729cd2c8b6ee39feb02b8/wiki_2010.json";
  var caseYear = 2010;


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



  // Justices (Longer)
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
  };
  var wikiAllJusticeData = {
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

  // Shortend Justices
  var shortWikiJusticeDataRoberts = {
    name: "John Roberts", title: "Chief Justice", seniority: 1, lastName: "Roberts", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataScalia = {
    name: "Antonin Scalia", title: "Associate Justice", seniority: 2, lastName: "Scalia", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataKennedy = {
    name: "Anthony Kennedy", title: "Associate Justice", seniority: 3, lastName: "Kennedy", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataThomas = {
    name: "Clarence Thomas", title: "Associate Justice", seniority: 4, lastName: "Thomas", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataGinsburg = {
    name: "Ruth Bader Ginsburg", title: "Associate Justice", seniority: 5, lastName: "Ginsburg", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataBreyer = {
    name: "Stephen Breyer", title: "Associate Justice", seniority: 6, lastName: "Breyer", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataAlito = {
    name: "Samuel Alito", title: "Associate Justice", seniority: 7, lastName: "Alito", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      },
      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataSotomayor = {
    name: "Sonia Sotomayor", title: "Associate Justice", seniority: 8, lastName: "Sotomayor", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      kagan: {
        kaganMajorityJoinedFullTotal: 0, kaganMajorityJoinedPartTotal: 0, kaganMajorityJoinedTotal: 0, kaganMinorityJoinedFullTotal: 0, kaganMinorityJoinedPartTotal: 0, kaganMinorityJoinedTotal: 0, kaganConcurrenceJoinedFullTotal: 0, kaganConcurrenceJoinedPartTotal: 0, kaganConcurrenceJoinedTotal: 0, kaganConDissJoinedFullTotal: 0, kaganConDissJoinedPartTotal: 0, kaganConDissJoinedTotal: 0, kaganJoinedFullTotal: 0, kaganJoinedPartTotal: 0, kaganJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },

      kagan: {
        kaganAuthor: {
          majority: {
            kaganMajorityOpinionAuthoredJoinedFullTotal: 0, kaganMajorityOpinionAuthoredJoinedPartTotal: 0, kaganMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kaganMinorityOpinionAuthoredJoinedFullTotal: 0, kaganMinorityOpinionAuthoredJoinedPartTotal: 0, kaganMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kaganConcurrenceOpinionAuthoredJoinedFullTotal: 0, kaganConcurrenceOpinionAuthoredJoinedPartTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kaganConDissOpinionAuthoredJoinedFullTotal: 0, kaganConDissOpinionAuthoredJoinedPartTotal: 0, kaganConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kaganOpinionAuthoredJoinedFullTotal: 0, kaganOpinionAuthoredJoinedPartTotal: 0, kaganOpinionAuthoredJoinedTotal: 0
          },
        },
        kaganSidedWith: {
          kaganWithAndMajority: 0, kaganWithAndMinority: 0, kaganWithTotal: 0, kaganNotWithAndMajority: 0, kaganNotWithAndMinority: 0, kaganNotWithTotal: 0, kaganTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeDataKagan = {
    name: "Elena Kagan", title: "Associate Justice", seniority: 9, lastName: "Kagan", year: 0,
    authored: {
      majorityAuthored: 0, minorityAuthored: 0, concurrenceAuthored: 0, conDissAuthored: 0, decisionsAuthored: 0
    },
    courtAgreeance: {
      withMajorityTotals: 0, withMinorityTotals: 0, opinionsJoinedTotal: 0
    },
    joined:{
      withMajority: 0, partWithMajority: 0, withMinority: 0, partWithMinority: 0,
      withConcurrence: 0, partWithConcurrence: 0, withConDiss: 0, partWithConDiss: 0,
      opinionsJoinedFull: 0, opinionsJoinedPart: 0, opinionsJoinedTotalMathCheck: 0
    },
    attendance: {
      casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0
    },
    unanimousDec: {
      unanimousDecTotal: 0
    },
    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedFullTotal: 0, robertsMajorityJoinedPartTotal: 0, robertsMajorityJoinedTotal: 0, robertsMinorityJoinedFullTotal: 0, robertsMinorityJoinedPartTotal: 0, robertsMinorityJoinedTotal: 0, robertsConcurrenceJoinedFullTotal: 0, robertsConcurrenceJoinedPartTotal: 0, robertsConcurrenceJoinedTotal: 0, robertsConDissJoinedFullTotal: 0, robertsConDissJoinedPartTotal: 0, robertsConDissJoinedTotal: 0, robertsJoinedFullTotal: 0, robertsJoinedPartTotal: 0, robertsJoinedTotal: 0
      },
      scalia:{
        scaliaMajorityJoinedFullTotal: 0, scaliaMajorityJoinedPartTotal: 0, scaliaMajorityJoinedTotal: 0, scaliaMinorityJoinedFullTotal: 0, scaliaMinorityJoinedPartTotal: 0, scaliaMinorityJoinedTotal: 0, scaliaConcurrenceJoinedFullTotal: 0, scaliaConcurrenceJoinedPartTotal: 0, scaliaConcurrenceJoinedTotal: 0, scaliaConDissJoinedFullTotal: 0, scaliaConDissJoinedPartTotal: 0, scaliaConDissJoinedTotal: 0, scaliaJoinedFullTotal: 0, scaliaJoinedPartTotal: 0, scaliaJoinedTotal: 0
      },
      kennedy: {
        kennedyMajorityJoinedFullTotal: 0, kennedyMajorityJoinedPartTotal: 0, kennedyMajorityJoinedTotal: 0, kennedyMinorityJoinedFullTotal: 0, kennedyMinorityJoinedPartTotal: 0, kennedyMinorityJoinedTotal: 0, kennedyConcurrenceJoinedFullTotal: 0, kennedyConcurrenceJoinedPartTotal: 0, kennedyConcurrenceJoinedTotal: 0, kennedyConDissJoinedFullTotal: 0, kennedyConDissJoinedPartTotal: 0, kennedyConDissJoinedTotal: 0, kennedyJoinedFullTotal: 0, kennedyJoinedPartTotal: 0, kennedyJoinedTotal: 0
      },
      thomas: {
        thomasMajorityJoinedFullTotal: 0, thomasMajorityJoinedPartTotal: 0, thomasMajorityJoinedTotal: 0, thomasMinorityJoinedFullTotal: 0, thomasMinorityJoinedPartTotal: 0, thomasMinorityJoinedTotal: 0, thomasConcurrenceJoinedFullTotal: 0, thomasConcurrenceJoinedPartTotal: 0, thomasConcurrenceJoinedTotal: 0, thomasConDissJoinedFullTotal: 0, thomasConDissJoinedPartTotal: 0, thomasConDissJoinedTotal: 0, thomasJoinedFullTotal: 0, thomasJoinedPartTotal: 0, thomasJoinedTotal: 0
      },
      ginsburg: {
        ginsburgMajorityJoinedFullTotal: 0, ginsburgMajorityJoinedPartTotal: 0, ginsburgMajorityJoinedTotal: 0, ginsburgMinorityJoinedFullTotal: 0, ginsburgMinorityJoinedPartTotal: 0, ginsburgMinorityJoinedTotal: 0, ginsburgConcurrenceJoinedFullTotal: 0, ginsburgConcurrenceJoinedPartTotal: 0, ginsburgConcurrenceJoinedTotal: 0, ginsburgConDissJoinedFullTotal: 0, ginsburgConDissJoinedPartTotal: 0, ginsburgConDissJoinedTotal: 0, ginsburgJoinedFullTotal: 0, ginsburgJoinedPartTotal: 0, ginsburgJoinedTotal: 0
      },
      breyer: {
        breyerMajorityJoinedFullTotal: 0, breyerMajorityJoinedPartTotal: 0, breyerMajorityJoinedTotal: 0, breyerMinorityJoinedFullTotal: 0, breyerMinorityJoinedPartTotal: 0, breyerMinorityJoinedTotal: 0, breyerConcurrenceJoinedFullTotal: 0, breyerConcurrenceJoinedPartTotal: 0, breyerConcurrenceJoinedTotal: 0, breyerConDissJoinedFullTotal: 0, breyerConDissJoinedPartTotal: 0, breyerConDissJoinedTotal: 0, breyerJoinedFullTotal: 0, breyerJoinedPartTotal: 0, breyerJoinedTotal: 0
      },
      alito: {
        alitoMajorityJoinedFullTotal: 0, alitoMajorityJoinedPartTotal: 0, alitoMajorityJoinedTotal: 0, alitoMinorityJoinedFullTotal: 0, alitoMinorityJoinedPartTotal: 0, alitoMinorityJoinedTotal: 0, alitoConcurrenceJoinedFullTotal: 0, alitoConcurrenceJoinedPartTotal: 0, alitoConcurrenceJoinedTotal: 0, alitoConDissJoinedFullTotal: 0, alitoConDissJoinedPartTotal: 0, alitoConDissJoinedTotal: 0, alitoJoinedFullTotal: 0, alitoJoinedPartTotal: 0, alitoJoinedTotal: 0
      },
      sotomayor: {
        sotomayorMajorityJoinedFullTotal: 0, sotomayorMajorityJoinedPartTotal: 0, sotomayorMajorityJoinedTotal: 0, sotomayorMinorityJoinedFullTotal: 0, sotomayorMinorityJoinedPartTotal: 0, sotomayorMinorityJoinedTotal: 0, sotomayorConcurrenceJoinedFullTotal: 0, sotomayorConcurrenceJoinedPartTotal: 0, sotomayorConcurrenceJoinedTotal: 0, sotomayorConDissJoinedFullTotal: 0, sotomayorConDissJoinedPartTotal: 0, sotomayorConDissJoinedTotal: 0, sotomayorJoinedFullTotal: 0, sotomayorJoinedPartTotal: 0, sotomayorJoinedTotal: 0
      }
    },
    justices: {
      roberts: {
        robertsAuthor: {
          majority: {
            robertsMajorityOpinionAuthoredJoinedFullTotal: 0, robertsMajorityOpinionAuthoredJoinedPartTotal: 0, robertsMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            robertsMinorityOpinionAuthoredJoinedFullTotal: 0, robertsMinorityOpinionAuthoredJoinedPartTotal: 0, robertsMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            robertsConcurrenceOpinionAuthoredJoinedFullTotal: 0, robertsConcurrenceOpinionAuthoredJoinedPartTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            robertsConDissOpinionAuthoredJoinedFullTotal: 0, robertsConDissOpinionAuthoredJoinedPartTotal: 0, robertsConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            robertsOpinionAuthoredJoinedFullTotal: 0, robertsOpinionAuthoredJoinedPartTotal: 0, robertsOpinionAuthoredJoinedTotal: 0
          },
        },
        robertsSidedWith: {
          robertsWithAndMajority: 0, robertsWithAndMinority: 0, robertsWithTotal: 0, robertsNotWithAndMajority: 0, robertsNotWithAndMinority: 0, robertsNotWithTotal: 0, robertsTotalMathCheck: 0
        }
      },
      scalia:{
        scaliaAuthor: {
          majority: {
            scaliaMajorityOpinionAuthoredJoinedFullTotal: 0, scaliaMajorityOpinionAuthoredJoinedPartTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            scaliaMinorityOpinionAuthoredJoinedFullTotal: 0, scaliaMinorityOpinionAuthoredJoinedPartTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            scaliaConcurrenceOpinionAuthoredJoinedFullTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedPartTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            scaliaConDissOpinionAuthoredJoinedFullTotal: 0, scaliaConDissOpinionAuthoredJoinedPartTotal: 0, scaliaConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            scaliaOpinionAuthoredJoinedFullTotal: 0, scaliaOpinionAuthoredJoinedPartTotal: 0, scaliaOpinionAuthoredJoinedTotal: 0
          },
        },
        scaliaSidedWith: {
          scaliaWithAndMajority: 0, scaliaWithAndMinority: 0, scaliaWithTotal: 0, scaliaNotWithAndMajority: 0, scaliaNotWithAndMinority: 0, scaliaNotWithTotal: 0, scaliaTotalMathCheck: 0
        }
      },
      kennedy: {
        kennedyAuthor: {
          majority: {
            kennedyMajorityOpinionAuthoredJoinedFullTotal: 0, kennedyMajorityOpinionAuthoredJoinedPartTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            kennedyMinorityOpinionAuthoredJoinedFullTotal: 0, kennedyMinorityOpinionAuthoredJoinedPartTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            kennedyConcurrenceOpinionAuthoredJoinedFullTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedPartTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            kennedyConDissOpinionAuthoredJoinedFullTotal: 0, kennedyConDissOpinionAuthoredJoinedPartTotal: 0, kennedyConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            kennedyOpinionAuthoredJoinedFullTotal: 0, kennedyOpinionAuthoredJoinedPartTotal: 0, kennedyOpinionAuthoredJoinedTotal: 0
          },
        },
        kennedySidedWith: {
          kennedyWithAndMajority: 0, kennedyWithAndMinority: 0, kennedyWithTotal: 0, kennedyNotWithAndMajority: 0, kennedyNotWithAndMinority: 0, kennedyNotWithTotal: 0, kennedyTotalMathCheck: 0
        }
      },
      thomas: {
        thomasAuthor: {
          majority: {
            thomasMajorityOpinionAuthoredJoinedFullTotal: 0, thomasMajorityOpinionAuthoredJoinedPartTotal: 0, thomasMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            thomasMinorityOpinionAuthoredJoinedFullTotal: 0, thomasMinorityOpinionAuthoredJoinedPartTotal: 0, thomasMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            thomasConcurrenceOpinionAuthoredJoinedFullTotal: 0, thomasConcurrenceOpinionAuthoredJoinedPartTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            thomasConDissOpinionAuthoredJoinedFullTotal: 0, thomasConDissOpinionAuthoredJoinedPartTotal: 0, thomasConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            thomasOpinionAuthoredJoinedFullTotal: 0, thomasOpinionAuthoredJoinedPartTotal: 0, thomasOpinionAuthoredJoinedTotal: 0
          },
        },
        thomasSidedWith: {
          thomasWithAndMajority: 0, thomasWithAndMinority: 0, thomasWithTotal: 0, thomasNotWithAndMajority: 0, thomasNotWithAndMinority: 0, thomasNotWithTotal: 0, thomasTotalMathCheck: 0
        }
      },
      ginsburg:{
        ginsburgAuthor: {
          majority: {
            ginsburgMajorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMajorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            ginsburgMinorityOpinionAuthoredJoinedFullTotal: 0, ginsburgMinorityOpinionAuthoredJoinedPartTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            ginsburgConcurrenceOpinionAuthoredJoinedFullTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedPartTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            ginsburgConDissOpinionAuthoredJoinedFullTotal: 0, ginsburgConDissOpinionAuthoredJoinedPartTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            ginsburgOpinionAuthoredJoinedFullTotal: 0, ginsburgOpinionAuthoredJoinedPartTotal: 0, ginsburgOpinionAuthoredJoinedTotal: 0
          },
        },
        ginsburgSidedWith: {
          ginsburgWithAndMajority: 0, ginsburgWithAndMinority: 0, ginsburgWithTotal: 0, ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMinority: 0, ginsburgNotWithTotal: 0, ginsburgTotalMathCheck: 0
        }
      },
      breyer: {
        breyerAuthor: {
          majority: {
            breyerMajorityOpinionAuthoredJoinedFullTotal: 0, breyerMajorityOpinionAuthoredJoinedPartTotal: 0, breyerMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            breyerMinorityOpinionAuthoredJoinedFullTotal: 0, breyerMinorityOpinionAuthoredJoinedPartTotal: 0, breyerMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            breyerConcurrenceOpinionAuthoredJoinedFullTotal: 0, breyerConcurrenceOpinionAuthoredJoinedPartTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            breyerConDissOpinionAuthoredJoinedFullTotal: 0, breyerConDissOpinionAuthoredJoinedPartTotal: 0, breyerConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            breyerOpinionAuthoredJoinedFullTotal: 0, breyerOpinionAuthoredJoinedPartTotal: 0, breyerOpinionAuthoredJoinedTotal: 0
          },
        },
        breyerSidedWith: {
          breyerWithAndMajority: 0, breyerWithAndMinority: 0, breyerWithTotal: 0, breyerNotWithAndMajority: 0, breyerNotWithAndMinority: 0, breyerNotWithTotal: 0, breyerTotalMathCheck: 0
        }
      },
      alito: {
        alitoAuthor: {
          majority: {
            alitoMajorityOpinionAuthoredJoinedFullTotal: 0, alitoMajorityOpinionAuthoredJoinedPartTotal: 0, alitoMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            alitoMinorityOpinionAuthoredJoinedFullTotal: 0, alitoMinorityOpinionAuthoredJoinedPartTotal: 0, alitoMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            alitoConcurrenceOpinionAuthoredJoinedFullTotal: 0, alitoConcurrenceOpinionAuthoredJoinedPartTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            alitoConDissOpinionAuthoredJoinedFullTotal: 0, alitoConDissOpinionAuthoredJoinedPartTotal: 0, alitoConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            alitoOpinionAuthoredJoinedFullTotal: 0, alitoOpinionAuthoredJoinedPartTotal: 0, alitoOpinionAuthoredJoinedTotal: 0
          },
        },
        alitoSidedWith: {
          alitoWithAndMajority: 0, alitoWithAndMinority: 0, alitoWithTotal: 0, alitoNotWithAndMajority: 0, alitoNotWithAndMinority: 0, alitoNotWithTotal: 0, alitoTotalMathCheck: 0
        }
      },
      sotomayor: {
        sotomayorAuthor: {
          majority: {
            sotomayorMajorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMajorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotal: 0
          },
          minority: {
            sotomayorMinorityOpinionAuthoredJoinedFullTotal: 0, sotomayorMinorityOpinionAuthoredJoinedPartTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotal: 0
          },
          concurrence: {
            sotomayorConcurrenceOpinionAuthoredJoinedFullTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedPartTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0
          },
          conDiss: {
            sotomayorConDissOpinionAuthoredJoinedFullTotal: 0, sotomayorConDissOpinionAuthoredJoinedPartTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotal: 0
          },
          totals: {
            sotomayorOpinionAuthoredJoinedFullTotal: 0, sotomayorOpinionAuthoredJoinedPartTotal: 0, sotomayorOpinionAuthoredJoinedTotal: 0
          },
        },
        sotomayorSidedWith: {
          sotomayorWithAndMajority: 0, sotomayorWithAndMinority: 0, sotomayorWithTotal: 0, sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMinority: 0, sotomayorNotWithTotal: 0, sotomayorTotalMathCheck: 0
        }
      }
    }
  };
  var shortWikiJusticeData = {
    roberts: shortWikiJusticeDataRoberts,
    scalia: shortWikiJusticeDataScalia,
    kennedy: shortWikiJusticeDataKennedy,
    thomas: shortWikiJusticeDataThomas,
    ginsburg: shortWikiJusticeDataGinsburg,
    breyer: shortWikiJusticeDataBreyer,
    alito: shortWikiJusticeDataAlito,
    sotomayor: shortWikiJusticeDataSotomayor,
    kagan: shortWikiJusticeDataKagan
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var updateTotal = function(justiceXpath, key, caseId){
    justiceXpath[key] ++;
    justiceXpath[key+"CaseIds"].push(caseId);
  };


  // shortWikiJusticeData


  var wikiJusticeData = function(num){
    // set the year
    wikiData.year = num;
    wikiData.wikiAllOpinionData.year = num;
    for(var a=0; a<justiceKeys.length; a++){
      wikiData.wikiAllJusticeData[justiceKeys[a]].year = num;
    }
    //address every individual case
    for(var b=0; b<allWikiData.cases.length; b++){
      console.log("allWikiData.cases."+b);
      var currentCase = allWikiData.cases[b];
      var caseId = {caseId: currentCase.caseId, case: currentCase.case};
      // address every justice for a case
      for(var c=0; c<justiceKeys.length; c++){
        var justiceName = justiceKeys[c];
        var currentJustice = currentCase.justices[justiceName][0];
        var justiceData = wikiData.wikiAllJusticeData[justiceName];
        var shortJusticeData = shortWikiJusticeData[justiceName];
        console.log(shortJusticeData);
        // Attendance
        if(currentJustice.attendance === 0){
          // Did Not Vote
          updateTotal(justiceData.attendance, "casesNotVotedTotal", caseId);
          shortJusticeData.attendance.casesNotVotedTotal++;
          updateTotal(justiceData.attendance, "casesTotalMathCheck", caseId);
          shortJusticeData.attendance.casesTotalMathCheck++;
        }else if(currentJustice.attendance === 1){
          // Did Vote
          updateTotal(justiceData.attendance, "casesVotedTotal", caseId);
          shortJusticeData.attendance.casesVotedTotal++;
          updateTotal(justiceData.attendance, "casesTotalMathCheck", caseId);
          shortJusticeData.attendance.casesTotalMathCheck++;
          // Court Agreeance
          var currentJusticeVote = currentJustice.vote;
          var currentJusticeVoteCap = capitalizeFirstLetter(currentJusticeVote);
          var courtAgreeance = "with"+currentJusticeVoteCap+"Totals";
          updateTotal(justiceData.courtAgreeance, "opinionsJoinedTotal", caseId);
          shortJusticeData.courtAgreeance.opinionsJoinedTotal++;
          updateTotal(justiceData.courtAgreeance, courtAgreeance, caseId);
          shortJusticeData.courtAgreeance[courtAgreeance]++;
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
                  shortJusticeData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareOpinionString]++;
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareJusticeNameString, compareCaseId);
                  shortJusticeData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareJusticeNameString]++;
                }else{
                // if compareJustice vote != currentJustice vote
                  var compareNotOpinionString = compareJusticeName+"NotWithAnd"+currentJusticeVoteCap;
                  var compareNotJusticeNameString = compareJusticeName + "NotWithTotal";
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareNotOpinionString, compareCaseId);
                  shortJusticeData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareNotOpinionString]++;
                  updateTotal(justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"], compareNotJusticeNameString, compareCaseId);
                  shortJusticeData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareNotJusticeNameString]++;
                }
                justiceData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareJusticeName+"TotalMathCheck"] ++;
                shortJusticeData.justices[compareJusticeName][compareJusticeName+"SidedWith"][compareJusticeName+"TotalMathCheck"] ++;
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

              // if the opinion was unanimous majority, no author
              if((currentJusticeJoinOpinionFull.author === "")&&(currentJusticeJoinOpinionFull.opinion === "majority")){
                opinionAbbrev = currentJusticeJoinOpinionFull.opinion;
                updateTotal(justiceData.unanimousDec, "unanimousDecTotal", caseId);
                shortJusticeData.unanimousDec.unanimousDecTotal = shortJusticeData.unanimousDec.unanimousDecTotal + 1;
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
                shortJusticeData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"][opinionAbbrev][opinionJoinedAuthor+opinionAbbrevCap+"OpinionAuthoredJoinedFullTotal"]++;
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"][opinionAbbrev], (opinionJoinedAuthor+opinionAbbrevCap+"OpinionAuthoredJoinedTotal"), joinFullCaseId);
                shortJusticeData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"][opinionAbbrev][opinionJoinedAuthor+opinionAbbrevCap+"OpinionAuthoredJoinedTotal"]++;

                //joined author totals
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals, (opinionJoinedAuthor+"OpinionAuthoredJoinedFullTotal"), joinFullCaseId);
                shortJusticeData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals[opinionJoinedAuthor+"OpinionAuthoredJoinedFullTotal"]++;
                updateTotal(justiceData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals, (opinionJoinedAuthor+"OpinionAuthoredJoinedTotal"), joinFullCaseId);
                shortJusticeData.justices[opinionJoinedAuthor][opinionJoinedAuthor+"Author"].totals[opinionJoinedAuthor+"OpinionAuthoredJoinedTotal"]++;
              }
              opinionAbbrevCap = capitalizeFirstLetter(opinionAbbrev);
              var justiceJoinedString = "with"+opinionAbbrevCap;
              // joined totals for justice
              updateTotal(justiceData.joined, justiceJoinedString, joinFullCaseId);
              shortJusticeData.joined[justiceJoinedString]++;
              updateTotal(justiceData.joined, "opinionsJoinedFull", joinFullCaseId);
              shortJusticeData.joined.opinionsJoinedFull++;
              updateTotal(justiceData.joined, "opinionsJoinedTotalMathCheck", joinFullCaseId);
              shortJusticeData.joined.opinionsJoinedTotalMathCheck++;
            }
          }
          // Part Joined
          if(currentJustice.joined.part.length !== 0){
            for(var e=0; e<currentJustice.joined.part.length; e++){
              var currentJusticeJoinOpinionPart = currentJustice.joined.part[e];
              var opinionJoinedPartAuthor = currentJusticeJoinOpinionPart.author;

              // setting opinion type
              var opinionAbbrevPart = currentJusticeJoinOpinionPart.opinion;
              var opinionAbbrevPartCap = "";
              if(opinionAbbrevPart === "dissent"){
                opinionAbbrevPart = "minority";
              }else if(opinionAbbrevPart === "concurrencedissent"){
                opinionAbbrevPart = "conDiss";
              }
              opinionAbbrevPartCap = capitalizeFirstLetter(opinionAbbrevPart);

              // set caseId
              var joinPartCaseId = {caseId: currentCase.caseId, case: currentCase.case, joiner: justiceName, author: opinionJoinedPartAuthor, opinion: currentJusticeJoinOpinionPart.opinion, fullOrPart: "part"};

              // Add to Justice Data
              // joined author specific opinion
              updateTotal(justiceData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"][opinionAbbrevPart], (opinionJoinedPartAuthor+opinionAbbrevPartCap+"OpinionAuthoredJoinedPartTotal"), joinPartCaseId);
              shortJusticeData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"][opinionAbbrevPart][opinionJoinedPartAuthor+opinionAbbrevPartCap+"OpinionAuthoredJoinedPartTotal"]++;
              updateTotal(justiceData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"][opinionAbbrevPart], (opinionJoinedPartAuthor+opinionAbbrevPartCap+"OpinionAuthoredJoinedTotal"), joinPartCaseId);
              shortJusticeData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"][opinionAbbrevPart][opinionJoinedPartAuthor+opinionAbbrevPartCap+"OpinionAuthoredJoinedTotal"]++;

              //joined author totals
              updateTotal(justiceData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"].totals, (opinionJoinedPartAuthor+"OpinionAuthoredJoinedPartTotal"), joinPartCaseId);
              shortJusticeData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"].totals[opinionJoinedPartAuthor+"OpinionAuthoredJoinedPartTotal"]++;
              updateTotal(justiceData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"].totals, (opinionJoinedPartAuthor+"OpinionAuthoredJoinedTotal"), joinPartCaseId);
              shortJusticeData.justices[opinionJoinedPartAuthor][opinionJoinedPartAuthor+"Author"].totals[opinionJoinedPartAuthor+"OpinionAuthoredJoinedTotal"]++;

              // joined totals for justice
              updateTotal(justiceData.joined, ("partWith"+opinionAbbrevPartCap), joinPartCaseId);
              shortJusticeData.joined["partWith"+opinionAbbrevPartCap]++;
              updateTotal(justiceData.joined, "opinionsJoinedPart", joinPartCaseId);
              shortJusticeData.joined.opinionsJoinedPart++;
              updateTotal(justiceData.joined, "opinionsJoinedTotalMathCheck", joinPartCaseId);
              shortJusticeData.joined.opinionsJoinedTotalMathCheck++;

            }
          }
          //Authored Opinions
          //Justices joined my opinion - myOpinionJoiners[justice]
          // Add to authored
          //Add Opinion to Opinion Array
          if(currentJustice.opinionAuthored.length !== 0){
            var currentJusticeWroteOpinion = currentJustice.opinionAuthored[0];
            // setting opinion type
            var currentJusticeWroteOpinionType = currentJusticeWroteOpinion.opinion;

            console.log(currentJusticeWroteOpinion);
            console.log(currentJusticeWroteOpinionType);

            if(currentJusticeWroteOpinionType === "dissent"){
              currentJusticeWroteOpinionType = "minority";
            }else if(currentJusticeWroteOpinionType === "concurrencedissent"){
              currentJusticeWroteOpinionType = "conDiss";
            }
            var currentJusticeWroteOpinionCap = capitalizeFirstLetter(currentJusticeWroteOpinionType);

            // set caseId
            var authoredJoinCaseId = {caseId: currentCase.caseId, case: currentCase.case, author: justiceName, opinion: currentJusticeWroteOpinion.opinion, joiner: "", fullOrPart: ""};
            var authoredCaseId = {caseId: currentCase.caseId, case: currentCase.case, author: justiceName, opinion: currentJusticeWroteOpinion.opinion, joiners: {joiners: [], joinersPart:[], joinersFull: []}};

            // did any other justices join this opinion?
            // set myOpinionJoiners
            for(var g=0; g<justiceKeys.length; g++){
              var otherJusticeName = justiceKeys[g];
              // make sure you're not comparing justice with themselves
              if(otherJusticeName !== justiceName){
                //Get new otherJustice
                var otherJustice = currentCase.justices[otherJusticeName][0];
                //make sure otherJustice voted
                if(otherJustice.attendance === 1){
                  //did otherJustice fully join my opinion?
                  if(otherJustice.joined.inFull.length !== 0){
                    for(var h=0; h<otherJustice.joined.inFull.length; h++){
                      var otherJusticeFullJoin = otherJustice.joined.inFull[h];
                      if(otherJusticeFullJoin.author === justiceName){
                        // update caseId for authored
                        authoredCaseId.joiners.joiners.push(otherJusticeName);
                        authoredCaseId.joiners.joinersFull.push(otherJusticeName);
                        // update for upcoming push caseId
                        authoredJoinCaseId.joiner = otherJusticeName;
                        authoredJoinCaseId.fullOrPart = "full";
                        // update myOpinionJoiners
                        // specific opinion
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+currentJusticeWroteOpinionCap+"JoinedFullTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+currentJusticeWroteOpinionCap+"JoinedFullTotal"]++;
                        // All full opinions
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+"JoinedFullTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+"JoinedFullTotal"]++;
                        // All opinions
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+"JoinedTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+"JoinedTotal"]++;
                      }
                    }
                  }
                  //did otherJustice part join my opinion?
                  if(otherJustice.joined.part.length !== 0){
                    for(var i=0; i<otherJustice.joined.part.length; i++){
                      var otherJusticePartJoin = otherJustice.joined.part[i];
                      if(otherJusticePartJoin.author === justiceName){
                        // update caseId for authored
                        authoredCaseId.joiners.joiners.push(otherJusticeName);
                        authoredCaseId.joiners.joinersPart.push(otherJusticeName);
                        // update for upcoming push caseId
                        authoredJoinCaseId.joiner = otherJusticeName;
                        authoredJoinCaseId.fullOrPart = "part";
                        // update myOpinionJoiners
                        // specific opinion
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+currentJusticeWroteOpinionCap+"JoinedPartTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+currentJusticeWroteOpinionCap+"JoinedPartTotal"]++;
                        // All full opinions
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+"JoinedPartTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+"JoinedPartTotal"]++;
                        // All opinions
                        updateTotal(justiceData.myOpinionJoiners[otherJusticeName], (otherJusticeName+"JoinedTotal"), authoredJoinCaseId);
                        shortJusticeData.myOpinionJoiners[otherJusticeName][otherJusticeName+"JoinedTotal"]++;
                        console.log(authoredJoinCaseId);
                      }
                    }
                  }
                }
              }
            }
            // authored
            updateTotal(justiceData.authored, (currentJusticeWroteOpinionType+"Authored"), authoredCaseId);
            shortJusticeData.authored[currentJusticeWroteOpinionType+"Authored"]++;
            updateTotal(justiceData.authored, "decisionsAuthored", authoredCaseId);
            shortJusticeData.authored.decisionsAuthored++;
            // Add to opinion index, wikiData.wikiAllOpinionData - total[x]Authored, totalOpinionsAuthored
            updateTotal(wikiData.wikiAllOpinionData, ("total"+currentJusticeWroteOpinionCap+"Authored"), authoredCaseId);
            updateTotal(wikiData.wikiAllOpinionData, "totalOpinionsAuthored", authoredCaseId);
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
    console.log("Shortend Justice Data");
    console.log(shortWikiJusticeData);
  });
});
