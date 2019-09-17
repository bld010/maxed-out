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
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [1,3,5]})
        })
      })
      let mockId = "12345"
      let expectedUrl = `https://api.open.fec.gov/v1/committee/12345/?sort=name&sort_null_only=false&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=100&sort_nulls_last=false&sort_hide_null=true&page=1`
      searchCommitteeById(mockId);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    })

    it('should return an array when successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [7, 8, 9]})
        })
      })

      let mockId = "12345";

      expect(searchCommitteeById(mockId)).resolves.toEqual([7, 8, 9]);
    })

    it('should throw an error if response is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
        })
      })

      let mockId = "12345";

      expect(searchCommitteeById(mockId)).rejects.toEqual(Error('There was an error finding the requested committee'))
    })

    it('should throw an error if promise is rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error finding the requested committee'))
      })

      let mockId = "12345";

      expect(searchCommitteeById(mockId)).rejects.toEqual(Error('There was an error finding the requested committee'))
    })

  })

  describe('searchCandidateById', () => {
    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [1,3,5]})
      })
    })

    let mockId = "1234";
    let expectedUrl = `https://api.open.fec.gov/v1/candidates/search/?api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&per_page=50&candidate_id=1234&sort_nulls_last=false&sort_hide_null=false&page=1&sort=name&sort_null_only=false`
    searchCandidateById(mockId);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    })

    it('should return a candidate object when successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: {name: 'Book'}})
      })
    })

      let mockId = "5667"
      expect(searchCandidateById(mockId)).resolves.toEqual({name: "Book"})
    })

    it('should throw an error when results are not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false}))
      
      let mockId = "12345";
  
      expect(searchCandidateById(mockId)).rejects.toEqual(Error ('There was an error searching for the candidate'));
    })
    
    it('should throw an error when promise is rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error ('There was an error searching for the candidate'))
      })
      let mockId = "12345"
      expect(searchCandidateById(mockId)).rejects.toEqual(Error ('There was an error searching for the candidate'));
    })
  })

  describe('fetchPACContributions', () => {
    it('should call fetch with the correct url', () => {
      
    })

    it('should return an array of contributions when successful', () => {

    })

    it('should throw an error when results are not ok', () => {

    })

    it('should throw an error when promise is rejected', () => {

    })
  })

  describe('fetchIndividualContributions', () => {
    it('should call fetch with the correct url', () => {
      
    })

    it('should return an array of contributions when successful', () => {

    })

    it('should throw an error when results are not ok', () => {

    })

    it('should throw an error when promise is rejected', () => {
      
    })
  })
})