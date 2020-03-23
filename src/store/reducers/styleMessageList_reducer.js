import {STYLE_MESSAGE_LIST, CLEAR_STORE} from '../actions/action_types';

const initialState = {
  styleMessageListState : null
};

const styleMessageListReducer = (state = initialState, action) => {
  // console.log('action type', action);
  switch (action.type) {
    case STYLE_MESSAGE_LIST:
      // console.log('in reducer', action.payload);
      return {
        ...state,
        styleMessageListState: action.payload
      }
    case CLEAR_STORE:
      return {
        ...state,
        styleMessageListState: null
      }
    default: 
      return state
  }
}
export default styleMessageListReducer