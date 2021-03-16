import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "@/../store/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = {
  ...createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  ),
  runSaga: sagaMiddleware.run,
};

export default store;
