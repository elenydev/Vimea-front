import {
  User,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";
import { createAction, createInApiAction, getOneAction } from "@/../utils/Redux";
import UserManager from "../UserManager";

export const setUserManager = createAction<UserManager>("setUserManager");
export const registration = createInApiAction<User, undefined>("setUserManager");
export const authorization = getOneAction<UserCredentials, User>("authorization");
export const removeUser = createAction<undefined>("removeUser");
