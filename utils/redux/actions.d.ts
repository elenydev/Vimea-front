/// <reference path="reduxSagaRoutines.d.ts" />
import { ActionCreator } from "@/../utils/redux/reduxActions";
export declare const createAction: <TParams = undefined>(
  actionName: string
) => ActionCreator<TParams>;
export declare const createAsyncAction: <TParams, TResult, TError = Error>(
  actionName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const GET_ONE = "getOne";
export declare const GET_LIST = "getList";
export declare const CREATE = "create";
export declare const UPDATE = "update";
export declare const DELETE = "delete";
export declare const ACTION = "action";
export declare const getOneAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const getListAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const createInApiAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const updateAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const deleteAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
export declare const InApiAction: <TParams, TResult, TError = Error>(
  resourceName: string
) => import("redux-saga-routines").Routine<TParams, TResult, TError>;
