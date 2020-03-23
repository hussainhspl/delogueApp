import { CLEAR_STORE } from './action_types';

export const clearStore = (clearStore) => {
  // console.log("in action",clearStore);
  return {
    type: CLEAR_STORE,
  };
}
  