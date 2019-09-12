export const searchCandidateByName = async (searchTerm) => {

  let formattedSearchTerm = searchTerm.toLowerCase().split().join('%20')
  let url = `https://api.open.fec.gov/v1/candidates/search/?sort_null_only=false&sort_nulls_last=false&per_page=20&sort=name&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&sort_hide_null=false&name=${formattedSearchTerm}&page=1`


  try {
    let candidateSearchResult = await fetch(url)
    let results = await candidateSearchResult.json()
    if (results.ok === false) {
      throw new Error('There was an error searching for the candidate')
    }
    return(results.results)
  } catch (err) {
    throw err
  }
}

export const searchCommitteeById = async (committee_id) => {
  let url = `https://api.open.fec.gov/v1/committee/${committee_id}/?sort=name&sort_null_only=false&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=20&sort_nulls_last=false&sort_hide_null=true&page=1`

  try {
    let committeeSearchResult = await fetch(url);
    let results = await committeeSearchResult.json();
    if (results.ok === false) {
      throw new Error('There was an error finding the requested committee')
    }
    return(results.results)
  } catch(err) {
    throw err
  }

}

export const searchCandidateById = async (candidate_id) => {

  let url = `https://api.open.fec.gov/v1/candidates/search/?api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=20&candidate_id=${candidate_id}&sort_nulls_last=false&sort_hide_null=false&page=1&sort=name&sort_null_only=false
  `

  try {
    let candidateSearchResult = await fetch(url);
    let results = await candidateSearchResult.json();
    if (results.ok === false) {
      throw new Error ('There was an error searching for the candidate')
    }
    return results.results
  } catch (err) {
    throw err
  }
}

export const fetchPACContributions = async (committee_id) => {

  let url = `https://api.open.fec.gov/v1/schedules/schedule_a/?sort_null_only=false&committee_id=${committee_id}&per_page=20&min_amount=5000&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&min_date=2010-01-01&is_individual=false&sort_hide_null=false`

  try {
    let pacContributions = await fetch(url);
    let results = await pacContributions.json();
    if (results.ok === false) {
      throw new Error ('There was an error getting the PAC contributions')
    }
    return results.results
  } catch (err) {
    throw err
  }
}