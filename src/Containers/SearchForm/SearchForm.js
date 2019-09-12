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
    if (results) {
      this.props.setCurrentCandidate(results[0])
    } else {
      // throw an error to show on dom
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    let results = await searchCandidateByName(this.state.searchTerm);
    this.checkResultsBeforeUpdatingStore(results);
    console.log(results[0])
    this.clearInput();
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