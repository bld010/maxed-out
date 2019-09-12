export const candidate = (state=null, action) => {
  switch(action.type) {
    case 'SET_CURRENT_CANDIDATE':
      if (action.candidate === undefined) {
        return state
      } else {
        return action.candidate;
      }
    default: 
      return state;
  }
} 