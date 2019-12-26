import {UNREAD_MESSAGES_LIST} from '../actions/action_types';

const initialState = {
  unreadMessagesListState: null
};

const unreadMessagesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNREAD_MESSAGES_LIST: 
      return {
        ...state,
        unreadMessagesListState: action.payload
      }
    default: 
      return state
  }
}
export default unreadMessagesListReducer