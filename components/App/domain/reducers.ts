import { handleActions, Action } from "@/../utils/redux";
import * as actions from "@/../components/App/domain/actions";
import { ReducerMap } from "redux-actions";
import UserManager from "@/../managers/UserManager/UserManager";
import { UserStore } from "@/../components/App/domain/intefaces";
import {
  User,
  UserFavouriteMovie
} from "@/../infrastructure/interfaces/User/user";

const initialState: UserStore = {
  manager: undefined,
  user: undefined,
};

const reducerMap: ReducerMap<UserStore, any> = {
  [actions.setUserManager]: (
    state,
    action: Action<UserManager>
  ): UserStore => ({
    ...state,
    manager: action.payload,
  }),
  [actions.authorization.success]: (
    state,
    action: Action<User>
  ): UserStore => ({
    ...state,
    user: action.payload,
  }),
  [actions.changePassword.success]: (
    state,
    action: Action<User>
  ): UserStore => ({
    ...state,
    user: action.payload,
  }),
  [actions.removeUser]: (state): UserStore => ({
    ...state,
    user: undefined
  }),
  [actions.addFavourite.success]: (state, action: Action<UserFavouriteMovie[]>): UserStore => ({
    ...state,
    user: {
      ...state.user,
      favouriteMovies: action.payload
    }
  }),
  [actions.removeFavourite.success]: (state, action: Action<UserFavouriteMovie[]>): UserStore => { 
    console.log(action.payload)
    
    return ({
    ...state,
    user: {
      ...state.user,
      favouriteMovies: action.payload
    }
  })},
  [actions.getCurrentUser.success]: (
    state,
    action: Action<User>
  ): UserStore => ({
    ...state,
    user: action.payload,
  }),
  [actions.getUserFavourites.success]: (state, action: Action<UserFavouriteMovie[]>): UserStore => ({
    ...state,
    user: {
      ...state.user,
      favouriteMovies: action.payload
    }
  }),
};

export default handleActions(reducerMap, initialState);
