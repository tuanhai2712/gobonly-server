import { all, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "@actions";
import { postJWT, getJWT } from "@services/Api";

export function* createNewCategory({ payload }) {
  try {
    let formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("gender", payload.gender);
    formData.append("menu_id", payload.menu_id);
    formData.append("apply_size", JSON.stringify(payload.apply_size));
    payload.templates.map((template, idx) => {
      Object.keys(template).forEach(key => {
        formData.append(`templates[${idx}][${key}]`, template[key]);
      });
    });
    yield postJWT("/create-category", formData);
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

export function* getCategoryList({ conditions }) {
  try {
    let response = yield postJWT("/category-list", conditions);
    yield put({
      type: ActionTypes.GET_CATEGORY_LIST_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_CATEGORY_LIST_FAILURE,
      payload: err.response
    });
  }
}
export function* getCategoryTemp() {
  try {
    let response = yield getJWT("/get-category-temp");
    yield put({
      type: ActionTypes.GET_CATEGORY_TEMP_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_CATEGORY_TEMP_FAILURE,
      payload: err.response
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.CREATE_NEW_CATEGORY_REQUEST, createNewCategory),
    takeLatest(ActionTypes.GET_CATEGORY_LIST_REQUEST, getCategoryList),
    takeLatest(ActionTypes.GET_CATEGORY_TEMP_REQUEST, getCategoryTemp)
  ]);
}
