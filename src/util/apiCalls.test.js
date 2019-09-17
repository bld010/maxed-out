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
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [7, 8, 9]})
        })
      })
      let mockId = "1011"
      let expectedUrl = `https://api.open.fec.gov/v1/schedules/schedule_a/?sort_null_only=false&committee_id=1011&min_amount=5000&per_page=50&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&is_individual=false&sort_hide_null=false&sort=contribution_receipt_date&two_year_transaction_period=2020`

      fetchPACContributions(mockId)
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    })

    it('should return an array of contributions when successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [7, 8, 9]})
        })
      })

      let mockId = "12345";

      expect(fetchPACContributions(mockId)).resolves.toEqual([7, 8, 9]);
    })

    it('should throw an error when results are not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false}))
      
      let mockId = "12345";
  
      expect(fetchPACContributions(mockId)).rejects.toEqual(Error ('There was an error getting the PAC contributions'));
    })

      it('should throw an error when promise is rejected', () => {
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.reject(Error ('There was an error getting the PAC contributions'))
        })
        let mockId = "12345"
        expect(fetchPACContributions(mockId)).rejects.toEqual(Error ('There was an error getting the PAC contributions'));
    })
  })

  describe('fetchIndividualContributions', () => {
    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [7, 8, 9]})
        })
      })
      let mockId = "6789"
      let expectedUrl = `https://api.open.fec.gov/v1/schedules/schedule_a/?sort_null_only=false&committee_id=6789&min_amount=2800&per_page=50&api_key=x6zpz92JgOnDxuca5Vf6QGJIV46FkTVYMvAfBNGl&is_individual=true&sort_hide_null=false&sort=contribution_receipt_date&two_year_transaction_period=2020`

      fetchIndividualContributions(mockId)
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    })

    it('should return an array of contributions when successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: [7, 8, 9]})
        })
      })

      let mockId = "12345";

      expect(fetchIndividualContributions(mockId)).resolves.toEqual([7, 8, 9]);
    })

    it('should throw an error when results are not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false}))
      
      let mockId = "12345";
  
      expect(fetchIndividualContributions(mockId)).rejects.toEqual(Error ('There was an error getting the Individual contributions'));
    })

    it('should throw an error when promise is rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error ('There was an error getting the Individual contributions'))
      })
      let mockId = "12345"
      expect(fetchIndividualContributions(mockId)).rejects.toEqual(Error ('There was an error getting the Individual contributions'));
  })
  })
})