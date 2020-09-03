import { handleActions } from "redux-actions";
import immutable from "immutability-helper";
import { ActionTypes } from "@actions";

export const authStateDefault = {
  user: {}
};

export default {
  auth: handleActions(
    {
      [ActionTypes.USER_LOGIN_SUCCESS]: (state, action) => {
        localStorage.setItem("token", action.payload.access_token);
        return immutable(state, {
          user: { $set: action.payload.user }
        });
      }
    },
    authStateDefault
  )
};
