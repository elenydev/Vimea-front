import {
  User,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";
import { createAction, getOneAction } from "@/../utils/redux/index";
import UserManager from "../UserManager";

export const setUserManager = createAction<UserManager | undefined>(
  "setUserManager"
);
export const authorization = getOneAction<UserCredentials, User>(
  
  "authorization"

);
