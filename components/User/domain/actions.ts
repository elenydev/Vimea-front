import { createAction } from "@reduxjs/toolkit";
import UserManager from "managers/UserManager/UserManager";
import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "infrastructure/interfaces/User/user";
import { Movie } from "infrastructure/interfaces/Movie/movie";
import { createActionWithPayload } from "utils/redux/actions";

export enum UserStoreActions {
  SetUserManager = "userStore/setUserManager",
  AuthorizationTrigger = "userStore/authorizationTrigger",
  AuthorizationSuccess = "userStore/authorizationSuccess",
  AuthorizationFailure = "userStore/authorizationFailure",
  RegisterUserTrigger = "userStore/registerUserTrigger",
  RegisterUserSuccess = "userStore/registerUserSuccess",
  RegisterUserFailure = "userStore/registerUserFailure",
  CloseUserSession = "userStore/closeUserSession",
  GetCurrentUserTrigger = "userStore/getCurrentUserTrigger",
  GetCurrentUserSuccess = "userStore/getCurrentUserSuccess",
  GetCurrentUserFailure = "userStore/getCurrentUserFailure",
  GetUserFavouriteMoviesTrigger = "userStore/getUserFavouriteMoviesTrigger",
  GetUserFavouriteMoviesSuccess = "userStore/getUserFavouriteMoviesSuccess",
  GetUserFavouriteMoviesFailure = "userStore/getUserFavouriteMoviesFailure",
  ChangePasswordTrigger = "userStore/ChangePasswordTrigger",
  RemindPasswordTrigger = "userStore/RemindPasswordTrigger",
  AddUserFavouriteMovieTrigger = "userStore/AddUserFavouriteMovieTrigger",
  RemoveUserFavouriteMovieTrigger = "userStore/RemoveUserFavouriteMovieTrigger",
  ChangeUserAvatarTrigger = "userStore/ChangeUserAvatarTrigger",
  ChangeUserPasswordTrigger = "userStore/ChangeUserPasswordTrigger",
}

export const setUserManager = createActionWithPayload<UserManager>(
  UserStoreActions.SetUserManager
);
export const closeUserSession = createAction(UserStoreActions.CloseUserSession);
export const authorizationTrigger = createActionWithPayload<UserCredentials>(
  UserStoreActions.AuthorizationTrigger
);
export const authorizationSuccess = createActionWithPayload<User>(
  UserStoreActions.AuthorizationSuccess
);
export const authorizationFailure = createAction(
  UserStoreActions.AuthorizationFailure
);
export const registerUserTrigger = createActionWithPayload<User>(
  UserStoreActions.RegisterUserTrigger
);
export const registerUserSuccess = createAction(
  UserStoreActions.RegisterUserSuccess
);
export const registerUserFailure = createAction(
  UserStoreActions.RegisterUserFailure
);
export const getCurrentUserTrigger = createActionWithPayload<GetCurrentUser>(
  UserStoreActions.GetCurrentUserTrigger
);
export const getCurrentUserSuccess = createActionWithPayload<User>(
  UserStoreActions.GetCurrentUserSuccess
);
export const getCurrentUserFailure = createAction(
  UserStoreActions.GetCurrentUserFailure
);
export const getUserFavouriteMoviesTrigger = createAction(
  UserStoreActions.GetUserFavouriteMoviesTrigger
);
export const getUserFavouriteMoviesSuccess = createActionWithPayload<UserFavouriteMovie[]>(
  UserStoreActions.GetUserFavouriteMoviesSuccess
);
export const getUserFavouriteMoviesFailure = createAction(
  UserStoreActions.GetUserFavouriteMoviesFailure
);

export const changePasswordTrigger =
  createActionWithPayload<ChangePasswordUserCredentials>(
    UserStoreActions.ChangePasswordTrigger
  );
export const remindPasswordTrigger = createActionWithPayload<string>(
  UserStoreActions.RemindPasswordTrigger
);
export const addUserFavouriteMovieTrigger =
  createActionWithPayload<UserFavouriteMovie>(
    UserStoreActions.AddUserFavouriteMovieTrigger
  );
export const removeUserFavouriteMovieTrigger = createActionWithPayload<string>(
  UserStoreActions.RemoveUserFavouriteMovieTrigger
);
export const changeUserAvatarTrigger = createActionWithPayload<File>(
  UserStoreActions.ChangeUserAvatarTrigger
);
export const changeUserPasswordTrigger = createAction(
  UserStoreActions.ChangeUserPasswordTrigger
);
