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
    wikiAllCasesData: wikiAllCasesData,
    wikiAllJusticeData: wikiAllJusticeData,
    wikiAllOpinionData: wikiAllOpinionData
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
