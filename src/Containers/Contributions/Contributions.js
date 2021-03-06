import React, { Component} from 'react';
import { connect } from 'react-redux';
import './Contributions.scss';
import PropTypes from 'prop-types';

export class Contributions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  generateContributionList = () => {
    if (this.props.type === 'PAC' && this.props.pacContributions.length === 0 && this.props.candidate !== null) {
      return <h4>No {this.props.type} contributions found for the 2020 election cycle.</h4>
    }
    if (this.props.type === 'Individual' && this.props.individualContributions.length === 0 && this.props.candidate !== null) {
      return <h4>No {this.props.type} contributions found for the 2020 election cycle.</h4>
    }

    if(this.props.type === 'PAC' && this.props.pacContributions.length > 0) {
      return this.props.pacContributions.map((contribution, index) => {
        return <div className="contribution" key={index}>
          <h4>{contribution.contributor_name.toLowerCase()}: ${contribution.contribution_receipt_amount.toLocaleString()} ({contribution.two_year_transaction_period})</h4>
          <p>Type: {contribution.line_number_label}</p>
          <p>Memo: {contribution.memo_text}</p>
        </div>
      })
    }

    if ( this.props.type === 'Individual' && this.props.individualContributions.length > 0) {
      return this.props.individualContributions.map((contribution, index) => {
        return <div className="contribution" key={index}>
            <h4>{contribution.contributor_name.toLowerCase()}: $ {contribution.contribution_receipt_amount.toLocaleString()} ({contribution.two_year_transaction_period})</h4>
            <p>Employer: {contribution.contributor_employer} | Location: {contribution.contributor_city}, {contribution.contributor_state}
            </p>
          </div>
      })
    }
  }

  render() {
    return(
      <section className="Contributions">
        <h3>{this.props.type} Contributions</h3>
        {this.generateContributionList(this.props.type)}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate,
  committee_id: state.committee_id,
  pacContributions: state.pacContributions,
  individualContributions: state.individualContributions
})

export default connect(mapStateToProps)(Contributions)


Contributions.propTypes = {
  candidate: PropTypes.object,
  committee_id: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  individualContributions: PropTypes.array,
  pacContributions: PropTypes.array,
  type: PropTypes.string.isRequired
}


