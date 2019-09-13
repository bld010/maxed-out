import React, { Component } from 'react';
import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import { connect } from 'react-redux';
import Committee from '../Committee/Committee';
import { setCurrentCommitteeId } from '../../actions/index';
import { Route, Link } from 'react-router-dom';
import { setPacContributions, setCurrentCandidate } from '../../actions';
import { fetchPACContributions, searchCandidateById } from '../../util/apiCalls';


export class App extends Component {

  constructor(props) {
    super(props);
    this.getPacContributions = this.getPacContributions.bind(this);
    this.searchCandidateById = searchCandidateById.bind(this);
  }

  componentDidMount = async () => {
    

  }


  getPacContributions = async (committee_id) => {
    try {
    let pacContributions = await fetchPACContributions(committee_id);
    this.props.setPacContributions(pacContributions);
    } catch (err) {
      this.setState({ error: err.message })
    }
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
            this.getPacContributions(match.params.id);
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
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

// PropTypes
