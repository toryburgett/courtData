$(document).ready(function(){

  var wikiJson = "https://gist.githubusercontent.com/toryburgett/8f19b0635cb46cc62d6b/raw/2bb006b6dfa20aae0c393a0ac70f0de8e597cf05/wiki_2014.json";
  var year = 2014;

  var navRows = 0;

  var totalRows = 0;
  var rowStartIndex = 0;
  var rowEndIndex = 0;

  var allWikiCases = [];
  var allWikiData = {year: "", cases: allWikiCases};

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
          var title = response[a];
          title.replace("==", "");
          allWikiData.year = title;
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
          var newCase = [];
          for(var b=0; b<caseLength; b++){
            newCase.push(response[rowStartIndex+b]);
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
