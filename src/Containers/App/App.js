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
          <h1>Maxed-Out</h1>
          <NavLink className="nav" to='/'>Home</NavLink>
        </header>
        <main>
          <section className="search-and-disambiguation">
            <h2>Find Your Candidate</h2>
            <SearchForm />
            <Route path='/candidate/:candidate_id' render={({match}) => {
              return ( <SearchDisambiguation candidate_id={match.params.candidate_id} /> )
            }} />
          </section>
          <section className="display"> 
            <Route path='/candidate/:candidate_id/committee/:committee_id' render={({match}) => {
              return( <Committee idFromMatch={match.params.committee_id} /> )
            }} />
            <Route exact path='/' render={() => {
              return(
                <>
                  <div>
                    <h2>Is my favored presidential candidate accepting donations from organizations that align with my views?</h2>
                    <h2>Is my representative beholden to a certain industry? </h2>
                    <h2>What types of individuals are supporting my senator?</h2>
                    <p>Maxed-Out's mission is to get voters thinking about the money spent on
                      federal political campaigns. You'll be able to see individuals and organizations
                      that make the maximum allowable donations to a given campaign according to federal law. 
                    </p>
                  </div>
                  <div className="howTo">
                  <HowTo />
                  </div>
              </>
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

// PropTypes
