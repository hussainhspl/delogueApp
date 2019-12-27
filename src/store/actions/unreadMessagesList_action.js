import {UNREAD_MESSAGES_LIST, READ_ALL, UNREAD_ALL} from './action_types';

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