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
  let mockSetCurrentCandidate = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Committee 
      idFromMatch={"XYZ"} 
      candidate={{name: 'John Hickenlooper'}}
      committee_id={"LMN890"}
      setPacContributions={mockSetPacContributions}
      setCurrentCommitteeId={mockSetCurrentCommitteeId}
      setIndividualContributions={mockSetIndividualContributions}
      setCurrentCandidate = {mockSetCurrentCandidate}
      />)
  })

  it('should match the snapshot with correct data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    })
 


  describe('componentDidMount', () => {

    beforeEach(() => {
      searchCommitteeById.mockImplementation(() => {
        return Promise.resolve(
          [ {name: 'J', candidate_ids: ["ABC123"]}, 
            {name: 'K', candidate_ids: ["DEF123"]}, 
            {name: 'L', candidate_ids: ["GHI123"]}])
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
      global.window.location = { pathname: '/blah/123/committee/RST123' }
      
      wrapper = shallow(<Committee 
        idFromMatch={undefined} 
        candidate={{name: 'John Hickenlooper'}}
        committee_id={null}
        setCurrentCandidate={mockSetCurrentCandidate}
        setPacContributions={mockSetPacContributions}
        setCurrentCommitteeId={mockSetCurrentCommitteeId}
        setIndividualContributions={mockSetIndividualContributions}
        />)

        await wrapper.update()
      expect(mockSetCurrentCommitteeId).toHaveBeenCalledWith('RST123')
    })

    it('should fire searchCommitteeById with the committee id', () => {

      expect(searchCommitteeById).toHaveBeenCalledWith("LMN890")
    })

    it('should fire searchCandidateById with candidate id', () => {
      expect(searchCandidateById).toHaveBeenCalledWith("ABC123")
    })

    it('should fire setCurrentCandidate with correct candidate object', () => {
      expect(mockSetCurrentCandidate).toHaveBeenCalledWith({ name: 'Joe'})
    })

    it('should fire fetchIndividualContributions with committe_id', () => {
      expect(fetchIndividualContributions).toHaveBeenCalledWith("LMN890")
    })

    it('should fire fetchPACContributions with committee_id', () => {
      expect(fetchPACContributions).toHaveBeenCalledWith("LMN890")
    })

    it('should fire setPacContributions with array of contributions from fetch', () => {
      expect(mockSetPacContributions).toHaveBeenCalledWith([{amount: 5}, {amount: 1}])
    })

  })

  describe('componentDidUpdate', () => {

    beforeEach(() => {
      searchCommitteeById.mockImplementation(() => {
        return Promise.resolve(
          [ {name: 'J', candidate_ids: ["ABC123"]}, 
            {name: 'K', candidate_ids: ["DEF123"]}, 
            {name: 'L', candidate_ids: ["GHI123"]}])
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

    it('should fire the try block if props change', () => {
      wrapper.setProps({committee_id: 'QRS345'})

      expect(mockSetCurrentCommitteeId.mock.calls[1]).toEqual(['QRS345']);

    })
  })

})