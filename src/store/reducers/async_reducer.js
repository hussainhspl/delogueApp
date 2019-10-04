import {TOKEN} from '../actions/action_types';

const initialState = {
  tokenState: ''
};

const asyncReducer = (state = initialState, action) => {
  switch ( action.type) {
    case TOKEN: 
      console.log("in reducer", action.payload);
      return {
        ...state,
        tokenState: action.payload
      }
    default: // need this for default case
      return state 
   
  }
}
export default asyncReducer;