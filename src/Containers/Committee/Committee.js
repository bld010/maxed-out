import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate, setCurrentCommitteeId, setPacContributions } from '../../actions/index';
import Contributions from '../Contributions/Contributions';
import { searchCommitteeById, searchCandidateById } from '../../util/apiCalls';
import './Committee.scss';


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
    this.props.setCurrentCommitteeId(this.props.committee_id);
    try {
      let committeeSearchResults = await searchCommitteeById(this.props.committee_id);      
      this.setState({ committee: committeeSearchResults})
      let candidate = await searchCandidateById(this.state.committee[0].candidate_ids[0])
      this.props.setCurrentCandidate(candidate[0])
    } catch (err) {
      this.setState({
        error: err.message
      })
    }
  }

  render() {
    return(

        <section className="Committee">
          {this.state.committee_id && <p>{this.state.committee.committee_id}</p>}
          {this.props.candidate && <p>{this.props.candidate.name}</p>}
          <div className="contributions">
            <Contributions type="Individual" />
            <Contributions type="PAC" />

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
  setCurrentCommitteeId: (committee_id) => dispatch(setCurrentCommitteeId(committee_id)),
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions))
})


export default connect(mapStateToProps, mapDispatchToProps)(Committee);

//PropTypes