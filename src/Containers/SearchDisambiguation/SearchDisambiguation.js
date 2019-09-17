import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentCandidate, setCurrentCommitteeId } from '../../actions/index.js';
import { searchCandidateById } from '../../util/apiCalls.js';
import './SearchDisambiguation.scss';
import PropTypes from 'prop-types';


export class SearchDisambiguation extends Component {

  generateCommitteeList = () => {
    return this.props.candidate.principal_committees.map((committee, index) => {
      const { name, state, committee_id, committee_type_full } = committee
      return (
        <Link 
          key={index} 
          to={`/candidate/${this.props.candidate.candidate_id}/committee/${committee_id}`}>
          <button onClick={() => this.props.setCurrentCommitteeId(committee_id)} className="committee-disambiguation">
            {name} ({state} {committee_type_full})
          </button>
        </Link>
    )})
  }

  componentDidMount = async () => {
    try {
      let candidateSearchResults = await searchCandidateById(this.props.candidate_id)
      this.props.setCurrentCandidate(candidateSearchResults[0]);
    } catch (err) {
      console.error(err.message)
    }
  }
  
  render() {

    let committeeList; 

    if (this.props.candidate) {
        committeeList = this.generateCommitteeList()
      }

    if (committeeList !== undefined && committeeList.length === 0) {
      return (
        <h2>No campaign committees found for {this.props.candidate.name}.</h2>
      )
    }

    return(
      <div className="SearchDisambiguation">
        {this.props.candidate && <p>Candidate: {this.props.candidate.name}</p>}
        {this.props.candidate && <><p>Select a Campaign Committee: </p> {committeeList}</> }
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate,
  committee_id: state.committee_id
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisambiguation);

SearchDisambiguation.propTypes = {
  setCurrentCandidate: PropTypes.func.isRequired,
  setCurrentCommitteeId: PropTypes.func.isRequired,
  candidate_id: PropTypes.string,
  committee_id: PropTypes.string,
  candidate: PropTypes.object
}