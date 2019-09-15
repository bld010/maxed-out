export const individualContributions = (state=[], action) => {
  switch (action.type) {
    case 'SET_INDIVIDUAL_CONTRIBUTIONS':
      return action.individualContributions;
    default: 
      return state;
  }
}