import React, { Component} from 'react';
import { fetchPACContributions } from '../../util/apiCalls';
import { connect } from 'react-redux';
import './Contributions.scss';
import { setPacContributions } from '../../actions/index'

export class Contributions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }


  generateContributionList = () => {
    return this.props.pacContributions.map(contribution => {
      return <div className="contribution" key={contribution.transaction_id}>
        {contribution.contributor_name}: ${contribution.contribution_receipt_amount}
      </div>
    })
  }


  componentDidMount = async () => {
    
    
  }


  render() {
    // console.log(this.props.setPacContributions)
    return(
      <section className="Contributions">
      <p>test</p>
      {this.props.pacContributions.length > 0 && <div>{this.generateContributionList()}</div>}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  candidate: state.candidate,
  committee_id: state.committee_id,
  pacContributions: state.pacContributions
})

export const mapDispatchToProps = dispatch => ({
  setPacContributions: pac_contributions => dispatch(setPacContributions(pac_contributions)),

})


export default connect(mapStateToProps, mapDispatchToProps)(Contributions)


// propTYpes
// committee_id, type, candidate, setPacCOntributions


