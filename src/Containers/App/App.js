import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';


export class App extends Component {
  constructor() {
    super();
    this.state = {
      candidate: undefined,
      candidateId: undefined
    }
  }

  componentDidMount = async () => {
    

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchForm />
          {/* {this.state.candidate && <p>Candidate: {this.state.candidate.name}</p>} */}
        </header>
      </div>
    )
  }
}

export default App;
