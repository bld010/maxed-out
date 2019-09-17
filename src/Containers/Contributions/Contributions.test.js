import React from 'react';
import { shallow } from 'enzyme';

import { Contributions, mapStateToProps } from './Contributions'

describe('Contributions', () => {

  it('should match the snapshot with correct data passed in', () => {
    let wrapper = shallow(
    <Contributions
      type="PAC"
      pacContributions={[]}
      candidate={{name: 'Liz'}}
    />)

    expect(wrapper).toMatchSnapshot();
  })

  describe('generateContributionList', () => {

    describe('PAC contributions', () => {
      
      let mockContributions = [
        { contributor_name: 'David PAC', 
          contribution_receipt_amount: 234234,
          two_year_transaction_period: 2020,
          line_number_label: 'Memo',
          memo_text: 'This is a donation' },
        { contributor_name: 'Chris PAC', 
        contribution_receipt_amount: 234,
        two_year_transaction_period: 2020,
        line_number_label: 'Memo',
        memo_text: 'This is a donation' },
        { contributor_name: 'David & Chris PAC', 
        contribution_receipt_amount: 2,
        two_year_transaction_period: 2020,
        line_number_label: 'Memo',
        memo_text: 'This is a donation' }
      ]

      it('should return a no results message if no contributions, but candidate is found', () => {
        let wrapper = shallow(
          <Contributions
            type="PAC"
            pacContributions={[]}
            candidate={{name: 'Liz'}}
          />)

        let expected = 'No PAC contributions found for the 2020 election cycle.'
      
        let result = wrapper.instance().generateContributionList().props.children.join('')
        expect(result).toEqual(expected)
        
      })

      it('should return an array of JSX divs if contributions length is greater than 0', () => {
        let wrapper = shallow(
          <Contributions
            type="PAC"
            pacContributions={mockContributions}
            candidate={{name: 'Liz'}}
          />)

          let result = wrapper.instance().generateContributionList();
          expect(result.length).toEqual(3)
          expect(result[0].props.children[0].props.children[0]).toEqual('david pac')
      })
    })

    describe('Individual contributions', () => {
      
      let mockContributions = [
        { contributor_name: 'David PAC', 
          contribution_receipt_amount: 234234,
          two_year_transaction_period: 2020,
          contributor_state: 'CO',
          contributor_city: 'denver',
          contributor_employer: 'self employed'},
          { contributor_name: 'Chris PAC', 
          contribution_receipt_amount: 234,
          two_year_transaction_period: 2020,
          contributor_state: 'CO',
          contributor_city: 'denver',
          contributor_employer: 'self employed'},
          { contributor_name: 'David & Chris PAC', 
          contribution_receipt_amount: 2,
          two_year_transaction_period: 2020,
          contributor_state: 'CO',
          contributor_city: 'denver',
          contributor_employer: 'self employed'}
      ]

      it('should return a no results message if no contributions, but candidate is found', () => {
        let wrapper = shallow(
          <Contributions
            type="Individual"
            individualContributions={[]}
            candidate={{name: 'Liz'}}
          />)

        let expected = 'No Individual contributions found for the 2020 election cycle.'
      
        let result = wrapper.instance().generateContributionList().props.children.join('')
        expect(result).toEqual(expected)
        
      })

      it('should return an array of JSX divs if contributions length is greater than 0', () => {
        let wrapper = shallow(
          <Contributions
            type="Individual"
            individualContributions={mockContributions}
            candidate={{name: 'Liz'}}
          />)

          let result = wrapper.instance().generateContributionList();
          expect(result.length).toEqual(3)
          expect(result[0].props.children[0].props.children[0]).toEqual('david pac')
      })
    })
  })

  describe('mapStateToProps', () => {
    it('should return a candidate object and a committee_id', () => {
      const mockState = {
        candidate: { name: 'Dorvid' },
        committee_id: 'ABC123'
      }

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState)
    })
  })
})