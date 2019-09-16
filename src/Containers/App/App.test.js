import React from 'react';
import { App } from './App';
import { shallow, mount } from 'enzyme';
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

  })

  describe('mapDispatchToProps', () => {

  })
})

