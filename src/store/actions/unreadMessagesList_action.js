import {UNREAD_MESSAGES_LIST, READ_ALL, UNREAD_ALL, CLEAR_UNREAD_MESSAGES_LIST} from './action_types';

export const unreadMessagesList = (unreadMessagesList) => {
  return {
    type: UNREAD_MESSAGES_LIST,
    payload: unreadMessagesList
  }
}

export const readAll = (readAll) => {
  return {
    type: READ_ALL,
    payload: readAll
  }
}

export const unreadAll = (unreadAll) => {
  return {
    type: UNREAD_ALL,
    payload: unreadAll
  }
}

export const clearUnreadMessagesList = () => {
  return {
    type: CLEAR_UNREAD_MESSAGES_LIST
  }
}