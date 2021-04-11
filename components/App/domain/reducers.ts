import { handleActions, Action } from "@/../utils/Redux";
import * as actions from "@/../components/App/domain/actions";
import { ReducerMap } from "redux-actions";
import UserManager from "@/../components/App/UserManager";
import { UserStore } from "@/../components/App/domain/intefaces";
import {
  User
} from "@/../infrastructure/interfaces/User/user";

const initialState: UserStore = {
  userManager: undefined,
  user: undefined,
};

const reducerMap: ReducerMap<UserStore, any> = {
  [actions.setUserManager]: (
    state,
    action: Action<UserManager>
  ): UserStore => ({
    ...state,
    userManager: action.payload,
  }),
  [actions.authorization.success]: (
    state,
    action: Action<User>
  ): UserStore => ({
    ...state,
    user: action.payload,
  }),
  [actions.removeUser]: (state): UserStore => ({
    ...state,
    user: undefined
  })
};

export default handleActions(reducerMap, initialState);
