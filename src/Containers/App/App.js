import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';


export class App extends Component {


  componentDidMount = async () => {
    

  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <SearchForm />
          {this.props.candidate && <p>Candidate: {this.props.candidate.name}</p>}
          {this.props.candidate && <Committee />}
        </header>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate
})

export default connect(mapStateToProps)(App);

// PropTypes
