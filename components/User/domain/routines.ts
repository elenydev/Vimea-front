import UserManager from 'managers/UserManager/UserManager';
import { createRoutine } from 'utils/redux/routines';
import {
    ChangePasswordUserCredentials,
    GetCurrentUser,
    User,
    UserCredentials,
    UserFavouriteMovie,
  } from "infrastructure/interfaces/User/user";
  
  export enum UserRoutines {
    SetUserManager = "setUserManager",
    Registration = "registration",
    Authorization = "authorization",
    GetCurrentUser = 'getCurrentUser',
    RemoveUser = 'removeUser',
    ChangePassword = 'changePassword',
    ChangeAvatar = 'changeAvatar',
    RemindPassword = 'remindPassword',
    AddFavourite = 'addFavourite',
    RemoveFavourite = 'removeFavourite',
    GetUserFavourites = 'getUserFavourites'
}

export const setUserManager = createRoutine<UserManager, UserManager>(UserRoutines.SetUserManager);
export const registration = createRoutine<User>(UserRoutines.Registration);
export const authorization = createRoutine<UserCredentials, User>(UserRoutines.Authorization);
export const getCurrentUser = createRoutine<GetCurrentUser, User >(UserRoutines.GetCurrentUser);
export const removeUser = createRoutine<undefined>(UserRoutines.RemoveUser);

export const changePassword = createRoutine<ChangePasswordUserCredentials, User>(UserRoutines.ChangePassword);
export const changeAvatar = createRoutine<File, User>(UserRoutines.ChangeAvatar);
export const remindPassword = createRoutine<string>(UserRoutines.RemindPassword);

export const addFavourite = createRoutine<UserFavouriteMovie, UserFavouriteMovie[]>(UserRoutines.AddFavourite);
export const removeFavourite = createRoutine<string, UserFavouriteMovie[]>(UserRoutines.RemoveFavourite)
export const getUserFavourites = createRoutine<string, UserFavouriteMovie[]>(UserRoutines.GetUserFavourites);


