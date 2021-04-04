declare module "redux-saga-routines" {
  import { Action, ActionFunction0, ActionFunction1 } from "redux-actions";
  export = reduxSagaRoutines;
  namespace reduxSagaRoutines {
    type IAction<Tparams> = Action<TParams> & {
      payload: TParams;
    };
    type IRoutineStage<TParams, TResult> = undefined extends TParams
      ? ActionFunction1<TParams, TResult> & string
      : ActionFunction0<TResult> & string;
    type routineStages = "trigger" | "success" | "failure";
    type Routine<TParams, TResult, TError = Error> = {
      trigger: IRoutineStage<TParams, IAction<TParams>>;
      success: IRoutineStage<TResult, IAction<TResult>>;
      failure: IRoutineStage<TError, IAction<TError>>;
    };
    function createRoutine<TParams, TResult, TError = Error>(
      actionType: string
    ): Routine<TParams, TResult, TError>;
  }
}
