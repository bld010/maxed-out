import { committee } from './committee';

describe('committee reducer', () => {

  it(`should return the null if action type does not match
      and state is undefined`, () => {
    expect(committee(undefined, {type: 'BLAH', committee: {name: 'b'}}))
    .toEqual(null);
  })

  it(`should return the committee id when action type is \n
      SET_CURRENT_COMMITTEE_ID`, () => {
      expect(committee(undefined, {type: 'SET_CURRENT_COMMITTEE_ID', 
      committee_id: "1234"})).toEqual("1234");
  })

  it('should return state if action type does not match', () => {
    let mockState = {name:'Dorblid'};
    let mockAction = {type: 'Blah', committee: 'Bloop'};

    expect(committee(mockState, mockAction)).toEqual(mockState);
  })

})