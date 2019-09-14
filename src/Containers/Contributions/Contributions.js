import React, { Component} from 'react';
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
    if( this.props.type === 'PAC') {
      return this.props.pacContributions.map((contribution, index) => {
        return <div className="contribution" key={index}>
          {contribution.contributor_name}: ${contribution.contribution_receipt_amount}
        </div>
      })
    }
  }


  componentDidMount = async () => {
    
    
  }


  render() {
    
    return(
      <section className="Contributions">
        {this.props.pacContributions.length > 0 && this.generateContributionList(this.props.type)}
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


