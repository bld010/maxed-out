import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate, setCurrentCommitteeId, setPacContributions, setIndividualContributions } from '../../actions/index';
import Contributions from '../Contributions/Contributions';
import { 
  searchCommitteeById, 
  searchCandidateById, 
  fetchPACContributions, 
  fetchIndividualContributions 
} from '../../util/apiCalls';
import './Committee.scss';


class Committee extends Component {

  constructor(props) {
    super(props)
    this.state = {
      committee: null,
      candidate: null,
      error: '',
      isLoading: false,
<<<<<<< Updated upstream
=======
      key: this.props.matchPath,
      committee_id: this.props.committee_id
>>>>>>> Stashed changes
    }
  }


<<<<<<< Updated upstream
  componentDidMount = async () => {
    this.setState({ isLoading: true} )
    this.props.setCurrentCommitteeId(this.props.committee_id);
    
=======
  componentDidUpdate = async () => {

    //this works on clicking a link ... but why arent these fetches happening when you navigate directly to al ink?    

    if (this.props.committee_id !== this.state.committee_id) {
      
>>>>>>> Stashed changes
    
    try {
      let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
      this.setState({ committee: committeeSearchResults})

      let candidate = await searchCandidateById(this.state.committee[0].candidate_ids[0])
      this.props.setCurrentCandidate(candidate[0])

      let individualContributions = await fetchIndividualContributions(this.props.committee_id);
      console.log(individualContributions)
      this.props.setIndividualContributions(individualContributions)

      
      let pacContributions = await fetchPACContributions(this.props.committee_id);
      this.props.setPacContributions(pacContributions);

      this.setState({ isLoading: false})
    } catch (err) {
      console.log(err.message)
      this.setState({
        error: err.message,
        isLoading: false
      })
    }
    }
  }

  componentDidMount = async () => {
    
  
      this.setState({isLoading: true})
      this.setState({committee_id: this.props.committee_id})

      try {
        let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
        this.setState({ committee: committeeSearchResults})
        console.log(this.state)
      
        let candidate = await searchCandidateById(this.state.committee[0].candidate_ids[0])
        this.props.setCurrentCandidate(candidate[0])
    
        let individualContributions = await fetchIndividualContributions(this.props.committee_id);
        this.props.setIndividualContributions(individualContributions)
   
        let pacContributions = await fetchPACContributions(this.props.committee_id);
        this.props.setPacContributions(pacContributions);
      } catch (err) { this.setState({error: err.message, isLoading:false}) }

  
        
      
      
    
    
  }

  render() {
<<<<<<< Updated upstream
      console.log('rerendering committee')
=======
>>>>>>> Stashed changes
    return(

        <section className="Committee">
          <div className="name-and-info">
            {this.props.candidate && this.state.committee && <>
              <h3>{this.props.candidate.name}</h3>
              <p>{this.state.committee[0].name}</p>
              </>}
            </div>
            
          <div className="contributions-container">
          {this.state.isLoading && <h2>Loading</h2>}
            {!this.state.isLoading && <Contributions type="Individual" /> }
            {!this.state.isLoading && <Contributions type="PAC" /> }
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

//PropTypes