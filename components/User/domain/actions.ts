import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "infrastructure/interfaces/User/user";
import { createAction, createAsyncAction, getListAction, getOneAction } from "utils/redux";
import UserManager from "managers/UserManager/UserManager";

export const setUserManager = createAction<UserManager>("setUserManager");
export const registration = createAsyncAction<User, undefined>("registration");
export const authorization = getOneAction<UserCredentials, User>("authorization");
export const getCurrentUser = getOneAction<GetCurrentUser, User>("getCurrentUser");
export const removeUser = createAction<undefined>("removeUser");

export const changePassword = createAsyncAction<ChangePasswordUserCredentials, User>('changePassword');
export const changeAvatar = createAsyncAction<File, User>('changeAvatar');
export const remindPassword = createAsyncAction<string, undefined>('remindPassword');

export const addFavourite = createAsyncAction<UserFavouriteMovie, UserFavouriteMovie[]>('addFavourite');
export const removeFavourite = createAsyncAction<string, UserFavouriteMovie[]>('removeFavourite')
export const getUserFavourites = getListAction<string, UserFavouriteMovie[]>('getUserFavourites');
