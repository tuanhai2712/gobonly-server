import { all, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "@actions";
import { post } from "@services/Api";

export function* login({ payload }) {
  try {
    let response = yield post("/auth/login", payload);
    console.log(response)
    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: response.data
    });
    window.location.href = "/admin/dashboard";
  } catch (err) {
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err.response
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.USER_LOGIN_REQUEST, login)]);
}
