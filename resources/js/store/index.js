import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "@reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@sagas";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(pReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
