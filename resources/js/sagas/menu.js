import { all, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "@actions";
import { postJWT, getJWT } from "@services/Api";

export function* createNewMenu({ payload }) {
  try {
    yield postJWT("/create-menu", payload);
    yield put({
      type: ActionTypes.CREATE_NEW_MENU_SUCCESS
    });
  } catch (err) {
    yield put({
      type: ActionTypes.CREATE_NEW_MENU_FAILURE,
      payload: err.response
    });
  }
}
export function* getMenu() {
  try {
    let response = yield getJWT("/menu-list");
    yield put({
      type: ActionTypes.GET_MENU_SUCCESS,
      payload: response.data.menu
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_MENU_FAILURE,
      payload: err.response
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CREATE_NEW_MENU_REQUEST, createNewMenu)]);
  yield all([takeLatest(ActionTypes.GET_MENU_REQUEST, getMenu)]);
}
