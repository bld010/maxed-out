import { candidate } from './candidate'

describe('candidate Reducer', () => {
  it('should return state if action does not match SET_CURRENT_CANDIDATE', () => {
    let mockState = {name: 'Book'}
    let mockAction = {type: 'BlahBlah', candidate: {name:'Lamp'}}

    expect(candidate(mockState, mockAction)).toEqual(mockState)
  })

  it(`should return the candidate object if action type matches and \n
      there is a candidate property in the action`, () =>{
    let mockState = {name: 'Book'}
    let mockAction = {type: 'SET_CURRENT_CANDIDATE', candidate: {name:'Lamp'}}

    expect(candidate(mockState, mockAction)).toEqual({name: 'Lamp'})
  })

  it(`should return null if no state is provided, action type doen not match, \n
      and there is no candidate property in the action`, () => {
    let mockAction = {type: 'BlahBlah', committee_id: {name:'Lamp'}}

    expect(candidate(undefined, mockAction)).toEqual(null)

  })
})