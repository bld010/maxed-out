import React from 'react';
import { shallow } from 'enzyme';
import { setCurrentCommitteeId, setCurrentCandidate } from '../../actions';
import { SearchDisambiguation, mapStateToProps, mapDispatchToProps } from './SearchDisambiguation';
import { searchCandidateById } from '../../util/apiCalls';

jest.mock('../../util/apiCalls')

describe('SearchDisambiguation', () => {
  let mockCommittee = {
    name: 'Pizza 4 All', 
    state: 'CO', 
    committee_id: 'EFG345', 
    committee_type_full: 'Senate'
}
  let mockId = "ABC789"
  let mockCandidate = {
    name: 'Uno', 
    principal_committees: [
      mockCommittee,
      mockCommittee,
      mockCommittee,
      mockCommittee
    ]
  }

  let wrapper;
  let mockSetCurrentCommitteeId;
  let mockSetCurrentCandidate;

  searchCandidateById.mockImplementation(() => {
    return Promise.resolve([mockCandidate])
  })

  beforeEach(() => {

    mockSetCurrentCommitteeId = jest.fn();
    mockSetCurrentCandidate = jest.fn();

    wrapper = shallow(
      <SearchDisambiguation 
        setCurrentCommitteId={mockSetCurrentCommitteeId}
        setCurrentCandidate={mockSetCurrentCandidate}
        candidate={mockCandidate}
        committee_id={mockId}
      />)
  })

  it('should match the snapshot with correct data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('generateCommitteeList', () => {
    it('returns an array of Link elements for each committee', () => {
   

      let result = wrapper.instance().generateCommitteeList();
      expect(result.length).toEqual(4)
    })
  })

  describe('componentDidMount', () => {
    it('fires searchCandidateById with the candidate_id', async () => {
    
      let wrapper = shallow(
        <SearchDisambiguation 
          setCurrentCommitteId={mockSetCurrentCommitteeId}
          setCurrentCandidate={mockSetCurrentCandidate}
          candidate={mockCandidate}
          committee_id={mockId}
          candidate_id={'092384'}
        />)

      expect(searchCandidateById).toHaveBeenCalledWith('092384')
    })

    it('fires setCurrentCandidate with the candidate object', () => {
      let wrapper = shallow(
        <SearchDisambiguation 
          setCurrentCommitteId={mockSetCurrentCommitteeId}
          setCurrentCandidate={mockSetCurrentCandidate}
          candidate={mockCandidate}
          committee_id={mockId}
          candidate_id={'092384'}
        />)

      expect(mockSetCurrentCandidate).toHaveBeenCalledWith(mockCandidate)
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

  describe('mapDispatchToProps', () => {

    let mockDispatch;
    let mappedDispatchToProps;

    beforeEach(() => {
      mockDispatch = jest.fn();
      mappedDispatchToProps = mapDispatchToProps(mockDispatch)
    })


    it('should call dispatch on setCurrentCandidate action with committee id', () => {
      const mockId = "UML097";
      const dispatchedSetCurrentCandidateAction = setCurrentCandidate(mockId);

      mappedDispatchToProps.setCurrentCandidate(mockId);

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetCurrentCandidateAction)

    })


    it('should call dispatch on setCurrentCommitteeId action with committee id', () => {
      const mockId = "ABC123";
      const dispatchedSetCurrentCommitteeIdAction = setCurrentCommitteeId(mockId);

      mappedDispatchToProps.setCurrentCommitteeId(mockId);

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetCurrentCommitteeIdAction)

    })
  })
})