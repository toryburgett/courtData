$(document).ready(function(){
// Justices
  var oyezJusticeDataRoberts = {
    name: "", lastName: "Roberts", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataScalia = {
    name: "", lastName: "Scalia", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataKennedy = {
    name: "", lastName: "Kennedy", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };

  var oyezJusticeDataThomas = {
    name: "", lastName: "Thomas", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataGinsburg = {
    name: "", lastName: "Ginsburg", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataBreyer = {
    name: "", lastName: "Breyer", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataAlito = {
    name: "", lastName: "Alito", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataSotomayor = {
    name: "", lastName: "Sotomayor", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],
    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
    kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
    kaganConcurranceJoinedTotal: 0, kaganConcurranceJoinedTotalCaseIds: [],
    kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
    kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConcurranceOpinionAuthoredJoinedTotal: 0, kaganConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
    kaganWithAndMajority: 0, kaganWithAndMajorityCaseIds: [],
    kaganWithAndMinority: 0, kaganWithAndMinorityCaseIds: [],
    kaganWithTotal: 0, kaganWithTotalCaseIds: [],
    kaganNotWithAndMajority: 0, kaganNotWithAndMajorityCaseIds: [],
    kaganNotWithAndMinority: 0, kaganNotWithAndMinorityCaseIds: [],
    kaganNotWithTotal: 0, kaganNotWithTotalCaseIds: [],
    kaganTotalMathCheck: 0
  };
  var oyezJusticeDataKagan = {
    name: "", lastName: "Kagan", year: 0,
    majorityAuthored: 0, majorityAuthoredCaseIds: [],
    minorityAuthored: 0, minorityAuthoredCaseIds: [],
    concurranceAuthored: 0, concurranceAuthoredCaseIds: [],
    conDissAuthored: 0, conDissAuthoredCaseIds: [],
    decisionsAuthored: 0, decisionsAuthoredCaseIds: [],

    withMajorityTotals: 0, withMajorityTotalsCaseIds: [],
    withMinorityTotals: 0, withMinorityTotalsCaseIds: [],
    opinionsJoinedTotal: 0, opinionsJoinedTotalCaseIds: [],
    withMajority: 0, withMajorityCaseIds: [],
    withMinority: 0, withMinorityCaseIds: [],
    withConcurrance: 0, withConcurranceCaseIds: [],
    withConDiss: 0, withConDissCaseIds: [],
    opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    casesVotedTotal: 0, casesVotedTotalCaseIds: [],
    casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
    casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],

    robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
    robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
    robertsConcurranceJoinedTotal: 0, robertsConcurranceJoinedTotalCaseIds: [],
    robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
    robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
    scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
    scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
    scaliaConcurranceJoinedTotal: 0, scaliaConcurranceJoinedTotalCaseIds: [],
    scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
    scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
    kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
    kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
    kennedyConcurranceJoinedTotal: 0, kennedyConcurranceJoinedTotalCaseIds: [],
    kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
    kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
    thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
    thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
    thomasConcurranceJoinedTotal: 0, thomasConcurranceJoinedTotalCaseIds: [],
    thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
    thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
    ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
    ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
    ginsburgConcurranceJoinedTotal: 0, ginsburgConcurranceJoinedTotalCaseIds: [],
    ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
    ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
    breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
    breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
    breyerConcurranceJoinedTotal: 0, breyerConcurranceJoinedTotalCaseIds: [],
    breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
    breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
    alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
    alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
    alitoConcurranceJoinedTotal: 0, alitoConcurranceJoinedTotalCaseIds: [],
    alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
    alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
    sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
    sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
    sotomayorConcurranceJoinedTotal: 0, sotomayorConcurranceJoinedTotalCaseIds: [],
    sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
    sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],

    robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConcurranceOpinionAuthoredJoinedTotal: 0, robertsConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
    robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
    robertsWithAndMajority: 0, robertsWithAndMajorityCaseIds: [],
    robertsWithAndMinority: 0, robertsWithAndMinorityCaseIds: [],
    robertsWithTotal: 0, robertsWithTotalCaseIds: [],
    robertsNotWithAndMajority: 0, robertsNotWithAndMajorityCaseIds: [],
    robertsNotWithAndMinority: 0, robertsNotWithAndMinorityCaseIds: [],
    robertsNotWithTotal: 0, robertsNotWithTotalCaseIds: [],
    robertsTotalMathCheck: 0,

    scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConcurranceOpinionAuthoredJoinedTotal: 0, scaliaConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
    scaliaWithAndMajority: 0, scaliaWithAndMajorityCaseIds: [],
    scaliaWithAndMinority: 0, scaliaWithAndMinorityCaseIds: [],
    scaliaWithTotal: 0, scaliaWithTotalCaseIds: [],
    scaliaNotWithAndMajority: 0, scaliaNotWithAndMajorityCaseIds: [],
    scaliaNotWithAndMinority: 0, scaliaNotWithAndMinorityCaseIds: [],
    scaliaNotWithTotal: 0, scaliaNotWithTotalCaseIds: [],
    scaliaTotalMathCheck: 0,

    kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConcurranceOpinionAuthoredJoinedTotal: 0, kennedyConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
    kennedyWithAndMajority: 0, kennedyWithAndMajorityCaseIds: [],
    kennedyWithAndMinority: 0, kennedyWithAndMinorityCaseIds: [],
    kennedyWithTotal: 0, kennedyWithTotalCaseIds: [],
    kennedyNotWithAndMajority: 0, kennedyNotWithAndMajorityCaseIds: [],
    kennedyNotWithAndMinority: 0, kennedyNotWithAndMinorityCaseIds: [],
    kennedyNotWithTotal: 0, kennedyNotWithTotalCaseIds: [],
    kennedyTotalMathCheck: 0,

    thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConcurranceOpinionAuthoredJoinedTotal: 0, thomasConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
    thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
    thomasWithAndMajority: 0, thomasWithAndMajorityCaseIds: [],
    thomasWithAndMinority: 0, thomasWithAndMinorityCaseIds: [],
    thomasWithTotal: 0, thomasWithTotalCaseIds: [],
    thomasNotWithAndMajority: 0, thomasNotWithAndMajorityCaseIds: [],
    thomasNotWithAndMinority: 0, thomasNotWithAndMinorityCaseIds: [],
    thomasNotWithTotal: 0, thomasNotWithTotalCaseIds: [],
    thomasTotalMathCheck: 0,

    ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConcurranceOpinionAuthoredJoinedTotal: 0, ginsburgConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
    ginsburgWithAndMajority: 0, ginsburgWithAndMajorityCaseIds: [],
    ginsburgWithAndMinority: 0, ginsburgWithAndMinorityCaseIds: [],
    ginsburgWithTotal: 0, ginsburgWithTotalCaseIds: [],
    ginsburgNotWithAndMajority: 0, ginsburgNotWithAndMajorityCaseIds: [],
    ginsburgNotWithAndMinority: 0, ginsburgNotWithAndMinorityCaseIds: [],
    ginsburgNotWithTotal: 0, ginsburgNotWithTotalCaseIds: [],
    ginsburgTotalMathCheck: 0,

    breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConcurranceOpinionAuthoredJoinedTotal: 0, breyerConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
    breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
    breyerWithAndMajority: 0, breyerWithAndMajorityCaseIds: [],
    breyerWithAndMinority: 0, breyerWithAndMinorityCaseIds: [],
    breyerWithTotal: 0, breyerWithTotalCaseIds: [],
    breyerNotWithAndMajority: 0, breyerNotWithAndMajorityCaseIds: [],
    breyerNotWithAndMinority: 0, breyerNotWithAndMinorityCaseIds: [],
    breyerNotWithTotal: 0, breyerNotWithTotalCaseIds: [],
    breyerTotalMathCheck: 0,

    alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConcurranceOpinionAuthoredJoinedTotal: 0, alitoConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
    alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
    alitoWithAndMajority: 0, alitoWithAndMajorityCaseIds: [],
    alitoWithAndMinority: 0, alitoWithAndMinorityCaseIds: [],
    alitoWithTotal: 0, alitoWithTotalCaseIds: [],
    alitoNotWithAndMajority: 0, alitoNotWithAndMajorityCaseIds: [],
    alitoNotWithAndMinority: 0, alitoNotWithAndMinorityCaseIds: [],
    alitoNotWithTotal: 0, alitoNotWithTotalCaseIds: [],
    alitoTotalMathCheck: 0,

    sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConcurranceOpinionAuthoredJoinedTotal: 0, sotomayorConcurranceOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
    sotomayorWithAndMajority: 0, sotomayorWithAndMajorityCaseIds: [],
    sotomayorWithAndMinority: 0, sotomayorWithAndMinorityCaseIds: [],
    sotomayorWithTotal: 0, sotomayorWithTotalCaseIds: [],
    sotomayorNotWithAndMajority: 0, sotomayorNotWithAndMajorityCaseIds: [],
    sotomayorNotWithAndMinority: 0, sotomayorNotWithAndMinorityCaseIds: [],
    sotomayorNotWithTotal: 0, sotomayorNotWithTotalCaseIds: [],
    sotomayorTotalMathCheck: 0,
  };

  var oyezData = [];

  var oyezAllJusticeData = {
    roberts: oyezJusticeDataRoberts,
    scalia: oyezJusticeDataScalia,
    kennedy: oyezJusticeDataKennedy,
    thomas: oyezJusticeDataThomas,
    ginsburg: oyezJusticeDataGinsburg,
    breyer: oyezJusticeDataBreyer,
    alito: oyezJusticeDataAlito,
    sotomayor: oyezJusticeDataSotomayor,
    kagan: oyezJusticeDataKagan
  };

  var oyezOpinionTotalData = {
    year: 0,
    totalMajorityAuthored: 0, totalMajorityAuthoredCaseIds: [],
    totalMinorityAuthored: 0, totalMinorityAuthoredCaseIds: [],
    totalConcurranceAuthored: 0, totalConcurranceAuthoredCaseIds: [],
    totalConDissAuthored: 0, totalConDissAuthoredCaseIds: [],
    totalOpinionsAuthored: 0, totalOpinionsAuthoredCaseIds: []
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = days[a.getDay()];
    var time = day + ' ' + month + ' ' + date + ', ' + year;
    return time;
  }

  // Not sure what case this is....
  // var oyez = "https://api.oyez.org/cases/2014/13-553?labels=true";
  // T-Mobile Case
  // var oyez = "https://api.oyez.org/cases/2014/13-975?labels=true";
  // Commil v Cisco -- Breyer does not vote in this case VVV
  // var oyez = "https://api.oyez.org/cases/2014/13-896";
  // Reed v Gilbert -- many Concurrance votes
  // var oyez = "https://api.oyez.org/cases/2014/13-502";
  // Oberall v Hodges -- multiple many dissenting votes
  // var oyez = "https://api.oyez.org/cases/2014/14-556";
  // Glossip v Gross -- multiple dissent and Concurrance votes
  // var oyez = "https://api.oyez.org/cases/2014/14-7955";
  // Zivotofsky v Kerry -- 2 Decisions AND multi Concurrance, dissent, con dissent
  var oyez = "https://api.oyez.org/cases/2014/13-628";
  //Horne v Agriculture -- Concurrance, dissent, con dissent
  // var oyez = "https://api.oyez.org/cases/2014/14-275";

  // 2014 cases
  var oyezYear = "https://api.oyez.org/cases?filter=term:2014&labels=true&page=0&per_page=0";

  function oyezAjax(){
    var url = oyez;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      for(var a=0; a<response.decisions.length; a++){
        var justices = [];

        var opinionData = {caseName: "", docketNum: "", decisionNum: 0, decisionId: "", caseDecidedDate: "", caseDecidedDateUnix: 0, majVotes: 0, minVotes: 0, justices: justices};
        opinionData.caseName = response.name;
        opinionData.docketNum = response.docket_number;
        opinionData.decisionNum = response.decisions.length;
        var stringifyDecisionNum = a.toString();
        opinionData.decisionId = response.docket_number+"_"+stringifyDecisionNum;
        opinionData.majVotes = response.decisions[a].majority_vote;
        opinionData.minVotes = response.decisions[a].minority_vote;
        for(var f=0; f<response.timeline.length; f++){
          if(response.timeline[f].event === "Decided"){
            opinionData.caseDecidedDateUnix = response.timeline[f].dates[0];
            var date = timeConverter(response.timeline[f].dates[0]);
            opinionData.caseDecidedDate = date;
          }
        }



        for(var y=0; y<response.decisions[a].votes.length; y++){
          var selectedVote = response.decisions[a].votes[y];

          var justice = {name: "", decision: "", authored: [], joined: [], casesVotedTotal: 0, casesNotVotedTotal: 0, casesTotalMathCheck: 0};
          justice.name = selectedVote.member.last_name;
          var selectJusticeLastName = selectedVote.member.last_name.toLowerCase();
          var selectJusticeOpinion = capitalizeFirstLetter(selectedVote.vote);
          var selectJustice = oyezAllJusticeData[selectJusticeLastName];

          if(selectedVote.vote === "none"){
            // if justice does not vote at all in the case
            justice.casesNotVotedTotal = justice.casesNotVotedTotal + 1;

            //add to total Justice data not voted total
            selectJustice.casesNotVotedTotal = selectJustice.casesNotVotedTotal + 1;
            selectJustice.casesNotVotedTotalCaseIds.push(opinionData.decisionId);
            selectJustice.casesTotalMathCheck = selectJustice.casesTotalMathCheck + 1;
            selectJustice.casesTotalMathCheckCaseIds.push(opinionData.decisionId);

          } else {
            // if justice does join the vote
            justice.casesVotedTotal = justice.casesVotedTotal + 1;
            justice.decision = selectedVote.vote;

            //Justice gets credit for voting, added to total of all cases
            selectJustice.casesVotedTotal = selectJustice.casesVotedTotal + 1;
            selectJustice.casesVotedTotalCaseIds.push(opinionData.decisionId);
            selectJustice.casesTotalMathCheck = selectJustice.casesTotalMathCheck + 1;
            selectJustice.casesTotalMathCheckCaseIds.push(opinionData.decisionId);
            // Voting credit then applied to justice majority or minority total
            selectJustice["with"+selectJusticeOpinion+"Totals"] = selectJustice["with"+selectJusticeOpinion+"Totals"] + 1;
            selectJustice["with"+selectJusticeOpinion+"TotalsCaseIds"].push(opinionData.decisionId);
            selectJustice.opinionsJoinedTotal = selectJustice.opinionsJoinedTotal + 1;
            selectJustice.opinionsJoinedTotalCaseIds.push(opinionData.decisionId);

            //compare select justice opinion with all other justices
            for(var e=0; e<response.decisions[a].votes.length; e++){
              // do not compare justice with themself
              if(response.decisions[a].votes[e].member.last_name !== selectJustice.lastName){
                var compareJustice = response.decisions[a].votes[e];
                var compareJusticeLastName = compareJustice.member.last_name.toLowerCase();
                // do not compare justice if compareJustice did not vote
                if(compareJustice.vote !== "none"){
                  var compareJusticeOpinion = capitalizeFirstLetter(compareJustice.vote);
                  // compare Justice and selected justice have same opinion
                  if(compareJustice.vote === selectedVote.vote){
                    // all same opinion totals
                    selectJustice[compareJusticeLastName+"WithTotal"] = selectJustice[compareJusticeLastName+"WithTotal"] + 1;
                    selectJustice[compareJusticeLastName+"WithTotalCaseIds"].push(opinionData.decisionId);
                    //specific opinion
                    selectJustice[compareJusticeLastName+"WithAnd"+compareJusticeOpinion] = selectJustice[compareJusticeLastName+"WithAnd"+compareJusticeOpinion] + 1;
                    selectJustice[compareJusticeLastName+"WithAnd"+compareJusticeOpinion+"CaseIds"].push(opinionData.decisionId);

                  }else if((compareJustice.vote === "majority") && (compareJustice.vote === "minority") || (compareJustice.vote === "minority") && (compareJustice.vote === "majority")){
                    // all same opinion totals
                    selectJustice[compareJusticeLastName+"NotWithTotal"] = selectJustice[compareJusticeLastName+"NotWithTotal"] + 1;
                    selectJustice[compareJusticeLastName+"NotWithTotalCaseIds"].push(opinionData.decisionId);
                    //specific opinion
                    selectJustice[compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion] = selectJustice[compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion] + 1;
                    selectJustice[compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion+"CaseIds"].push(opinionData.decisionId);
                  }
                  // add to total of compared (with and not with)
                  selectJustice[compareJusticeLastName+"TotalMathCheck"] = selectJustice[compareJusticeLastName+"TotalMathCheck"] + 1;

                }
              }
            }


            // if select justice has joined an opinion...
            if(selectedVote.joining){
              for(var z=0; z<selectedVote.joining.length; z++){
                // find justices in Oyez
                var joinedJusticeOyez = [];
                for(var d = 0; d<response.decisions[a].votes.length; d++){
                  if(response.decisions[a].votes[d].member.last_name === selectedVote.joining[z].last_name){
                    joinedJusticeOyez.push(response.decisions[a].votes[d]);
                  }
                }

                // find joined justice opinion in oyez ajax
                var joinedJusticeOyezOpinion = capitalizeFirstLetter(joinedJusticeOyez[0].opinion_type);
                if(joinedJusticeOyezOpinion === "Special concurrence"){
                  joinedJusticeOyezOpinion = "ConDiss";
                }
                if(joinedJusticeOyezOpinion === "Dissent"){
                  joinedJusticeOyezOpinion = "Minority";
                }

                // find justices in my object
                var joinedJusticeLastName = selectedVote.joining[z].last_name.toLowerCase();
                var joinedJustice = oyezAllJusticeData[joinedJusticeLastName];
                justice.joined.push(selectedVote.joining[z].last_name);

                // Selected justice joins author Justice opinion
                // Total
                selectJustice[joinedJusticeLastName+"OpinionAuthoredJoinedTotal"] = selectJustice[joinedJusticeLastName+"OpinionAuthoredJoinedTotal"] + 1;
                selectJustice[joinedJusticeLastName+"OpinionAuthoredJoinedTotalCaseIds"].push(opinionData.decisionId);
                // specific opinion
                selectJustice[joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotal"] = selectJustice[joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotal"] + 1;
                selectJustice[joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotalCaseIds"].push(opinionData.decisionId);

                // Joined Justice gets credit for selected Justice
                // Total
                joinedJustice[selectJusticeLastName+"JoinedTotal"] = joinedJustice[selectJusticeLastName+"JoinedTotal"] + 1;
                joinedJustice[selectJusticeLastName+"JoinedTotalCaseIds"].push(opinionData.decisionId);
                // specific opinion
                joinedJustice[selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotal"] = joinedJustice[selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotal"] + 1;
                joinedJustice[selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotalCaseIds"].push(opinionData.decisionId);

                //selected justice adds joined opionion to total of all joined opinions
                //total
                selectJustice.opinionsJoinedTotalMathCheck = selectJustice.opinionsJoinedTotalMathCheck + 1;
                selectJustice.opinionsJoinedTotalMathCheckCaseIds.push(opinionData.decisionId);
                //specific opinion
                selectJustice["with"+joinedJusticeOyezOpinion] = selectJustice["with"+joinedJusticeOyezOpinion] + 1;
                selectJustice["with"+joinedJusticeOyezOpinion+"CaseIds"].push({caseId: opinionData.decisionId, joinedJustice: joinedJusticeLastName});

                justice.joined.push(selectedVote.joining[z].last_name);
              }
            }

            // if justice has written their own opinion
            if(selectedVote.opinion_type !== "none"){
              justice.authored.push({opinion: selectedVote.opinion_type});
            }
            justices.push(justice);






          }
          justice.casesTotalMathCheck = justice.casesTotalMathCheck + 1;

        }

        console.log(opinionData);
        oyezData.push(opinionData);
        console.log(oyezData);

      }
      console.log(oyezData);
      console.log(oyezAllJusticeData);

      $(".documentName").append("<div class=\"case\" id=\""+oyezData[0].docketNum+"\"></div>");
      $("#"+oyezData[0].docketNum).append("<h1>"+response.name+"</h1>");

      for(var b=0; b<oyezData.length; b++){
        $("#"+oyezData[0].docketNum).append("<h2>"+oyezData[b].majVotes+" - "+oyezData[b].minVotes+"</h2>");

        $("#"+oyezData[0].docketNum).append("<div class=\"allOpinions "+b+"\" id=\""+oyezData[b].decisionId+"\"></div>");


        for(var c=0; c<oyezData[b].justices.length; c++){
          var selJustice = oyezData[b].justices[c];
          var selJusticeOpinion = selJustice.decision;
          var joinedId = (oyezData[b].justices[c].joined.length + oyezData[b].justices[c].authored.length);

          $("#"+oyezData[b].decisionId).append("<div class=\"opinion\"><div class=\""+selJusticeOpinion+"\" id=\""+joinedId+"\">"+selJustice.name+"</div></div>");

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


});
