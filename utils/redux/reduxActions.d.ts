import {
  Action as ReduxAction,
  ActionFunction0,
  ActionFunction1,
} from "redux-actions";
export declare type Action<TParams = undefined> = [TParams] extends [
  NonNullable<TParams>
]
  ? ReduxAction<TParams> & {
      payload: TParams;
    }
  : ReduxAction<TParams>;

export declare type ActionCreator<TParams> = undefined extends TParams
  ? ActionFunction1<Action<TParams>> & string
  : ActionFunction0<TParams, Action<TParams>> & string;
