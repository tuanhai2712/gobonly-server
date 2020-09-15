import { handleActions } from "redux-actions";
import immutable from "immutability-helper";
import { ActionTypes } from "@actions";

export const menuStateDefault = {
  items: []
};

export default {
  menu: handleActions(
    {
      [ActionTypes.GET_MENU_SUCCESS]: (state, action) => {
        return immutable(state, {
          items: { $set: action.payload }
        });
      }
    },
    menuStateDefault
  )
};
