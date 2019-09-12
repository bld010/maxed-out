import React, { Component} from 'react';
import { fetchPACContributions } from '../../util/apiCalls';
// import { connect } from 'react-router-dom';
import './Contributions.scss';

export default class Contributions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: [],
      contributions_type: this.props.type,
      error: ''
    }
  }


  generateContributionList = () => {
    return this.state.contributions.map(contribution => {
      return <div className="contribution" key={contribution.transaction_id}>
        {contribution.contributor_name}: ${contribution.contribution_receipt_amount}
      </div>
    })
  }


  componentDidMount = async () => {
    try {
      if (this.state.contributions_type === 'PAC') {
        let pacContributions = await fetchPACContributions(this.props.committee_id);
        this.setState({
          contributions: pacContributions
        })
        console.log(pacContributions[0])
      }
      
    } catch (err) {
      this.setState({ error: err.message })
    }
  }


  render() {

    return(
      <section className="Contributions">
      <p>test</p>
      {this.state.contributions.length > 0 && <div>{this.generateContributionList()}</div>}
      </section>
    )
  }
}


//make a reducer to store pacContributions and indivContributions
// export const mapStateToProps = state => ({
//   candidate: state.candidate
// })

// export default connect(mapStateToProps, )


// propTYpes
// committee_id, type