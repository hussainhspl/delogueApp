import {STYLE_ID} from '../actions/action_types';

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
    default: 
      return state
  }
}
export default styleIdReducer;
