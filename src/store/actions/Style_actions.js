import { STYLE_LIST } from './action_types';

export const styleList = (styleList) => {
  return {
    type: STYLE_LIST,
    payload: styleList
  };
}