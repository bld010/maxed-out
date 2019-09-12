import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate } from '../../actions/index';
import { Link } from 'react-router-dom';

class Committee extends Component {

  render() {

    const { name, committee_type_full, state, committee_id } = this.props.committee
   
    console.log(this.props.committee)
    return(
      
      <Link to={`/committee/${committee_id}`}>
        <article className="Committee">
          <p>{name} ({state} {committee_type_full})</p>
        </article>
      </Link>

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