export const candidate = (state=null, action) => {
  switch(action.type) {
    case 'SET_CURRENT_CANDIDATE':
      return action.candidate;
    default: 
      return state;
  }
} 