declare module "redux-saga-routines" {
  import { Action, ActionFunction0, ActionFunction1 } from "redux-actions";
  export = reduxSagaRoutines;
  namespace reduxSagaRoutines {
    type IAction<Tparams> = Action<TParams> & {
      payload: TParams;
    };
    type IRoutineState<TParams, TResult> = undefined extends TParams
      ? ActionFunction0<Result> & string
      : ActionFunction1<TParams, TResult> & string;
    type routineStages = "trigger" | "success" | "failure";
    type Routine<TParams, TResult, TError = Error> = {
      trigger: IRoutineState<TParams, IAction<TParams>>;
      success: IRoutineState<TResult, IAction<TResult>>;
      failure: IRoutineState<TError, IAction<TError>>;
    };
    function createRoutine<TParams, TResult, TError = Error>(
      actionType: string
    ): Routine<TParams, TResult, TError>;
  }
}
