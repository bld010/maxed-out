import { individualContributions } from './individualContributions';

describe('individualContributions reducer', () => {
  it(`should return an empty array if action type does not match \n
      and state is undefined`, () => {
    let mockState = undefined;
    let mockAction = {
      type: 'BLAH',
      individualContributions: [1,2,3]
    };
    
    expect(individualContributions(mockState, mockAction)).toEqual([]);
  })

  it('should return the state if action type does not match', () => {
    let mockState = [1, 2, 3, 4];
    let mockAction = {
      type: 'BLAH BLAH',
      individualContributions: [5, 6, 7, 8]
    };

    expect(individualContributions(mockState, mockAction)).toEqual(mockState)
  })

  it('should return an array of contributions if type matches', () => {
    let mockState = [1,2,3,4];
    let mockAction = {
      type: 'SET_INDIVIDUAL_CONTRIBUTIONS',
      individualContributions: [4, 5, 6, 7]
    };

    expect(individualContributions(mockState, mockAction)).toEqual([4, 5, 6, 7]);
  })
})