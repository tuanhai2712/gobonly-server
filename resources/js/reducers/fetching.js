import { ActionTypes } from "@actions";

export default {
  fetching: (state = { type: "", status: false }, action) => {
    if (action.type.includes("_REQUEST")) {
      return {
        type: action.type,
        status: true
      };
    }
    if (action.type === ActionTypes.CLEAR_FETCHING) {
      return {
        type: "",
        status: false
      };
    }
    if (action.type.includes("_SUCCESS") || action.type.includes("_FAILURE")) {
      return {
        type: action.type,
        status: false
      };
    }
    return state;
  }
};
