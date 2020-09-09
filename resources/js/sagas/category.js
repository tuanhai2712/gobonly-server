import { all, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "@actions";
import { postJWT } from "@services/Api";

export function* createNewCategory({ payload }) {
  try {
    let formData = new FormData();
    formData.append("template", payload.template);
    formData.append("name", payload.name);
    formData.append("color_code", payload.color_code);
    formData.append("description", payload.description);
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

export default function* root() {
  yield all([
    takeLatest(ActionTypes.CREATE_NEW_CATEGORY_REQUEST, createNewCategory)
  ]);
}
