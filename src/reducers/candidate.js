export const candidate = (state=null, action) => {
  switch(action.type) {
    case 'SET_CURRENT_CANDIDATE':
      if (!action.candidate) {
        return null
      } else {
        return action.candidate;
      }
    default: 
      return state;
  }
} 