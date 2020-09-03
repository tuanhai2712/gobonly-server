import { combineReducers } from "redux";
import auth from "./auth";

const allReducer = combineReducers({ ...auth });

export default allReducer;
