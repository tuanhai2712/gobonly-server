import { combineReducers } from "redux";
import auth from "./auth";
import fetching from "./fetching";
import error from "./error";
import menu from "./menu";
import categories from "./category";

const allReducer = combineReducers({
  ...auth,
  ...fetching,
  ...error,
  ...menu,
  ...categories
});

export default allReducer;
