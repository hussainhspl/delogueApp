import {STYLE_MESSAGE_LIST} from '../actions/action_types';

const initialState = {
  styleMessageListState : null
};

const styleMessageListReducer = (state = initialState, action) => {
  console.log('action type', action);
  switch (action.type) {
    case STYLE_MESSAGE_LIST:
      console.log('in reducer', action.payload);
      return {
        ...state,
        styleMessageListState: action.payload
      }
    default: 
      return state
  }
}
export default styleMessageListReducer