import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { Route, NavLink } from 'react-router-dom';
import { setPacContributions, setIndividualContributions } from '../../actions';
import { fetchPACContributions, fetchIndividualContributions } from '../../util/apiCalls';
import SearchDisambiguation from '../../Components/SearchDisambiguation.js';


export class App extends Component {

  constructor(props) {
    super(props);
    this.getPacContributions = this.getPacContributions.bind(this);
  }

  componentDidMount = async () => {};

  getPacContributions = async (committee_id) => {
    try {
    let pacContributions = await fetchPACContributions(committee_id);
    this.props.setPacContributions(pacContributions);
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  getIndividualContributions = async (committee_id) => {
    try {
      let individualContributions = await fetchIndividualContributions(committee_id);
      this.props.setIndividualContributions(individualContributions)
    } catch (err) {
      this.setState({ error: err.message })
    }
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
        <NavLink to='/'>Home</NavLink>
          <SearchForm />
            <Route path='/candidate/:candidate_id' render={({match}) => {
              return ( <SearchDisambiguation candidate_id={match.params.candidate_id} /> )
          }} />
          
          
        </header>

        <main> 
          <Route path='/candidate/:candidate_id/committee/:id' render={({ match }) => {
            this.props.setPacContributions([]);
            this.getPacContributions(match.params.id);
            this.getIndividualContributions(match.params.id);
            return( <Committee committee_id={match.params.id}/> )
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
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

// PropTypes
