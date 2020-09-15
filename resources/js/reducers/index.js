import { combineReducers } from "redux";
import auth from "./auth";
import fetching from "./fetching";
import error from "./error";
import menu from "./menu";
import category from "./category";

const allReducer = combineReducers({
  ...auth,
  ...fetching,
  ...error,
  ...menu,
  ...category
});

export default allReducer;
