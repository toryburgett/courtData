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
          var opinionTypes = ["majority", "dissent", "concurrence", "concurrencedissent"];

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

                        // joined justices?

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




























});
