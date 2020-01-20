import {SINGLE_STYLE} from '../actions/action_types';

const initialState = {
  singleStyleState: null
}

const singleStyleReducer = (state = initialState, action) => {
  // console.log('reducer', action)
  switch ( action.type) {
    case SINGLE_STYLE: 
      return {
        ...state,
        singleStyleState: action.payload
      }
    default: 
      return state
  }
}
export default singleStyleReducer;