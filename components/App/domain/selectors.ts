import { User } from "@/../infrastructure/interfaces/User/user";
import { Store } from "@/../store/interfaces";
import UserManager from "../UserManager";

export const getUser = (state: Store): User | undefined => state.userStore?.user;
export const getUserManager = (state: Store): UserManager | undefined => state.userStore?.userManager;
