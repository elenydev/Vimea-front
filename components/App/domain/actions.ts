import {
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "@/../infrastructure/interfaces/User/user";
import { createAction, createInApiAction, getOneAction } from "@/../utils/redux";
import UserManager from "../UserManager";

export const setUserManager = createAction<UserManager>("setUserManager");
export const registration = createInApiAction<User, undefined>("registration");
export const authorization = getOneAction<UserCredentials, User>("authorization");
export const removeUser = createAction<undefined>("removeUser");
export const remindPassword = createInApiAction<string, undefined>('remindPassword');
export const addFavourite = createInApiAction<UserFavouriteMovie, UserFavouriteMovie[]>('addFavourite');
export const removeFavourite=createInApiAction<string, UserFavouriteMovie[]>('removeFavourite')