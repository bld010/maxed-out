import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm, mapDispatchToProps } from './SearchForm';
import { searchCandidateByName } from '../../util/apiCalls.js';
import { setCurrentCandidate, 
         setPacContributions, 
         setIndividualContributions 
       } from '../../actions';

jest.mock('../../util/apiCalls.js')

describe('SearchForm', () => {

  let wrapper;

  let mockSetCurrentCandidate;
  let mockSetIndividualContributions;
  let mockSetPacContributions;

  let mockCampaign = {
    candidate_id: "HGI878",
    name: 'Pizza 4 All',
    state: 'CO',
    office_full: 'Dictator'
  }
  let mockResults = [mockCampaign, mockCampaign]


  beforeEach(() => {
    mockSetIndividualContributions = jest.fn();
    mockSetPacContributions = jest.fn();
    mockSetCurrentCandidate = jest.fn();

    searchCandidateByName.mockImplementation(() => {
      return Promise.resolve(mockResults)
    })

    wrapper = shallow(
    <SearchForm 
      setCurrentCandidate={mockSetCurrentCandidate}
      setPacContributions={mockSetPacContributions}
      setIndividualContributions={mockSetIndividualContributions}

    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSearchInput', () => {
    it('should update state with user input', () => {
      let mockEvent = { target: { value: 'OK'}};
  
      wrapper.instance().handleSearchInput(mockEvent);
  
      let expected = 'OK';
  
      expect(wrapper.state().searchTerm).toEqual(expected)
    })
  })

  describe('clearInput', () => {
    it('should clear the searchTerm in state', () => {
      wrapper.setState({searchTerm: 'Hello'});
      
      expect(wrapper.state().searchTerm).toEqual('Hello')

      wrapper.instance().clearInput();

      expect(wrapper.state().searchTerm).toEqual('');
    })
  })

  describe('checkResultsBeforeUpdatingStore', () => {

    it('should fire setCurrentCandidate with single result', () => {
      wrapper.instance().checkResultsBeforeUpdatingStore([mockCampaign]);
      expect(mockSetCurrentCandidate).toHaveBeenCalledWith(mockCampaign);
    })

    it('should fire setPacContributions when receiving single result', () => {
      wrapper.instance().checkResultsBeforeUpdatingStore([mockCampaign]);
      expect(mockSetPacContributions).toHaveBeenCalledWith([]);
    })

    it('should fire setIndividualContributions when receiving single result', () => {
      wrapper.instance().checkResultsBeforeUpdatingStore([mockCampaign]);
      expect(mockSetIndividualContributions).toHaveBeenCalledWith([]);
    })

    it('should fire resetError when receiving single result', () => {
      let mockResetError = jest.fn();

      wrapper.instance().resetError = mockResetError;
      wrapper.instance().checkResultsBeforeUpdatingStore([mockCampaign]);
      expect(mockResetError).toHaveBeenCalled();
    })
  })

  describe('handleCandidateDisambiguationSelection', () => {
    it('should fire setCurrentCandidate with campaign object', () => {
      wrapper.instance().handleCandidateDisambiguationSelection(mockCampaign)
      expect(mockSetCurrentCandidate).toHaveBeenCalledWith(mockCampaign)
    })

    it('should reset the state', () => {
      wrapper.setState({results: [1,3,4], multipleEntries: true})
      expect(wrapper.state().results).toEqual([1, 3, 4])
      expect(wrapper.state().multipleEntries).toEqual(true);

      wrapper.instance().handleCandidateDisambiguationSelection(mockCampaign);

      expect(wrapper.state().results).toEqual([]);
      expect(wrapper.state().multipleEntries).toEqual(false);
    })
  })

  describe('generateCandidateDisambiguationList', () => {
    it('should generate an array of JSX Links from the search results', () => {
      let results = wrapper.instance().generateCandidateDisambiguationList(mockResults);

      expect(results[0].key).toEqual('HGI8780')
      expect(results[1].key).toEqual('HGI8781')
    })
  })

  describe('resetError', () => {
    it('should reset the error in the state', () => {
      wrapper.setState({error: 'Hello'})
      expect(wrapper.state().error).toEqual('Hello');
      wrapper.instance().resetError();
      expect(wrapper.state().error).toEqual('');
    })
  })

  describe('handleSubmit', () => {
    
    it('should fire searchCandidateByName with the searchTerm', async () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.setState({searchTerm: 'Joe Biden'})
      wrapper.instance().handleSubmit(mockEvent)
      await expect(searchCandidateByName).toHaveBeenCalled()
    })

    it('should fire checkResultsBeforeUpdatingStore with results', async () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.setState({searchTerm: 'Joe Biden'})
      let mockCheckResultsBeforeUpdatingStore = jest.fn()
      wrapper.instance().checkResultsBeforeUpdatingStore = mockCheckResultsBeforeUpdatingStore
      await wrapper.instance().handleSubmit(mockEvent)
      expect(mockCheckResultsBeforeUpdatingStore).toHaveBeenCalled()
    })

    it('should fire resetError', async () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.setState({searchTerm: 'Joe Biden'});
      let mockResetError = jest.fn()
      wrapper.instance().checkResultsBeforeUpdatingStore = jest.fn();
      wrapper.instance().resetError = mockResetError;
      await wrapper.instance().handleSubmit(mockEvent)
      expect(mockResetError).toHaveBeenCalled();
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

    it('should call dispatch on setPacContributions action with pac_contributions', () => {
      const mockPacContributions = [{ amount: 233 }, { amount: 7 }]
      const dispatchedSetPacContributionsAction = setPacContributions(mockPacContributions)
      mappedDispatchToProps.setPacContributions(mockPacContributions)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetPacContributionsAction)
    })

    it('should call dispatch on setIndividualContributions action with individual_contributions', () => {
      const mockIndividualContributions = [{ amount: 233 }, { amount: 7 }]
      const dispatchedSetIndividualContributionsAction = setPacContributions(mockIndividualContributions)
      mappedDispatchToProps.setPacContributions(mockIndividualContributions)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetIndividualContributionsAction)
    })

  })
})