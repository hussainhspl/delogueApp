import { USER } from "./action_types";

export const userData = (userData) => {
  // console.log("in action",userData);

  return ({
    type: USER,
    payload: userData
  });
};
