import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCandidate } from '../../actions/index';

class Committee extends Component {

  render() {

   
    console.log(this.props.committee)
    return(
      <>
      <p>Committee Name: {this.props.committee.name}</p>
      </>
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