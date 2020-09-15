import { ActionTypes } from "@actions";

export default {
  error: (state = {}, action) => {
    if (action.type.includes("_FAILURE")) {
      return action.payload;
    }
    if (action.type === ActionTypes.CLOSE_ALERT_ERROR) {
      return {};
    }
    return state;
  }
};
