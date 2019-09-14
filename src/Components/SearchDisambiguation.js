import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPacContributions, setCurrentCandidate, setCurrentCommitteeId } from '../actions/index.js';
import { searchCandidateById } from '../util/apiCalls.js';


export class SearchDisambiguation extends Component {


  generateCommitteeList = () => {
  
    return this.props.candidate.principal_committees.map((committee, index) => {
      const { name, state, committee_id, committee_type_full } = committee
      return (
        <Link key={index} to={`/candidate/${this.props.candidate.candidate_id}/committee/${committee_id}`}>
          <article onClick={() => this.props.setCurrentCommitteeId(committee_id)} className="committee-disambiguation">
            <p>{name} ({state} {committee_type_full})</p>
          </article>
        </Link>
    )})
  }

  componentDidMount = async () => {

    try {
      let candidateSearchResults = await searchCandidateById(this.props.candidate_id)
      this.props.setCurrentCandidate(candidateSearchResults[0]);
      
      console.log(this.props)

    } catch (err) {
      console.error(err.message)
    }
    
    
  }
  
  render() {
    console.log(this.props)
    let committeeList; 

    if (this.props.candidate) {
        committeeList = this.generateCommitteeList()
      }

    return(
      <>
      {/* <Route path='/candidate/:candidate_id/committee/:committee_id' render={} */}
      <p>this is sa test</p>
      {this.props.candidate && <p>Candidate: {this.props.candidate.name}</p>}
      {this.props.candidate && <><div>Select a Campaign Committee</div>{committeeList}</> }
      </>
    )
  }
}



export const mapStateToProps = state => ({
  candidate: state.candidate,
  committee_id: state.committee_id
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisambiguation);
