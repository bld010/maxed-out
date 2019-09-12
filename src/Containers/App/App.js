import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { Route } from 'react-router-dom';


export class App extends Component {


  componentDidMount = async () => {
    

  }

  generateCommitteeList = () => {
    return this.props.candidate.principal_committees.map(committee => {
      return <Committee key={committee.committee_id} committee={committee} />
    })
  }

  render() {

    let committeeList;

    if (this.props.candidate) {
      committeeList = this.generateCommitteeList()
    }

    return (
      <div className="App">
        <header className="App-header">
          <SearchForm />
          {this.props.candidate && <p>Candidate: {this.props.candidate.name}</p>}
          {this.props.candidate && <>{committeeList}</> }
        </header>

        <main> 
          <Route path='/committee/:id' render={({ match }) => {
            console.log(match)
            return(
              <p>Testing Route</p>
            )
          }} />
        </main>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate
})

export default connect(mapStateToProps)(App);

// PropTypes
