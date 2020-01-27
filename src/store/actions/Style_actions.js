import { STYLE_LIST, CLEAR_STYLE_LIST } from './action_types';

export const styleList = (styleList) => {
  return {
    type: STYLE_LIST,
    payload: styleList
  };
}

export const clearStyleList = () => {
  return {
    type: CLEAR_STYLE_LIST
  }
} 