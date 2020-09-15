import { all, fork } from "redux-saga/effects";
import user from "./user";
import category from "./category";
import menu from "./menu";

export default function* root() {
  yield all([fork(user)]);
  yield all([fork(category)]);
  yield all([fork(menu)]);
}
