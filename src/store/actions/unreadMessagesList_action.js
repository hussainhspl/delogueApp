import {UNREAD_MESSAGES_LIST} from './action_types';

export const unreadMessagesList = (unreadMessagesList) => {
  return {
    type: UNREAD_MESSAGES_LIST,
    payload: unreadMessagesList
  }
}