import {SAMPLE_LIST} from './action_types';

export const sampleList = (sampleList) => {
  return {
    type: SAMPLE_LIST,
    payload: sampleList
  }
}