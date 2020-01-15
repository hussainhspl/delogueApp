import { STYLE_ID } from  './action_types';

export const styleId = (styleId) => {
  console.log('action id', styleId)
  return {
    type: STYLE_ID,
    payload: styleId
  };
}