import React, { Component } from 'react';
import './App.scss';
import HowTo from '../../Components/HowTo';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { Route, NavLink } from 'react-router-dom';
import { setPacContributions, setIndividualContributions, setCurrentCommitteeId } from '../../actions';
import { fetchPACContributions, fetchIndividualContributions } from '../../util/apiCalls';
import SearchDisambiguation from '../SearchDisambiguation/SearchDisambiguation.js';
import PropTypes from 'prop-types';


export class App extends Component {

  constructor(props) {
    super(props);
    this.getPacContributions = this.getPacContributions.bind(this);
  }

  componentDidMount = async () => {
    if (this.props.committee_id) {
      await this.getPacContributions(this.props.committee_id)
      await this.getIndividualContributions(this.props.committee_id);
    }
  };

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
        <header>
          <h1>Maxed</h1>
          <NavLink className="nav" to='/'>Home</NavLink>
        </header>
        <main>
          <section className="search-and-disambiguation">
            <h2>Find A Candidate</h2>
            <SearchForm />
            <Route exact path='/candidate/:candidate_id' render={({match}) => {
              return ( <SearchDisambiguation candidate_id={match.params.candidate_id} /> )
            }} />
          </section>
          <section className="display"> 
            <Route path='/candidate/:candidate_id/committee/:committee_id' render={({match}) => {
              return( <Committee idFromMatch={match.params.committee_id} /> )
            }} />
            <Route exact path='/' render={() => {
              return( 
                  <div className="howTo">
                    <HowTo />
                  </div>
              )
            }} />
          </section>
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
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  candidate: PropTypes.object,
  committee_id: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object,
  setCurrentCommitteeId: PropTypes.func.isRequired,
  setIndividualContributions: PropTypes.func.isRequired,
  setPacContributions: PropTypes.func.isRequired
}
