import { TOKEN } from './action_types';

export const token = (token) => {
  return {
    type: TOKEN,
    payload: token
  };
}