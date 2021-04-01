/// <reference path="reduxSagaRoutines.d.ts" />
import {
  createAction as createAction$1,
  handleActions as handleActions$1,
} from "redux-actions";
import { put } from "redux-saga/effects";
import { createRoutine } from "redux-saga-routines";

const createAction = (actionName) => createAction$1(actionName);
const createAsyncAction = (actionName) => createRoutine(actionName);
const GET_ONE = "getOne";
const GET_LIST = "getList";
const CREATE = "create";
const UPDATE = "update";
const DELETE = "delete";
const ACTION = "action";
const getOneAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${GET_ONE}`);
const getListAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${GET_LIST}`);
const createInApiAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${CREATE}`);
const updateAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${UPDATE}`);
const deleteAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${DELETE}`);
const inApiAction = (resourceName) =>
  createAsyncAction(`${resourceName}/${ACTION}`);

const handleActions = (reducerMap, defaultState) =>
  handleActions$1(reducerMap, defaultState);

function* fetchSaga(action, requestFn, fullActionType) {
  const payload = action.payload;
  yield apiCall(() => requestFn(payload), fullActionType);
}

function* apiCall(request, fullActionType) {
  try {
    const result = yield request();
    yield put(fullActionType.success(result));
  } catch (error) {
    yield put(fullActionType.failure(error));
  }
}

export {
  apiCall,
  createAction,
  createAsyncAction,
  createInApiAction,
  deleteAction,
  fetchSaga,
  getListAction,
  getOneAction,
  handleActions,
  inApiAction,
  updateAction,
};
