import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { Route, NavLink } from 'react-router-dom';
import { setPacContributions, setIndividualContributions } from '../../actions';
import { fetchPACContributions, fetchIndividualContributions } from '../../util/apiCalls';
import SearchDisambiguation from '../SearchDisambiguation/SearchDisambiguation.js';


export class App extends Component {

  constructor(props) {
    super(props);
    this.getPacContributions = this.getPacContributions.bind(this);
  }

  componentDidMount = async () => {
    if (this.props.committee_id) {
      this.getPacContributions(this.props.committee_id)
      this.getIndividualContributions(this.props.params.id);
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
            <Route path='/candidate/:candidate_id/committee/:id' render={({ match }) => {
              return( <Committee committee_id={match.params.id}/> )
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
                <h3>Here's how:</h3>
                <ul>
                  <li>Search for a candidate above.</li>
                  <li>If a candidate has run for more than one federal office, select which
                    campaign you're interested in. </li> 
                  <li>Campaign spending is done through campaign committees that are direclty associated
                    with a candidate's campaign. Sometimes there are more than one. Choose one to see which
                    individuals and Political Action Committees (PACs) are donating the maximum allowable amount
                    to a given campaign. 
                  </li>
                </ul>
                </div>
                <div className="faq">
                  <h3>Did you know?</h3>
                  <p>Not all election spending is targeted to a specific candidate's campaign. </p>
                  <p>While Maxed-Out uses public information from the Federal Election Commission,
                    it can only show donations made directly to a campaign committee.
                  </p>
                  <p>Hundreds of millions of dollars are spent to support or defeat political campaigns
                    by organizations that do not need to disclose their donors due to being classified as 
                    non-profit. 
                  </p>
                  <p>So called Super-PACs are one classification of organizations that can raise
                    unlimited, undisclosed donations, but may not donate to or coordinate directly with
                    a particular campaign. 
                    <a href="https://www.opensecrets.org/pacs/superpacs.php" target="_blank" rel="noopener noreferrer">
                    (Read more about Super-PACs on OpenSecrets.org.)</a>

                  </p>
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
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

// PropTypes
