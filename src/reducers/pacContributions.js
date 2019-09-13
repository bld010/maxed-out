export const pacContributions = (state =[], action) => {
  switch(action.type) {
    case 'SET_PAC_CONTRIBUTIONS':
      return action.pacContributions;
    default: 
    return state;
  }
}