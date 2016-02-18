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

  function mapWordToLetterArray(){

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
          var newCase = {case: "", tempArray: []};

          for(var b=0; b<caseLength; b++){
            // var newCaseEntry = "";

            if(response[rowStartIndex+b].includes("|case=")){
              newCase.case = deleteText(response[rowStartIndex+b], ["|case="]);
            }else{
              var newCaseEntry = response[rowStartIndex+b];
              newCase.tempArray.push(newCaseEntry);
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
