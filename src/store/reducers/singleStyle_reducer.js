import {SINGLE_STYLE, CLEAR_STORE} from '../actions/action_types';

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
    case CLEAR_STORE:
      return {
        ...state,
        singleStyleState: []
      }
    default: 
      return state
  }
}
export default singleStyleReducer;