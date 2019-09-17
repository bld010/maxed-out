import { pacContributions } from './pacContributions';

describe('pacContributions reducer', () => {
  it(`should return an empty array if action type does not match \n
      and state is undefined`, () => {
    let mockState = undefined;
    let mockAction = {
      type: 'BLAH',
      pacContributions: [1,2,3]
    };
    
    expect(pacContributions(mockState, mockAction)).toEqual([]);
  })

  it('should return the state if action type does not match', () => {
    let mockState = [1, 2, 3, 4];
    let mockAction = {
      type: 'BLAH BLAH',
      pacContributions: [5, 6, 7, 8]
    };

    expect(pacContributions(mockState, mockAction)).toEqual(mockState)
  })

  it('should return an array of contributions if type matches', () => {
    let mockState = [1,2,3,4];
    let mockAction = {
      type: 'SET_PAC_CONTRIBUTIONS',
      pacContributions: [4, 5, 6, 7]
    };

    expect(pacContributions(mockState, mockAction)).toEqual([4, 5, 6, 7]);
  })
})