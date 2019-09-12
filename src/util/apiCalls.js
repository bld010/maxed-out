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