import { UserCredentials } from "@/../infrastructure/interfaces/User/user";
import { createAction } from "redux-actions";
import UserManager from "../UserManager";

export const setUserManager = createAction<UserManager | undefined>(
  "setUserManager"
);
export const authorization = createAction<UserCredentials>("authorization");
