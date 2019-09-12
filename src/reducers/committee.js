export const committee = (state=null, action) => {
  switch(action.type) {
    case 'SET_CURRENT_COMMITTEE_ID':
      return action.committee_id
    default: 
      return state;
  }
} 