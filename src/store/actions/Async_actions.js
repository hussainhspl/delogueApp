import { TOKEN } from './action_types';

export const token = (token) => {
  // console.log("in action",token);
  return {
    type: TOKEN,
    payload: token
  };
}