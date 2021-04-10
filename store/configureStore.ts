import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { Saga } from "redux-saga";
import createRootReducer from "@/../store/reducers";

const sagaMiddleware = createSagaMiddleware();

const runSagaMiddleware = (args: Saga): any => {
  if (store.isSagaRunning) return;
  store.isSagaRunning = true; 
  return sagaMiddleware.run(args);
}

const store = {
  ...createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  ),
  runSaga: runSagaMiddleware,
  isSagarunning: false
};

export default store;
