import {TOKEN} from '../actions/action_types';

const initialState = {
  tokenState: ''
};

const asyncReducer = (state = initialState, action) => {
  switch ( action.type) {
    case TOKEN: 
      return {
        ...state,
        tokenState: action.payload
      }
  }
}
export default asyncReducer;