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
      error: ''
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
    if (results[0].name) {
      this.props.setCurrentCandidate(results[0]);
      this.resetError()
    }
  }

  resetError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let results = await searchCandidateByName(this.state.searchTerm);
      this.checkResultsBeforeUpdatingStore(results);
    } 
    catch (err) {
      this.setState({ error: `No candidate found with \n
      that name. Check your spelling and try again.` })
    }
    // this.clearInput();
  }

  render() {
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