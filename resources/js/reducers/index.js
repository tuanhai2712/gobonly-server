import { combineReducers } from "redux";
import auth from "./auth";
import fetching from "./fetching";

const allReducer = combineReducers({ ...auth, ...fetching });

export default allReducer;
