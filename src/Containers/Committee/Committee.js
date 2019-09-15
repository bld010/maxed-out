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
      isLoading: false
    }
  }


  componentDidMount = async () => {
    this.setState({ isLoading: true} )
    this.props.setCurrentCommitteeId(this.props.committee_id);
    
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
      this.setState({
        error: err.message,
        isLoading: false
      })
    }
  }

  render() {
    return(

        <section className="Committee">
          {this.state.committee_id && <p>{this.state.committee.committee_id}</p>}
          {this.props.candidate && <p>{this.props.candidate.name}</p>}
          <div className="contributions">
            <p>Note: Individuals are limited to $2,800 per campaign, while PACs are limited to $5000 per campaign. 
              Donations from local/district/state/national party committees are subject to higher limits. 
              <a href="https://www.fec.gov/introduction-campaign-finance/understanding-ways-support-federal-candidates/"
                target="_blank" rel="noopener noreferrer">
              (Read more about federal campaign finance law on the Federal Election Commission's Website)</a></p>
              {!this.state.isLoading &&<Contributions type="Individual" /> }
              {!this.state.isLoading && <Contributions type="PAC" /> }
          </div>
        </section>
    )

  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate

})

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
  setCurrentCommitteeId: committee_id => dispatch(setCurrentCommitteeId(committee_id)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),
  setIndividualContributions: individual_contributions => dispatch(setIndividualContributions(individual_contributions))
})


export default connect(mapStateToProps, mapDispatchToProps)(Committee);

//PropTypes