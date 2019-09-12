import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate } from '../../actions/index';
import { Link } from 'react-router-dom';
import { searchCommitteeById, searchCandidateById } from '../../util/apiCalls';

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
      
      
        <article className="Committee">
          {this.state.committee && <p>{this.state.committee.committee_id}</p>}
        </article>
     

    )

  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCandidate: candidate => dispatch(setCurrentCandidate(candidate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Committee);

//PropTypes