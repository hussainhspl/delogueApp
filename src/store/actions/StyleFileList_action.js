import {STYLE_FILE_LIST} from './action_types';

export const styleFileList = (styleFileList) => {
  return {
    type: STYLE_FILE_LIST,
    payload: styleFileList
  }
}