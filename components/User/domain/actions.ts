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

export const setUserManager = createAction<UserManager>(
  UserStoreActions.SetUserManager
);
export const closeUserSession = createAction(UserStoreActions.CloseUserSession);
export const authorizationTrigger = createAction<UserCredentials>(
  UserStoreActions.AuthorizationTrigger
);
export const authorizationSuccess = createAction<User>(
  UserStoreActions.AuthorizationSuccess
);
export const authorizationFailure = createAction(
  UserStoreActions.AuthorizationFailure
);
export const registerUserTrigger = createAction<User>(
  UserStoreActions.RegisterUserTrigger
);
export const registerUserSuccess = createAction(
  UserStoreActions.RegisterUserSuccess
);
export const registerUserFailure = createAction(
  UserStoreActions.RegisterUserFailure
);
export const getCurrentUserTrigger = createAction<GetCurrentUser>(
  UserStoreActions.GetCurrentUserTrigger
);
export const getCurrentUserSuccess = createAction<User>(
  UserStoreActions.GetCurrentUserSuccess
);
export const getCurrentUserFailure = createAction<User>(
  UserStoreActions.GetCurrentUserFailure
);
export const getUserFavouriteMoviesTrigger = createAction<string>(
  UserStoreActions.GetUserFavouriteMoviesTrigger
);
export const getUserFavouriteMoviesSuccess = createAction<Movie[]>(
  UserStoreActions.GetUserFavouriteMoviesSuccess
);
export const getUserFavouriteMoviesFailure = createAction(
  UserStoreActions.GetUserFavouriteMoviesFailure
);

export const changePasswordTrigger =
  createAction<ChangePasswordUserCredentials>(
    UserStoreActions.ChangePasswordTrigger
  );
export const remindPasswordTrigger = createAction<string>(
  UserStoreActions.RemindPasswordTrigger
);
export const addUserFavouriteMovieTrigger = createAction<UserFavouriteMovie>(
  UserStoreActions.AddUserFavouriteMovieTrigger
);
export const removeUserFavouriteMovieTrigger = createAction<string>(
  UserStoreActions.RemoveUserFavouriteMovieTrigger
);
export const changeUserAvatarTrigger = createAction<File>(
  UserStoreActions.ChangeUserAvatarTrigger
);
export const changeUserPasswordTrigger = createAction(
  UserStoreActions.ChangeUserPasswordTrigger
);
