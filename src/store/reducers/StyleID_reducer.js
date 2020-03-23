import {STYLE_ID, CLEAR_STORE} from '../actions/action_types';

const initialState = {
  styleIdState: ''
};

const styleIdReducer = (state = initialState, action) => {
  // console.log('enter reducer', action)
  switch(action.type) {
    case STYLE_ID:
      return {
        ...state,
        styleIdState: action.payload
      }
    case CLEAR_STORE:
      return {
        ...state,
        styleIdState: []
      }
    default: 
      return state
  }
}
export default styleIdReducer;
