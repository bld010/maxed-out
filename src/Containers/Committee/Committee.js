import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate, setCurrentCommitteeId } from '../../actions/index';
import { Link } from 'react-router-dom';
import Contributions from '../Contributions/Contributions';
import { searchCommitteeById, searchCandidateById, fetchPACContributions } from '../../util/apiCalls';

class Committee extends Component {

  constructor(props) {
    super(props)
    this.state = {
      committee: null,
      candidate: null,
      error: ''
    }
  }



  componentDidMount = async () => {
    
    try {
      let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
      this.setState({
        committee: committeeSearchResults[0]
      })
      this.props.setCurrentCommitteeId(this.props.committee_id)
      let candidate = await searchCandidateById(this.state.committee.candidate_ids[0])
      this.props.setCurrentCandidate(candidate[0]);
    } catch (err) {
      this.setState({
        error: err.message
      })
    }

  }

  render() {

    return(
      
      
        <section className="Committee">
          {this.state.committee && <p>{this.state.committee.committee_id}</p>}
          {this.props.candidate && <p>{this.props.candidate.name}</p>}


          {this.state.committee && <Contributions type="PAC" committee_id={this.props.committee_id} />}
        </section>
     

    )

  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate)),
  setCurrentCommitteeId: (committee_id) => dispatch(setCurrentCommitteeId(committee_id))
})


export default connect(mapStateToProps, mapDispatchToProps)(Committee);

//PropTypes