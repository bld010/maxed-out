export const setCurrentCandidate = candidate => ({
  type: 'SET_CURRENT_CANDIDATE',
  candidate: candidate
})

export const setCurrentCommitteeId = id => ({
  type: 'SET_CURRENT_COMMITTEE_ID',
  committee_id: id
})

export const setPacContributions = pac_contributions => ({
  type: 'SET_PAC_CONTRIBUTIONS',
  pacContributions: pac_contributions
})

export const setIndividualContributions = individual_contributions => ({
  type: 'SET_INDIVIDUAL_CONTRIBUTIONS', 
  individualContributions: individual_contributions
})