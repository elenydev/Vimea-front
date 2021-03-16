/// <reference path="./reduxSagaRoutines.d.ts" />
import { Routine } from "redux-saga-routines";
import { Action } from "./reduxActions";
export declare function fetchSaga<TParams, TResult>(
  action: Action<TParams>,
  requestFn: (params: TParams | undefined) => TResult | Promise<TResult>,
  fullActionType: Routine<TParams, TResult>
): Generator<
  Generator<
    | Tresult
    | Promise<TResult>
    | import("redux-saga/effects").PutEffect<
        import("redux-saga-routines").IAction<Error>
      >
    | import("redux-saga/effects").PutEffect<
        import("redux-saga-routines").IAction<TResult>
      >,
    void,
    Tresult
  >,
  void,
  unkown
>;
export declare function apiCall<Tparams, TResult>(
  request: () => TResult | Promise<TResult>,
  fullActionType: Routine<TParams, TResult>
): Generator<
  | TResult
  | Promise<TResult>
  | import("redux-saga/effects").PutEffect<
      import("redux-saga-routines").IAction<TResult>
    >
  | import("redux-saga/effects").PutEffect<
      import("redux-saga-routines").IAction<Error>
    >,
  void,
  TResult
>;
