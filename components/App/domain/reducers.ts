import { handleActions, Action } from "redux-actions";
import * as actions from "@/../components/App/domain/actions";
import { ReducerMap } from "redux-actions";
import UserManager from "@/../components/App/UserManager";
import { UserStore } from "@/../components/App/domain/intefaces";
import {
  User,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";

const initialState: UserStore = {
  userManager: undefined,
  user: undefined,
};

const reducerMap: ReducerMap<UserStore, any> = {
  [actions.setUserManager as any]: (
    state,
    action: Action<UserManager>
  ): UserStore => ({
    ...state,
    userManager: action.payload,
  }),
  [actions.authorization as any]: (
    state,
    action: Action<UserCredentials>
  ): UserStore => ({
    ...state,
    userManager: action.payload,
  }),
  [actions.authorization as any]: (state, action: Action<User>): UserStore => ({
    ...state,
    user: action.payload,
  }),
};

export default handleActions(reducerMap, initialState);