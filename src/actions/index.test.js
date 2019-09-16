import {
  setCurrentCandidate,
  setCurrentCommitteeId,
  setPacContributions,
  setIndividualContributions
} from '../actions';

describe('actions', () => {

  describe('setCurrentCandidate', () => {
    it('should return an object with a candidate and correct type', () => {
      let mockCandidate = { name: 'Elizabeth Warren' }
      let expected = {
        type: 'SET_CURRENT_CANDIDATE', 
        candidate: mockCandidate
      } 

      expect(setCurrentCandidate(mockCandidate)).toEqual(expected)
    })
  })

  describe('setCurrentCommitteeId', () => {
    it('should return an object with committee id and correct type', () => {
      let mockId = "ABC123"
      let expected = {
        type: 'SET_CURRENT_COMMITTEE_ID', 
        committee_id: mockId
      }

      expect(setCurrentCommitteeId(mockId)).toEqual(expected)
    })
  })

  describe('setPacContributions', () => {
    it('should return an object with an array of contributions and the correct type', () => {
      let mockContributions = [{name: 'A'}, {name: 'B'}]
      let expected = {
        type: 'SET_PAC_CONTRIBUTIONS',
        pacContributions: mockContributions
      }

      expect(setPacContributions(mockContributions)).toEqual(expected)
    })
  })

  describe('setIndividualContributions', () => {
    it('should return an object with an array of contributions and the correct type', () => {
      let mockContributions = [{name: 'A'}, {name: 'B'}]
      let expected = {
        type: 'SET_INDIVIDUAL_CONTRIBUTIONS', 
        individualContributions: mockContributions
      }

      expect(setIndividualContributions(mockContributions)).toEqual(expected)
    })
  })
})