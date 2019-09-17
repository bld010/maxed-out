import React, { Component } from 'react';
import './SearchForm.scss';
import { searchCandidateByName } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCurrentCandidate, setPacContributions, setIndividualContributions } from '../../actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    } else {
      this.props.setCurrentCandidate(results[0]);
      this.props.setPacContributions([]);
      this.props.setIndividualContributions([]);
      this.setState({ results: results, multipleEntries: false });
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
    return results.map((campaign, index) => {
      return (
        <Link to={`/candidate/${campaign.candidate_id}`}
          tabIndex={0} 
          key={campaign.candidate_id + index} 
          onClick={() => {this.handleCandidateDisambiguationSelection(campaign)}}>
          <button className="candidate-disambiguation">{campaign.name} ({campaign.state} {campaign.office_full})</button> 
        </Link>
      )
    })
  }

  resetError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
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

    if (this.state.results.length > 1 ) {
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
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})

export default connect(null, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  setCurrentCandidate: PropTypes.func.isRequired
}
