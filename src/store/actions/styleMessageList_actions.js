import { STYLE_MESSAGE_LIST } from './action_types';

export const styleMessageList = (styleMessageList) => {
  console.log('in action:', styleMessageList)
  return {
    type: STYLE_MESSAGE_LIST,
    payload: styleMessageList
  }
}