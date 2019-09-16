import React, { Component } from 'react';
import './SearchForm.scss';
import { searchCandidateByName } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCurrentCandidate, setPacContributions, setCurrentCommitteeId, setIndividualContributions } from '../../actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import SearchDisambiguation from '../../Components/SearchDisambiguation';

export class SearchForm extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: '',
      error: '',
      multipleEntries: false,
      results: [],

    }
  }

  handleSearchInput = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  clearInput = () => {
    this.setState({ searchTerm: ''});
    
  }

  checkResultsBeforeUpdatingStore = (results) => {
    if (results.length > 1) {
      this.setState({ 
        multipleEntries: true,
        results: results
      })
    } else if (results[0].name) {
      this.props.setCurrentCandidate(results[0]);
      this.setState({ results: results });
      this.resetError()
    }
  }

  handleCandidateDisambiguationSelection = (campaign) => {
    this.props.setCurrentCandidate(campaign);
    this.setState({ 
      results: [],
      multipleEntries: false
     })
  }

  generateCandidateDisambiguationList = (results) => {
    return results.map(campaign => {
      return (

        <Link to={`/candidate/${campaign.candidate_id}`}>
          <p className="candidate-disambiguation" 
          tabIndex={0} 
          key={campaign.candidate_id} 
          onClick={() => {this.handleCandidateDisambiguationSelection(campaign)}}>
          {campaign.name} ({campaign.state} {campaign.office_full})
          </p>
        </Link>
      )
      
    })
  }

  componentDidMount = () => {
  }

  resetError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.setCurrentCandidate(null);
    this.props.setPacContributions([]);
    this.props.setIndividualContributions([]);
    this.props.setCurrentCommitteeId(null);
    try {
      let results = await searchCandidateByName(this.state.searchTerm);
      this.checkResultsBeforeUpdatingStore(results);
      this.resetError();
      } 
    catch (err) {
      this.setState({ error: `No candidate found with \n
      that name. Check your spelling and try again.` })
    }
  }

  render() {
    let candidateDisambiguationList;

    if (this.state.results.length > 0 ) {
      candidateDisambiguationList = this.generateCandidateDisambiguationList(this.state.results)
    }

    return(
      <form className="SearchForm">
        <input 
          type='text' 
          value={this.state.searchTerm}
          name='searchTerm' 
          onChange={this.handleSearchInput} 
        />
        <button onClick={this.handleSubmit}>Search</button>
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.multipleEntries && <p>Select which campaign you'd like to look into. </p>}
        {candidateDisambiguationList}
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})

export default connect(null, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  setCurrentCandidate: PropTypes.func.isRequired
}

// update store with cleaned candidate object
// update store with candidate_id