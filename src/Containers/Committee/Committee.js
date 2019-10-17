import React, { Component } from 'react';
import { connect } from 'react-redux';
import Contributions from '../Contributions/Contributions';
import './Committee.scss';
import { 
  setCurrentCandidate, 
  setCurrentCommitteeId, 
  setPacContributions, 
  setIndividualContributions 
} from '../../actions/index';
import {  
  fetchPACContributions, 
  searchCommitteeById,
  searchCandidateById,
  fetchIndividualContributions 
} from '../../util/apiCalls';
import PropTypes from 'prop-types';


export class Committee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      committee: null,
      candidate: null,
      error: '',
      isLoading: false,
      key: this.props.matchPath,
      committee_id: this.props.committee_id || this.props.idFromMatch
    }
  }

  componentDidUpdate = async (prevProps) => {

    if (prevProps.committee_id !== this.props.committee_id) {
      this.setState({isLoading: true})

      try {
      await this.props.setCurrentCommitteeId(this.props.committee_id)
      let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
      this.setState({ committee: committeeSearchResults})

      let candidate = await searchCandidateById(this.state.committee[0].candidate_ids[0])
      this.props.setCurrentCandidate(candidate[0])

      let individualContributions = await fetchIndividualContributions(this.props.committee_id);
      this.props.setIndividualContributions(individualContributions)

      let pacContributions = await fetchPACContributions(this.props.committee_id);
      this.props.setPacContributions(pacContributions);

      this.setState({ isLoading: false})
      } catch (err) {
        this.setState({
          error: err.message,
          isLoading: false
        })
      }
    }
  }
  

  componentDidMount = async () => {
  
    this.setState({isLoading: true})
  
    try {
      if (this.props.committee_id === null) {
        let committee_id = window.location.pathname.split('/')[4]
        await this.props.setCurrentCommitteeId(committee_id)
      }

      let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
      this.setState({ committee: committeeSearchResults})
    
      let candidate = await searchCandidateById(this.state.committee[0].candidate_ids[0])
      this.props.setCurrentCandidate(candidate[0])
  
      let individualContributions = await fetchIndividualContributions(this.props.committee_id);
      this.props.setIndividualContributions(individualContributions)
  
      let pacContributions = await fetchPACContributions(this.props.committee_id);
      this.props.setPacContributions(pacContributions);
      this.setState({isLoading: false})
    } catch (err) { this.setState({error: err.message, isLoading:false}) }
  }

  render() {
  
    return(
      <section className="Committee">
        <div className="name-and-info">
          {!this.state.isLoading && <h2>{this.state.error}</h2>}
          {!this.state.isLoading && this.props.candidate && this.state.committee !== null && <>
            <h3>{this.props.candidate.name.toLowerCase().split(',').reverse().join(' ')}: {this.state.committee[0].name.toLowerCase()}</h3>
            </>}
        </div>
        <div className="contributions-container">
          {this.state.isLoading && <h2>Loading</h2>}
          {!this.state.isLoading && this.props.committee_id && <Contributions type="Individual" /> }
          {!this.state.isLoading && this.props.committee_id && <Contributions type="PAC" /> }
        </div>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate,
  committee_id: state.committee_id
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})


export default connect(mapStateToProps, mapDispatchToProps)(Committee);

Committee.propTypes = {
  setCurrentCandidate: PropTypes.func.isRequired,
  idFromMatch: PropTypes.string,
  candidate: PropTypes.object,
  committee_id: PropTypes.string,
  setCurrentCommitteeId: PropTypes.func.isRequired,
  setIndividualContributions: PropTypes.func.isRequired,
  setPacContributions: PropTypes.func.isRequired
}