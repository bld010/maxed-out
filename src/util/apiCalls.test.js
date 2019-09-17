import {
  searchCandidateByName,
  searchCommitteeById,
  searchCandidateById,
  fetchPACContributions,
  fetchIndividualContributions
} from './apiCalls';

describe('apiCalls', () => {
  

  describe('searchCandidateByName', () => {
    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [1,3,5]})
        })
      })

      let mockSearchTerm = "Barbara Walters";
      let expectedURL = `https://api.open.fec.gov/v1/candidates/search/?sort_null_only=false&sort_nulls_last=false&per_page=100&sort=name&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&sort_hide_null=false&name=barbara walters&page=1`
      searchCandidateByName(mockSearchTerm);
      expect(window.fetch).toHaveBeenCalledWith(expectedURL)
    })

    it('should return an array when successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [1,3,5]})
        })
      })

      let mockSearchTerm = "Barbara Walters";
      expect(searchCandidateByName(mockSearchTerm)).resolves
        .toEqual([1, 3, 5])
    })

    it('should throw an error if the results are not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({ ok: false }) 
      })
      let mockSearchTerm = "Barbara Walters";

      expect(searchCandidateByName(mockSearchTerm)).rejects
        .toEqual(Error('There was an error searching for the candidate'))
    })

    it('should throw an error if the promise is rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error'))
      })

      let mockSearchTerm = "Barbara Walters";

      expect(searchCandidateByName(mockSearchTerm)).rejects
        .toEqual(Error('There was an error'))
    })

  })

  describe('searchCommitteeById', () => {
    it('should call fetch with the correct url', () => {
      
    })
  })

  describe('searchCandidateById', () => {
    it('should call fetch with the correct url', () => {
      
    })
  })

  describe('fetchPACContributions', () => {
    it('should call fetch with the correct url', () => {
      
    })
  })

  describe('fetchIndividualContributions', () => {
    it('should call fetch with the correct url', () => {
      
    })
  })
})