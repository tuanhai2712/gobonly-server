import { all, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "@actions";
import { postJWT, getJWT } from "@services/Api";

export function* createNewCategory({ payload }) {
  console.log(payload);
  try {
    let formData = new FormData();
    formData.append("template", payload.template);
    formData.append("name", payload.name);
    formData.append("color_code", payload.color_code);
    formData.append("description", payload.description);
    formData.append("gender", payload.gender);
    formData.append("menu_id", payload.menu_id);
    let response = yield postJWT("/create-category", formData);
    console.log(response);
    yield put({
      type: ActionTypes.CREATE_NEW_CATEGORY_SUCCESS
    });
  } catch (err) {
    yield put({
      type: ActionTypes.CREATE_NEW_CATEGORY_FAILURE,
      payload: err.response
    });
  }
}

export function* getCategoryList() {
  try {
    let response = yield getJWT("/category-list");
    yield put({
      type: ActionTypes.GET_CATEGORY_LIST_SUCCESS,
      payload: response.data.data
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_CATEGORY_LIST_FAILURE,
      payload: err.response
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.CREATE_NEW_CATEGORY_REQUEST, createNewCategory),
    takeLatest(ActionTypes.GET_CATEGORY_LIST_REQUEST, getCategoryList)
  ]);
}
