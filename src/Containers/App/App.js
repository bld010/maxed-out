import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { setCurrentCommitteeId } from '../../actions/index';
import { Route, Link } from 'react-router-dom';


export class App extends Component {


  componentDidMount = async () => {
    

  }

  generateCommitteeList = () => {
  
    return this.props.candidate.principal_committees.map(committee => {
      const { name, state, committee_id, committee_type_full } = committee
      return (
        <Link to={`/committee/${committee_id}`}>
          <article onClick={() => this.props.setCurrentCommitteeId(committee_id)} className="Committee">
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
  candidate: state.candidate,
  committee_id: state.committee_id
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

// PropTypes
