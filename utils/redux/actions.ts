import {
  ActionCreatorWithPayload,
  createAction,
  PrepareAction,
} from "@reduxjs/toolkit";

export const createActionWithPayload = <TParam>(
  type: string,
  args?: TParam
): ActionCreatorWithPayload<TParam> =>
  createAction(type, args as unknown as PrepareAction<TParam>);
