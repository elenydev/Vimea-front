import { ReducerMap } from "redux-actions";
export declare const handleActions: <State>(
  reducerMap: ReducerMap<State, unknown>,
  defaultState: State
) => import("redux-actions").ReduxCompatibleReducer<unknown, unknown>;
