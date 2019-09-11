import React, { Component } from 'react';
import './SearchForm.scss';
import { searchCandidateByName } from '../../util/apiCalls';
export class SearchForm extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: ''
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

  handleSubmit = async (e) => {
    e.preventDefault();
    let candidate = await searchCandidateByName(this.state.searchTerm);
    console.log(candidate[0])
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

export default SearchForm;

// update store with cleaned candidate object
// update store with candidate_id