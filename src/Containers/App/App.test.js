import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { shallow, mount } from 'enzyme';
import { setPacContributions, setCurrentCommitteeId, setIndividualContributions } from '../../actions/index'
import { fetchPACContributions, fetchIndividualContributions } from '../../util/apiCalls';

jest.mock('../../util/apiCalls.js');


let wrapper;
describe('App', () => {


  let mockSetPacContributions = jest.fn();
  let mockSetIndividualContributions = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App 
    candidate={{}}
    committee_id='mockId'
    setPacContributions={mockSetPacContributions}
    setIndividualContributions={mockSetIndividualContributions}
    />)
  })

  it('should match the snapshot with correct data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    it('should fire getPacContributions with the committee id', async () => {
     
      let mockGetPacContributions = jest.fn().mockReturnValue(Promise.resolve())
      wrapper.instance().getPacContributions = mockGetPacContributions;
      wrapper.update();
      wrapper.instance().componentDidMount();
      await Promise.resolve()
      expect(mockGetPacContributions).toHaveBeenCalledWith('mockId');
    })

    it('should fire getIndividualContributions with the committee id', async () => {
      
      let mockGetPacContributions = jest.fn().mockReturnValue(Promise.resolve())
      wrapper.instance().getPacContributions = mockGetPacContributions;
      let mockGetIndividualContributions = jest.fn().mockReturnValue(Promise.resolve());
      wrapper.instance().getIndividualContributions = mockGetIndividualContributions;
      wrapper.update();
      wrapper.instance().componentDidMount();
      await Promise.resolve()
      expect(mockGetIndividualContributions).toHaveBeenCalledWith('mockId');

    })
  })

  describe('getPacContributions', () => {
    it('should call fetchPACContributions with the committee id', () => {

      fetchPACContributions.mockImplementation(() => {
        return Promise.resolve({ results: [1, 2, 3]})
      })

      wrapper.instance().componentDidMount();
      expect(fetchPACContributions).toHaveBeenCalledWith('mockId');
    })

    it('should call setPacContributions with the results of the fetch', async () => {

      fetchPACContributions.mockImplementation(() => {
        return Promise.resolve({ results: [1, 2, 3]})
      })
      
      wrapper.instance().componentDidMount();
      await Promise.resolve();
      expect(mockSetPacContributions).toHaveBeenCalledWith({results: [1, 2, 3]});
    })

    })
  

  describe('getIndividualContributions', () => {

    it('should call fetchIndividualContributions with the committee id', async () => {

      fetchIndividualContributions.mockImplementation(() => {
        return Promise.resolve({ results: [1, 2, 3]})
      })
      wrapper.instance().getIndividualContributions();
      await Promise.resolve();
      expect(fetchIndividualContributions).toHaveBeenCalledWith('mockId');
    })

    it('should fire setIndividualContributions with the results of the fetch', async () => {

      fetchIndividualContributions.mockImplementation(() => {
        return Promise.resolve({ results: [1, 2, 3]})
      })
      
      wrapper.instance().getIndividualContributions();
      await Promise.resolve();
      expect(mockSetIndividualContributions).toHaveBeenCalled();
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

    it('should call dispatch on setPacContributions action with pac_contributions', () => {
      const mockPacContributions = [{ amount: 233 }, { amount: 7 }]
      const dispatchedSetPacContributionsAction = setPacContributions(mockPacContributions)
      mappedDispatchToProps.setPacContributions(mockPacContributions)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetPacContributionsAction)
    })

    it('should call dispatch on setCurrentCommitteeId action with committee id', () => {
      const mockId = "ABC123";
      const dispatchedSetCurrentCommitteeIdAction = setCurrentCommitteeId(mockId);

      mappedDispatchToProps.setCurrentCommitteeId(mockId);

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetCurrentCommitteeIdAction)

    })

    it('should call dispatch on setIndividualContributions action with individual_contributions', () => {
      const mockIndividualContributions = [{ amount: 233 }, { amount: 7 }]
      const dispatchedSetIndividualContributionsAction = setPacContributions(mockIndividualContributions)
      mappedDispatchToProps.setPacContributions(mockIndividualContributions)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedSetIndividualContributionsAction)
    })

    })
})

