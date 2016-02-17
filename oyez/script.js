$(document).ready(function(){
// Justices
  var oyezJusticeDataRoberts = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },
    justices: {
      scalia:{
        scaliaAuthor: {
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataScalia = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataKennedy = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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

  var oyezJusticeDataThomas = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataGinsburg = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataBreyer = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataAlito = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      sotomayor: {
        sotomayorMajorityJoinedTotal: 0, sotomayorMajorityJoinedTotalCaseIds: [],
        sotomayorMinorityJoinedTotal: 0, sotomayorMinorityJoinedTotalCaseIds: [],
        sotomayorConcurrenceJoinedTotal: 0, sotomayorConcurrenceJoinedTotalCaseIds: [],
        sotomayorConDissJoinedTotal: 0, sotomayorConDissJoinedTotalCaseIds: [],
        sotomayorJoinedTotal: 0, sotomayorJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataSotomayor = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
        alitoJoinedTotal: 0, alitoJoinedTotalCaseIds: [],
      },
      kagan: {
        kaganMajorityJoinedTotal: 0, kaganMajorityJoinedTotalCaseIds: [],
        kaganMinorityJoinedTotal: 0, kaganMinorityJoinedTotalCaseIds: [],
        kaganConcurrenceJoinedTotal: 0, kaganConcurrenceJoinedTotalCaseIds: [],
        kaganConDissJoinedTotal: 0, kaganConDissJoinedTotalCaseIds: [],
        kaganJoinedTotal: 0, kaganJoinedTotalCaseIds: [],
      }
    },

    justices: {
      roberts: {
        robertsAuthor: {
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          kaganMajorityOpinionAuthoredJoinedTotal: 0, kaganMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganMinorityOpinionAuthoredJoinedTotal: 0, kaganMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConcurrenceOpinionAuthoredJoinedTotal: 0, kaganConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kaganConDissOpinionAuthoredJoinedTotal: 0, kaganConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kaganOpinionAuthoredJoinedTotal: 0, kaganOpinionAuthoredJoinedTotalCaseIds: [],
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
  var oyezJusticeDataKagan = {
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
      withMajority: 0, withMajorityCaseIds: [],
      withMinority: 0, withMinorityCaseIds: [],
      withConcurrence: 0, withConcurrenceCaseIds: [],
      withConDiss: 0, withConDissCaseIds: [],
      opinionsJoinedTotalMathCheck: 0, opinionsJoinedTotalMathCheckCaseIds: [],
    },
    attendance: {
      casesVotedTotal: 0, casesVotedTotalCaseIds: [],
      casesNotVotedTotal: 0, casesNotVotedTotalCaseIds: [],
      casesTotalMathCheck: 0, casesTotalMathCheckCaseIds: [],
    },

    myOpinionJoiners: {
      roberts: {
        robertsMajorityJoinedTotal: 0, robertsMajorityJoinedTotalCaseIds: [],
        robertsMinorityJoinedTotal: 0, robertsMinorityJoinedTotalCaseIds: [],
        robertsConcurrenceJoinedTotal: 0, robertsConcurrenceJoinedTotalCaseIds: [],
        robertsConDissJoinedTotal: 0, robertsConDissJoinedTotalCaseIds: [],
        robertsJoinedTotal: 0, robertsJoinedTotalCaseIds: [],
      },
      scalia:{
        scaliaMajorityJoinedTotal: 0, scaliaMajorityJoinedTotalCaseIds: [],
        scaliaMinorityJoinedTotal: 0, scaliaMinorityJoinedTotalCaseIds: [],
        scaliaConcurrenceJoinedTotal: 0, scaliaConcurrenceJoinedTotalCaseIds: [],
        scaliaConDissJoinedTotal: 0, scaliaConDissJoinedTotalCaseIds: [],
        scaliaJoinedTotal: 0, scaliaJoinedTotalCaseIds: [],
      },
      kennedy: {
        kennedyMajorityJoinedTotal: 0, kennedyMajorityJoinedTotalCaseIds: [],
        kennedyMinorityJoinedTotal: 0, kennedyMinorityJoinedTotalCaseIds: [],
        kennedyConcurrenceJoinedTotal: 0, kennedyConcurrenceJoinedTotalCaseIds: [],
        kennedyConDissJoinedTotal: 0, kennedyConDissJoinedTotalCaseIds: [],
        kennedyJoinedTotal: 0, kennedyJoinedTotalCaseIds: [],
      },
      thomas: {
        thomasMajorityJoinedTotal: 0, thomasMajorityJoinedTotalCaseIds: [],
        thomasMinorityJoinedTotal: 0, thomasMinorityJoinedTotalCaseIds: [],
        thomasConcurrenceJoinedTotal: 0, thomasConcurrenceJoinedTotalCaseIds: [],
        thomasConDissJoinedTotal: 0, thomasConDissJoinedTotalCaseIds: [],
        thomasJoinedTotal: 0, thomasJoinedTotalCaseIds: [],
      },
      ginsburg: {
        ginsburgMajorityJoinedTotal: 0, ginsburgMajorityJoinedTotalCaseIds: [],
        ginsburgMinorityJoinedTotal: 0, ginsburgMinorityJoinedTotalCaseIds: [],
        ginsburgConcurrenceJoinedTotal: 0, ginsburgConcurrenceJoinedTotalCaseIds: [],
        ginsburgConDissJoinedTotal: 0, ginsburgConDissJoinedTotalCaseIds: [],
        ginsburgJoinedTotal: 0, ginsburgJoinedTotalCaseIds: [],
      },
      breyer: {
        breyerMajorityJoinedTotal: 0, breyerMajorityJoinedTotalCaseIds: [],
        breyerMinorityJoinedTotal: 0, breyerMinorityJoinedTotalCaseIds: [],
        breyerConcurrenceJoinedTotal: 0, breyerConcurrenceJoinedTotalCaseIds: [],
        breyerConDissJoinedTotal: 0, breyerConDissJoinedTotalCaseIds: [],
        breyerJoinedTotal: 0, breyerJoinedTotalCaseIds: [],
      },
      alito: {
        alitoMajorityJoinedTotal: 0, alitoMajorityJoinedTotalCaseIds: [],
        alitoMinorityJoinedTotal: 0, alitoMinorityJoinedTotalCaseIds: [],
        alitoConcurrenceJoinedTotal: 0, alitoConcurrenceJoinedTotalCaseIds: [],
        alitoConDissJoinedTotal: 0, alitoConDissJoinedTotalCaseIds: [],
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
          robertsMajorityOpinionAuthoredJoinedTotal: 0, robertsMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsMinorityOpinionAuthoredJoinedTotal: 0, robertsMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConcurrenceOpinionAuthoredJoinedTotal: 0, robertsConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          robertsConDissOpinionAuthoredJoinedTotal: 0, robertsConDissOpinionAuthoredJoinedTotalCaseIds: [],
          robertsOpinionAuthoredJoinedTotal: 0, robertsOpinionAuthoredJoinedTotalCaseIds: [],
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
          scaliaMajorityOpinionAuthoredJoinedTotal: 0, scaliaMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaMinorityOpinionAuthoredJoinedTotal: 0, scaliaMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConcurrenceOpinionAuthoredJoinedTotal: 0, scaliaConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaConDissOpinionAuthoredJoinedTotal: 0, scaliaConDissOpinionAuthoredJoinedTotalCaseIds: [],
          scaliaOpinionAuthoredJoinedTotal: 0, scaliaOpinionAuthoredJoinedTotalCaseIds: [],
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
          kennedyMajorityOpinionAuthoredJoinedTotal: 0, kennedyMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyMinorityOpinionAuthoredJoinedTotal: 0, kennedyMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConcurrenceOpinionAuthoredJoinedTotal: 0, kennedyConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyConDissOpinionAuthoredJoinedTotal: 0, kennedyConDissOpinionAuthoredJoinedTotalCaseIds: [],
          kennedyOpinionAuthoredJoinedTotal: 0, kennedyOpinionAuthoredJoinedTotalCaseIds: [],
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
          thomasMajorityOpinionAuthoredJoinedTotal: 0, thomasMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasMinorityOpinionAuthoredJoinedTotal: 0, thomasMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConcurrenceOpinionAuthoredJoinedTotal: 0, thomasConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          thomasConDissOpinionAuthoredJoinedTotal: 0, thomasConDissOpinionAuthoredJoinedTotalCaseIds: [],
          thomasOpinionAuthoredJoinedTotal: 0, thomasOpinionAuthoredJoinedTotalCaseIds: [],
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
        ginsburgAuthor:{
          ginsburgMajorityOpinionAuthoredJoinedTotal: 0, ginsburgMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgMinorityOpinionAuthoredJoinedTotal: 0, ginsburgMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConcurrenceOpinionAuthoredJoinedTotal: 0, ginsburgConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgConDissOpinionAuthoredJoinedTotal: 0, ginsburgConDissOpinionAuthoredJoinedTotalCaseIds: [],
          ginsburgOpinionAuthoredJoinedTotal: 0, ginsburgOpinionAuthoredJoinedTotalCaseIds: [],
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
          breyerMajorityOpinionAuthoredJoinedTotal: 0, breyerMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerMinorityOpinionAuthoredJoinedTotal: 0, breyerMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConcurrenceOpinionAuthoredJoinedTotal: 0, breyerConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          breyerConDissOpinionAuthoredJoinedTotal: 0, breyerConDissOpinionAuthoredJoinedTotalCaseIds: [],
          breyerOpinionAuthoredJoinedTotal: 0, breyerOpinionAuthoredJoinedTotalCaseIds: [],
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
          alitoMajorityOpinionAuthoredJoinedTotal: 0, alitoMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoMinorityOpinionAuthoredJoinedTotal: 0, alitoMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConcurrenceOpinionAuthoredJoinedTotal: 0, alitoConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          alitoConDissOpinionAuthoredJoinedTotal: 0, alitoConDissOpinionAuthoredJoinedTotalCaseIds: [],
          alitoOpinionAuthoredJoinedTotal: 0, alitoOpinionAuthoredJoinedTotalCaseIds: [],
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
          sotomayorMajorityOpinionAuthoredJoinedTotal: 0, sotomayorMajorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorMinorityOpinionAuthoredJoinedTotal: 0, sotomayorMinorityOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConcurrenceOpinionAuthoredJoinedTotal: 0, sotomayorConcurrenceOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorConDissOpinionAuthoredJoinedTotal: 0, sotomayorConDissOpinionAuthoredJoinedTotalCaseIds: [],
          sotomayorOpinionAuthoredJoinedTotal: 0, sotomayorOpinionAuthoredJoinedTotalCaseIds: [],
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

  var oyezAllCasesData = [];

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

  var oyezAllOpinionData = {
    year: 0,
    totalMajorityAuthored: 0, totalMajorityAuthoredCaseIds: [],
    totalMinorityAuthored: 0, totalMinorityAuthoredCaseIds: [],
    totalConcurrenceAuthored: 0, totalConcurrenceAuthoredCaseIds: [],
    totalConDissAuthored: 0, totalConDissAuthoredCaseIds: [],
    totalOpinionsAuthored: 0, totalOpinionsAuthoredCaseIds: []
  };

  var oyezCasesPending = [];

  var oyezData = {
    year: 0,
    oyezAllCasesData: oyezAllCasesData,
    oyezAllJusticeData: oyezAllJusticeData,
    oyezAllOpinionData: oyezAllOpinionData
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
  // Reed v Gilbert -- many Concurrence votes
  // var oyez = "https://api.oyez.org/cases/2014/13-502";
  // Oberall v Hodges -- multiple many dissenting votes
  // var oyez = "https://api.oyez.org/cases/2014/14-556";
  // Glossip v Gross -- multiple dissent and Concurrence votes
  // var oyez = "https://api.oyez.org/cases/2014/14-7955";
  // Zivotofsky v Kerry -- 2 Decisions AND multi Concurrence, dissent, con dissent
  // var oyez = "https://api.oyez.org/cases/2014/13-628";
  //Horne v Agriculture -- Concurrence, dissent, con dissent
  // var oyez = "https://api.oyez.org/cases/2014/14-275";

  // 2014 cases
  var oyezYear = "https://api.oyez.org/cases?filter=term:2013&labels=true&page=0&per_page=0";

  var caseYear = 2013;
  var oyez = "";
  var oyezCaseNum = 0;
  // var oyezArray = ["https://api.oyez.org/cases/2014/13-628", "https://api.oyez.org/cases/2014/14-7955", "https://api.oyez.org/cases/2014/13-975"];


  // Collect all of the cases for a year in oyezArray
  var oyezArray = [];
  // var oyezArray = ["https://api.oyez.org/cases/2014/13-854", "https://api.oyez.org/cases/2014/13-435", "https://api.oyez.org/cases/2014/13-1402", "https://api.oyez.org/cases/2014/13-1032", "https://api.oyez.org/cases/2014/13-1032", "https://api.oyez.org/cases/2014/126_orig"];


  function oyezArrayAjax(){
    var url = oyezYear;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      for(var m = 0; m < response.length; m++){
        if(m !== "https://api.oyez.org/cases/2014/126_orig"){
          oyezArray.push(response[m].href);
          // every case gets their own box
          $(".allCases").append("<div class=\""+m+"Case case\"><h1 class=\""+m+"CaseTitle\"></h1></div>");
        }
      }
      console.log(oyezArray);
    });
  }

  $(".yearCollect").on("click", function(){
    oyezArrayAjax();

    // for(var n = 0; n < oyezArray.length; n++){
    //   // every case gets their own box
    //   $(".allCases").append("<div class=\""+n+"Case case\"><h1 class=\""+n+"CaseTitle\"></h1></div>");
    // }

  });


  function oyezAjax(num){
    var url = oyez;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);

      // set the year
      oyezAllOpinionData.year = caseYear;
      oyezData.year = caseYear;
      for(var g in oyezAllJusticeData){
        oyezAllJusticeData[g].year = caseYear;
      }
      if(response.decisons !== null){
        for(var a=0; a<response.decisions.length; a++){
          var justices = [];

          var opinionData = {caseName: "", docketNum: "", decisionNum: 0, decisionId: "", caseDecidedDate: "", caseDecidedDateUnix: 0, majVotes: 0, minVotes: 0, justices: justices, year: caseYear};
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
            // console.log(response.decisions[a].votes[y].member.last_name);
            var selectedVote = response.decisions[a].votes[y];

            var justice = {name: "", decision: "", authored: [], joined: [], casesVotedTotal: 0, casesNotVotedTotal: 0};
            justice.name = selectedVote.member.last_name;
            var selectJusticeLastName = selectedVote.member.last_name.toLowerCase();
            var selectJusticeOpinion = capitalizeFirstLetter(selectedVote.vote);
            var selectJustice = oyezAllJusticeData[selectJusticeLastName];

            if(selectedVote.vote === "none"){
              // if justice does not vote at all in the case
              justice.casesNotVotedTotal = justice.casesNotVotedTotal + 1;

              //add to total Justice data not voted total
              selectJustice.attendance.casesNotVotedTotal = selectJustice.attendance.casesNotVotedTotal + 1;
              selectJustice.attendance.casesNotVotedTotalCaseIds.push(opinionData.decisionId);
              selectJustice.attendance.casesTotalMathCheck = selectJustice.attendance.casesTotalMathCheck + 1;
              selectJustice.attendance.casesTotalMathCheckCaseIds.push(opinionData.decisionId);

            } else {
              // if justice does join the vote
              justice.casesVotedTotal = justice.casesVotedTotal + 1;
              justice.decision = selectedVote.vote;

              //Justice gets credit for voting, added to total of all cases
              selectJustice.attendance.casesVotedTotal = selectJustice.attendance.casesVotedTotal + 1;
              selectJustice.attendance.casesVotedTotalCaseIds.push(opinionData.decisionId);
              selectJustice.attendance.casesTotalMathCheck = selectJustice.attendance.casesTotalMathCheck + 1;
              selectJustice.attendance.casesTotalMathCheckCaseIds.push(opinionData.decisionId);
              // Voting credit then applied to justice majority or minority total
              selectJustice.courtAgreeance["with"+selectJusticeOpinion+"Totals"] = selectJustice.courtAgreeance["with"+selectJusticeOpinion+"Totals"] + 1;
              selectJustice.courtAgreeance["with"+selectJusticeOpinion+"TotalsCaseIds"].push(opinionData.decisionId);
              selectJustice.courtAgreeance.opinionsJoinedTotal = selectJustice.courtAgreeance.opinionsJoinedTotal + 1;
              selectJustice.courtAgreeance.opinionsJoinedTotalCaseIds.push(opinionData.decisionId);

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
                      // [compareJusticeLastName][compareJusticeLastName+"SidedWith"]
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithTotal"] = selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithTotal"] + 1;
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithTotalCaseIds"].push(opinionData.decisionId);
                      //specific opinion
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithAnd"+compareJusticeOpinion] = selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithAnd"+compareJusticeOpinion] + 1;
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"WithAnd"+compareJusticeOpinion+"CaseIds"].push(opinionData.decisionId);

                    }else{
                      // all same opinion totals
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithTotal"] = selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithTotal"] + 1;
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithTotalCaseIds"].push(opinionData.decisionId);
                      //specific opinion
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion] = selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion] + 1;
                      selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"NotWithAnd"+compareJusticeOpinion+"CaseIds"].push(opinionData.decisionId);
                    }
                    // add to total of compared (with and not with)
                    selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"TotalMathCheck"] = selectJustice.justices[compareJusticeLastName][compareJusticeLastName+"SidedWith"][compareJusticeLastName+"TotalMathCheck"] + 1;
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


                  var joinedJusticeLastName = "";
                  // find joined justice opinion in oyez ajax
                  var joinedJusticeOyezOpinion = capitalizeFirstLetter(joinedJusticeOyez[0].opinion_type);
                  if(joinedJusticeOyezOpinion === "Special concurrence"){
                    joinedJusticeOyezOpinion = "ConDiss";
                  }
                  if(joinedJusticeOyezOpinion === "Dissent"){
                    joinedJusticeOyezOpinion = "Minority";
                  }
                  if(joinedJusticeOyezOpinion === "Plurality"){
                    joinedJusticeOyezOpinion = "Majority";
                  }
                  // Troubleshooting, some errors in Oyez
                  if(joinedJusticeOyezOpinion === "None"){
                    console.log("PROBLEM");
                    selectedJusticeOpinion = selectedVote.vote;
                    if(selectedJusticeOpinion === "minority"){
                      selectedJusticeOpinion = "dissent";
                    }
                    for(var o = 0; o<response.decisions[a].votes.length; o++){
                      if(response.decisions[a].votes[o].opinion_type === selectedJusticeOpinion){
                        joinedJusticeOyez.pop();
                        joinedJusticeOyez.push(response.decisions[a].votes[o]);
                        joinedJusticeOyezOpinion = capitalizeFirstLetter(joinedJusticeOyez[0].opinion_type);
                        joinedJusticeLastName = joinedJusticeOyez[0].member.last_name.toLowerCase();
                      }
                    }
                    if(joinedJusticeOyezOpinion === "Dissent"){
                      joinedJusticeOyezOpinion = "Minority";
                    }
                  }else{
                    joinedJusticeLastName = selectedVote.joining[z].last_name.toLowerCase();
                  }

                  // find justices in my object
                  var joinedJustice = oyezAllJusticeData[joinedJusticeLastName];
                  // add to case data
                  justice.joined.push(selectedVote.joining[z].last_name);

                  // Selected justice joins author Justice opinion
                  // Total
                  selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+"OpinionAuthoredJoinedTotal"] = selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+"OpinionAuthoredJoinedTotal"] + 1;
                  selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+"OpinionAuthoredJoinedTotalCaseIds"].push(opinionData.decisionId);
                  // specific opinion
                  selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotal"] = selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotal"] + 1;
                  selectJustice.justices[joinedJusticeLastName][joinedJusticeLastName+"Author"][joinedJusticeLastName+joinedJusticeOyezOpinion+"OpinionAuthoredJoinedTotalCaseIds"].push(opinionData.decisionId);

                  // Joined Justice gets credit for selected Justice
                  // Total
                  joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+"JoinedTotal"] = joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+"JoinedTotal"] + 1;
                  joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+"JoinedTotalCaseIds"].push(opinionData.decisionId);
                  // specific opinion
                  joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotal"] = joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotal"] + 1;
                  joinedJustice.myOpinionJoiners[selectJusticeLastName][selectJusticeLastName+joinedJusticeOyezOpinion+"JoinedTotalCaseIds"].push(opinionData.decisionId);

                  //selected justice adds joined opionion to total of all joined opinions
                  //total
                  selectJustice.joined.opinionsJoinedTotalMathCheck = selectJustice.joined.opinionsJoinedTotalMathCheck + 1;
                  selectJustice.joined.opinionsJoinedTotalMathCheckCaseIds.push(opinionData.decisionId);
                  //specific opinion
                  selectJustice.joined["with"+joinedJusticeOyezOpinion] = selectJustice.joined["with"+joinedJusticeOyezOpinion] + 1;
                  selectJustice.joined["with"+joinedJusticeOyezOpinion+"CaseIds"].push({caseId: opinionData.decisionId, joinedJustice: joinedJusticeLastName});
                }
              }

              // Authorship - if justice has written their own opinion
              if(selectedVote.opinion_type !== "none"){
                // account for plurality
                var selectJusticeOyezOpinion = "";
                if(selectedVote.opinion_type === "plurality"){
                  selectJusticeOyezOpinion = "majority";
                }else{
                  selectJusticeOyezOpinion = selectedVote.opinion_type;
                }
                // add opinion to case data
                justice.authored.push({opinion: selectJusticeOyezOpinion});

                //get opinion type
                if(selectJusticeOyezOpinion === "special concurrence"){
                  selectJusticeOyezOpinion = "conDiss";
                }
                if(selectJusticeOyezOpinion === "dissent"){
                  selectJusticeOyezOpinion = "minority";
                }
                //add to my object in select justice
                // total authorship add
                selectJustice.authored.decisionsAuthored = selectJustice.authored.decisionsAuthored + 1;
                selectJustice.authored.decisionsAuthoredCaseIds.push({caseId: opinionData.decisionId, opinion: selectJusticeOyezOpinion});
                //specific opinion add
                selectJustice.authored[selectJusticeOyezOpinion+"Authored"] = selectJustice.authored[selectJusticeOyezOpinion+"Authored"] + 1;

                // console.log(selectJusticeOyezOpinion+"AuthoredCaseIds");
                selectJustice.authored[selectJusticeOyezOpinion+"AuthoredCaseIds"].push(opinionData.decisionId);

                //add to oyez all opinion data object
                var selectJusticeOyezOpinionCapitalized = capitalizeFirstLetter(selectJusticeOyezOpinion);
                // totals
                oyezAllOpinionData.totalOpinionsAuthored = oyezAllOpinionData.totalOpinionsAuthored + 1;
                oyezAllOpinionData.totalOpinionsAuthoredCaseIds.push({caseId: opinionData.decisionId, justice: selectJusticeLastName, opinion: selectJusticeOyezOpinion});
                // specific opinion
                oyezAllOpinionData["total"+selectJusticeOyezOpinionCapitalized+"Authored"] = oyezAllOpinionData["total"+selectJusticeOyezOpinionCapitalized+"Authored"] + 1;
                oyezAllOpinionData["total"+selectJusticeOyezOpinionCapitalized+"AuthoredCaseIds"].push(opinionData.decisionId);


              }
              // push justice info to case data
              justices.push(justice);
            }
          }
          // push case data into case database
          oyezAllCasesData.push(opinionData);

          // adjust html
          $("."+num+"CaseTitle").text(opinionData.caseName);
          $("."+num+"Case").append("<div class=\""+num+"Decision"+a+"\"></div><div class=\""+num+"CaseOpinions"+a+" allOpinions\"></div></div>");
          $("."+num+"Decision"+a).append("<h2>"+opinionData.majVotes+" - "+opinionData.minVotes+"</h2>");
          for(var l = 0; l<opinionData.justices.length; l++){
            $("."+num+"CaseOpinions"+a).append("<div class=\"opinion\"><div class=\""+opinionData.justices[l].decision+"\">"+opinionData.justices[l].name+"</div></div>");
          }


        }
      } else {
        oyezCasesPending.push(oyezArray[num]);
        console.log(oyezCasesPending);

      }
      console.log(oyezData);

    }).fail(function(){
      console.log("Ajax request fails!");
    });
  }

  $(".caseClick").on("click", function(){
    for(var h=0; h<oyezArray.length; h++){
      oyez = oyezArray[h];
      oyezCaseNum = h;
      oyezAjax(h);
    }
  });


});
