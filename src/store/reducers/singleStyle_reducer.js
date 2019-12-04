import {SINGLESTYLE} from '../actions/action_types';

const initialState = {
  singleStyleState: null
}

const singleStyleReducer = (state = initialState, action) => {
  switch ( action.type) {
    case SINGLESTYLE: 
      return {
        ...state,
        singleStyleState: action.payload
      }
    default: 
      return state
  }
}
export default singleStyleReducer;