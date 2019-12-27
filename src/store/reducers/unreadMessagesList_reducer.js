import {UNREAD_MESSAGES_LIST, READ_ALL, UNREAD_ALL} from '../actions/action_types';
import { readAll } from '../actions/unreadMessagesList_action';

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
    case READ_ALL:
      return {
        ...state,
            unreadMessagesListState : state.unreadMessagesListState.map(
              el => el.auditLogId == action.payload ? 
                {...el, isRead: true} : el
            )
            
      }
      case UNREAD_ALL:
        return {
          ...state,
              unreadMessagesListState : state.unreadMessagesListState.map(
                el => el.auditLogId == action.payload ? 
                  {...el, isRead: false} : el
              )
              
        }
    default: 
      return state
  }
}
export default unreadMessagesListReducer