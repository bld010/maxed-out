import React, { Component } from 'react';
import './SearchForm.scss';
import { searchCandidateByName } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCurrentCandidate } from '../../actions';
import PropTypes from 'prop-types';

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
      this.resetError()
    }
  }

  handleDisambiguationSelection = (campaign) => {
    this.props.setCurrentCandidate(campaign);
    this.setState({ 
      results: [],
      multipleEntries: false
     })
  }

  generateDisambiguationList = (results) => {
    return results.map(campaign => {
      return <p onClick={() => {this.handleDisambiguationSelection(campaign)}}>{campaign.office_full}</p>
    })
  }

  resetError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.setCurrentCandidate(null);
    
    try {
      let results = await searchCandidateByName(this.state.searchTerm);
      this.checkResultsBeforeUpdatingStore(results);
      console.log(results)
    } 
    catch (err) {
      this.setState({ error: `No candidate found with \n
      that name. Check your spelling and try again.` })
    }
    // this.clearInput();
  }

  render() {

    let disambiguationList;
    if (this.state.results.length >1 ) {
      disambiguationList = this.generateDisambiguationList(this.state.results)
    } 

    return(
      <form>
        <input 
          type='text' 
          value={this.state.searchTerm}
          name='searchTerm' 
          onChange={this.handleSearchInput} 
        />
        <button onClick={this.handleSubmit}>Search</button>
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.multipleEntries && <p>Select which campaign you'd like to look into. </p>}
        {this.state.multipleEntries && <>{disambiguationList}</> }
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate))
})

export default connect(null, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  setCurrentCandidate: PropTypes.func.isRequired
}

// update store with cleaned candidate object
// update store with candidate_id