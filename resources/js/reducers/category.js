import { handleActions } from "redux-actions";
import immutable from "immutability-helper";
import { ActionTypes } from "@actions";

export const categoryStateDefault = {
  items: []
};

export default {
  category: handleActions(
    {
      [ActionTypes.GET_CATEGORY_LIST_SUCCESS]: (state, action) => {
        return immutable(state, {
          items: { $set: action.payload }
        });
      }
    },
    categoryStateDefault
  )
};
