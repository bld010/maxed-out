import { committee } from './committee';

describe('committee reducer', () => {

  it('should return the default state if action type does not match', () => {
    expect(committee(undefined, {type: 'BLAH'})).toEqual(null)
  })

  it(`should return the committee id when action type is \n
      SET_CURRENT_COMMITTEE_ID`, () => {
      expect(committee(undefined, {type: 'SET_CURRENT_COMMITTEE_ID', 
      committee_id: "1234"})).toEqual("1234")
  })

})