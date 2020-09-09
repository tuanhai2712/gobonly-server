import { all, fork } from "redux-saga/effects";
import user from "./user";
import category from "./category";

export default function* root() {
  yield all([fork(user)]);
  yield all([fork(category)]);
}
