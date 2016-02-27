// Justices
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
