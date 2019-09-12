import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { Route, Link } from 'react-router-dom';


export class App extends Component {


  componentDidMount = async () => {
    

  }

  generateCommitteeList = () => {
  
    return this.props.candidate.principal_committees.map(committee => {
      const { name, state, committee_id, committee_type_full } = committee
      return (
        <Link to={`/committee/${committee_id}`}>
          <article className="Committee">
            <p>{name} ({state} {committee_type_full})</p>
          </article>
        </Link>
    )})
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
            console.log(match, 'match.params.id: committee ID')
            // this component's willMount() will fetch committee/candidate info
            return(
              <Committee committee_id={match.params.id}/>
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
