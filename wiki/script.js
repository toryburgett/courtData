$(document).ready(function(){

  var wikiJson = "https://gist.githubusercontent.com/toryburgett/8f19b0635cb46cc62d6b/raw/2bb006b6dfa20aae0c393a0ac70f0de8e597cf05/wiki_2014.json";
  var year = 2014;

  var navRows = 0;

  var totalRows = 0;
  var rowStartIndex = 0;
  var rowEndIndex = 0;

  var allWikiCases = [];
  var allWikiData = {year: "", cases: allWikiCases};

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

  function wikiAjax(){
    var url = wikiJson;
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
          var newCase = {case: "", volume: "", argue_date: "", decision_date: "", justices: [], opinions: [], };

          for(var b=0; b<caseLength; b++){
            // var newCaseEntry = "";
            var caseNum = "|#=";
            var caseInfoKeys = ["case", "volume", "argue-date", "decision-date", "case-display"];
            var justiceRow = "|justice";
            var justiceKeys = ["roberts", "scalia", "kennedy", "thomas", "ginsburg", "breyer", "alito", "sotomayor", "kagan"];
            var opinionTypes = ["majority", "dissent", "concurrence", "concurrencedissent", "plurality", "didnotparticipate"];



            for(var c=0; c<caseInfoKeys.length; c++){
              if(response[rowStartIndex+b].includes("|"+caseInfoKeys[c]+"=")){
                var newCaseKey = caseInfoKeys[c];
                if(caseInfoKeys[c].includes("-")){
                  newCaseKey = caseInfoKeys[c].replace("-", "_");
                }
                if(newCaseKey === "case_display"){
                  newCaseKey = "case";
                }
                newCase[newCaseKey] = deleteText(response[rowStartIndex+b], [("|"+caseInfoKeys[c]+"=")]);
              }
            }
            for(var d=0; d<justiceKeys.length; d++){
              if(response[rowStartIndex+b].includes("<!--"+justiceKeys[d]+"-->")){
                var rawCurrentJustice = response[rowStartIndex+b];
                var editCurrentJustice = deleteText(rawCurrentJustice, ["<!--"+justiceKeys[d]+"-->"]);
                var currentJusticeArray = editCurrentJustice.split("|");


                var justiceName = justiceKeys[d];
                var justiceVote = "";
                var justiceAttendance = "";
                var justiceAuthor = "";
                var justiceInfo = {name: justiceName, vote: justiceVote, author: justiceAuthor, joined: {total: [], inFull: [], part: []}, attendance: justiceAttendance, data: editCurrentJustice};

                var numOpinionsJoin = editCurrentJustice.match(/opinion/g).length;

                for(var e=0; e<currentJusticeArray.length; e++){
                  //if the justiceArray entry pertains to an opinion
                  if(currentJusticeArray[e].includes("opinion")){

                    if(currentJusticeArray[e].includes("join")){
                      // if joined opinion
                      var justiceJoined = {opinion: "", author: "", partJoin: 0, fullJoin: 0};
                      var justiceJoinedAuthor = "";
                      var rawJusticeOpinion = currentJusticeArray[e];
                      var opinion = "";

                      // what is the opinionType of this?
                      for(var f = 0; f<opinionTypes.length; f++){
                        if(rawJusticeOpinion.includes(opinionTypes[f])){
                          opinion = opinionTypes[f];
                          justiceJoined.opinion = opinion;
                        }
                      }









                      var authorIdArray = currentJusticeArray[e].split(opinion);
                      var authorJoined = "";
                      // console.log("="+opinion+authorIdArray[1]);

                      // who is the author of joined opinion?
                      for(var g = 0; g<caseLength; g++){
                        if(response[rowStartIndex+g].includes("="+opinion+authorIdArray[1])){
                          console.log("WE DID IT");
                          for(var h=0; h<justiceKeys.length; h++){
                            if(response[rowStartIndex+g].includes(justiceKeys[h])){
                              authorJoined = justiceKeys[h];
                              console.log(authorJoined);
                              justiceJoined.author = justiceKeys[h];
                              console.log("DID IT");
                            }
                          }
                        }
                      }

                      console.log(authorJoined);







                      //Did they join the whole thing, or just partially?
                      if(rawJusticeOpinion.includes("partjoin")){
                        // if joind in part
                        justiceJoined.partJoin = 1;
                        justiceInfo.joined.part.push(justiceJoined);
                      }else{
                        // if they joined the entire thing
                        justiceJoined.fullJoin = 1;
                        justiceInfo.joined.inFull.push(justiceJoined);
                      }


                      justiceInfo.joined.total.push(justiceJoined);

                    }else{
                      // if authored opinion
                      justiceInfo.author = currentJusticeArray[e];


                    }

                  }



                }








                newCase.justices.push(justiceInfo);

// [newCaseKey] = deleteText(response[rowStartIndex+b], [("|"+[d]+"=")]);

              }

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
    wikiAjax();
  });
});
