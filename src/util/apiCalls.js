export const searchCandidateByName = async (searchTerm) => {

  let formattedSearchTerm = searchTerm.toLowerCase().split().join('%20')
  let url = `https://api.open.fec.gov/v1/candidates/search/?sort_null_only=false&sort_nulls_last=false&per_page=100&sort=name&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&sort_hide_null=false&name=${formattedSearchTerm}&page=1`


  try {
    let candidateSearchResult = await fetch(url)
    if (candidateSearchResult.ok === false) {
      throw new Error('There was an error searching for the candidate')
    }
    let results = await candidateSearchResult.json()
    return(results.results)
  } catch (err) {
    throw err
  }
}

export const searchCommitteeById = async (committee_id) => {
  let url = `https://api.open.fec.gov/v1/committee/${committee_id}/?sort=name&sort_null_only=false&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=100&sort_nulls_last=false&sort_hide_null=true&page=1`
  try {
    let committeeSearchResult = await fetch(url);
    if (committeeSearchResult.ok === false) {
      throw new Error('There was an error finding the requested committee')
    }
    let results = await committeeSearchResult.json();
    return(results.results)
  } catch(err) {
    throw err
  }

}

export const searchCandidateById = async (candidate_id) => {

  let url = `https://api.open.fec.gov/v1/candidates/search/?api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=50&candidate_id=${candidate_id}&sort_nulls_last=false&sort_hide_null=false&page=1&sort=name&sort_null_only=false`

  try {
    let candidateSearchResult = await fetch(url);
    if (candidateSearchResult.ok === false) {
      throw new Error ('There was an error searching for the candidate')
    }
    let results = await candidateSearchResult.json();
    return results.results
  } catch (err) {
    throw err
  }
}

export const fetchPACContributions = async (committee_id) => {

  let url = `https://api.open.fec.gov/v1/schedules/schedule_a/?sort_null_only=false&committee_id=${committee_id}&min_amount=5000&per_page=50&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&is_individual=false&sort_hide_null=false&sort=contribution_receipt_date&two_year_transaction_period=2020`

  try {
    let pacContributions = await fetch(url);
    if (pacContributions.ok === false) {
      throw new Error ('There was an error getting the PAC contributions')
    }
    let results = await pacContributions.json();
    return results.results
  } catch (err) {
    throw err
  }
}

export const fetchIndividualContributions = async (committee_id) => {

  let url = `https://api.open.fec.gov/v1/schedules/schedule_a/?sort_null_only=false&committee_id=${committee_id}&min_amount=2800&per_page=50&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&is_individual=true&sort_hide_null=false&sort=contribution_receipt_date&two_year_transaction_period=2020`

  try {
    let individualContributions = await fetch(url);
    if (individualContributions.ok === false) {
      throw new Error ('There was an error getting the PAC contributions')
    }
    let results = await individualContributions.json();
    return results.results
  } catch (err) {
    throw err
  }
}