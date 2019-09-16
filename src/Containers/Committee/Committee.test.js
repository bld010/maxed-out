import React from 'react';
import { shallow } from 'enzyme';
import { Committee, mapStateToProps, mapDispatchToProps } from './Committee' 
import {searchCommitteeById,
        fetchIndividualContributions,
        fetchPACContributions,
        searchCandidateById } from '../../util/apiCalls';

jest.mock('../../util/apiCalls');

describe('Committee', () => {

  let wrapper;
  let mockSetPacContributions = jest.fn();
  let mockSetCurrentCommitteeId= jest.fn().mockImplementation(() => {
    wrapper.instance().committee_id = "XYZ";
    wrapper.update();
  });
  let mockSetIndividualContributions = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Committee 
      idFromMatch={"XYZ"} 
      candidate={{name: 'John Hickenlooper'}}
      committee_id={"ABC123"}
      setPacContributions={mockSetPacContributions}
      setCurrentCommitteeId={mockSetCurrentCommitteeId}
      setIndividualContributions={mockSetIndividualContributions}
      setCurrentCommitteeId = {mockSetCurrentCommitteeId}
      />)
  })

  it('should match the snapshot with correct data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    })
 


  describe('componentDidMount', () => {

    beforeEach(() => {
      searchCommitteeById.mockImplementation(() => {
        return Promise.resolve(
          [ {name: 'J', candidateIds: ["ABC123"]}, 
            {name: 'K', candidateIds: ["DEF123"]}, 
            {name: 'L', candidateIds: ["GHI123"]}])
      })

      searchCandidateById.mockImplementation(() => {
        return Promise.resolve([{ name: 'Joe'}] )
      })

      fetchIndividualContributions.mockImplementation(() => {
        return Promise.resolve([{amount: 5}, {amount: 7}])
      })

      fetchPACContributions.mockImplementation(() => {
        return Promise.resolve([{amount: 5}, {amount: 1}])
      })
    })
  
    it('should fire setCurrentCommitteeId if committee_id is null with the id from the url', async () => {
      delete global.window.location;
      global.window.location = { pathname: '/blah/123/committee/ABC123' }
      
      wrapper = shallow(<Committee 
        idFromMatch={undefined} 
        candidate={{name: 'John Hickenlooper'}}
        committee_id={null}
        setPacContributions={mockSetPacContributions}
        setCurrentCommitteeId={mockSetCurrentCommitteeId}
        setIndividualContributions={mockSetIndividualContributions}
        />)

        await wrapper.update()
      expect(mockSetCurrentCommitteeId).toHaveBeenCalledWith('ABC123')
    })
  })

})