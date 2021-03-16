import { ReducerMap } from "redux-actions";
export declare const handleActions: <State>(
  reducerMap: ReducerMap<State, unknown>,
  defaultState: Statte
) => import("redux-actions").ReduxCompatibileReducer<unknown, unknown>;
